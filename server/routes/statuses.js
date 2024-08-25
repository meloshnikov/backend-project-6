import i18next from "i18next";
import { StatusService } from "../services/index.js";

export default (app) => {
  const statusService = new StatusService();

  app
    .get("/statuses", { name: "statuses", preValidation: app.authenticate }, async (req, reply) => {
      const statuses = await statusService.getStatuses();
      reply.render("statuses/index", { statuses });
      return reply;
    })
    .get("/statuses/new", { name: "newStatus", preValidation: app.authenticate }, async (req, reply) => {
      reply.render("statuses/new");
      return reply;
    })
    .get("/statuses/:id/edit", { preValidation: app.authenticate }, async (req, reply) => {
      const statusId = req.params.id;
      try {
        const status = await statusService.getStatusById(statusId);
        reply.render("statuses/edit", { status });
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.statuses.edit.error"));
        reply.redirect(app.reverse("statuses"));
      }
      return reply;
    })
    .post("/statuses", { preValidation: app.authenticate }, async (req, reply) => {
      const status = req.body.data;
      try {
        await statusService.createStatus(status);
        req.flash("info", i18next.t("flash.statuses.create.success"));
        reply.redirect(app.reverse("statuses"));
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.statuses.create.error"));
        reply.render("statuses/new", { status, errors: data });
      }
      return reply;
    })
    .patch("/statuses/:id", { preValidation: app.authenticate }, async (req, reply) => {
      const statusId = Number(req.params.id);
      try {
        await statusService.updateStatus({ ...req.body.data, id: statusId });
        req.flash("info", i18next.t("flash.statuses.edit.success"));
        reply.redirect(app.reverse("statuses"));
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.statuses.edit.error"));
        reply.render("statuses/edit", { status: { ...req.body.data, id: statusId }, errors: data });
      }
      return reply;
    })
    .delete("/statuses/:id", { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const statusId = req.params.id;
        await statusService.deleteById(statusId);
        req.flash("info", i18next.t("flash.statuses.delete.success"));
        reply.redirect(app.reverse("statuses"));
        return reply;
      } catch (error) {
        req.flash("error", i18next.t("flash.statuses.delete.error"));
        reply.redirect(app.reverse("statuses"));
        return reply;
      }
    });
};
