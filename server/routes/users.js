import i18next from "i18next";
import { TaskService, UserService } from "../services/index.js";

export default (app) => {
  const userService = new UserService();
  const taskService = new TaskService();

  app
    .get("/users", { name: "users" }, async (req, reply) => {
      const users = await userService.getUsers();
      reply.render("users/index", { users });
      return reply;
    })
    .get("/users/new", { name: "newUser" }, (req, reply) => {
      reply.render("users/new");
      return reply;
    })
    .get("/users/:id/edit", { preValidation: app.authenticate, preHandler: app.checkUserAuthorization }, async (req, reply) => {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      reply.render("users/edit", { user });
      return reply;
    })
    .post("/users", async (req, reply) => {
      try {
        await userService.createUser(req.body.data);
        req.flash("info", i18next.t("flash.users.create.success"));
        reply.redirect(app.reverse("root"));
      } catch (errors) {
        req.flash("error", i18next.t("flash.users.create.error"));
        reply.render("users/new", { user: req.body.data, errors: errors.data });
      }
      return reply;
    })
    .patch("/users/:id", { preValidation: app.authenticate, preHandler: app.checkUserAuthorization }, async (req, reply) => {
      const sessionUserId = req.user.id;
      try {
        await userService.updateUser({ ...req.body.data, id: sessionUserId });
        req.flash("info", i18next.t("flash.users.edit.success"));
        reply.redirect(app.reverse("users"));
      } catch (errors) {
        req.flash("error", i18next.t("flash.users.edit.error.edit"));
        reply.render("users/edit", { user: { ...req.body.data, id: sessionUserId }, errors: errors.data });
      }

      return reply;
    })
    .delete("/users/:id", { preValidation: app.authenticate, preHandler: app.checkUserAuthorization }, async (req, reply) => {
      const userId = req.params.id;
      const tasks = await taskService.getTasksByUserId(userId);

      if (tasks.length > 0) {
        req.flash("error", i18next.t("flash.users.edit.userConnectedToTask"));
        reply.redirect(app.reverse("users"));
        return reply;
      }

      try {
        userService.deleteById(userId);
        req.logOut();
        req.flash("info", i18next.t("flash.users.delete.success"));
        reply.redirect(app.reverse("users"));
      } catch (errors) {
        req.flash("error", i18next.t("flash.users.delete.error"));
        reply.render("", { errors });
      }
      return reply;
    });
};
