import i18next from "i18next";
import UserService from "../services/userService.js";
import TaskService from "../services/taskService.js";

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
    .get(
      "/users/:id/edit",
      { preValidation: app.authenticate, preHandler: app.checkUserAuthorization },
      async (req, reply) => {
        const user = req.params;
        reply.render("users/edit", { user });
        return reply;
      },
    )
    .post("/users", async (req, reply) => {
      try {
        await userService.createUser(req.body.data);
        req.flash("info", i18next.t("flash.users.create.success"));
        reply.redirect(app.reverse("root"));
      } catch (error) {
        const errors = error.response?.data || {};
        req.flash("error", i18next.t("flash.users.create.error"));
        reply.render("users/new", { user: req.body.data, errors });
      }
      return reply;
    })
    .patch(
      "/users/:id",
      { preValidation: app.authenticate, preHandler: app.checkUserAuthorization },
      async (req, reply) => {
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
      },
    )
    .delete(
      "/users/:id",
      { preValidation: app.authenticate, preHandler: app.checkUserAuthorization },
      async (req, reply) => {
        const userId = req.params.id;
        const tasks = await taskService.getTasksByUserId(userId);

        if (tasks.length > 0) {
          req.flash("error", i18next.t("flash.users.edit.userConnectedToTask"));
          reply.redirect(app.reverse("users"));
          return reply;
        }

        try {
          userService.deleteUser(userId);
          req.logOut();
          req.flash("info", i18next.t("flash.users.delete.success"));
          reply.redirect(app.reverse("users"));
        } catch (e) {
          req.flash("error", i18next.t("flash.users.delete.error"));
          reply.render("", { errors: e });
        }
        return reply;
      },
    );
};
