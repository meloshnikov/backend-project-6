import i18next from "i18next";
import { requireAuthentication } from "../helpers/index.js";

export default (app) => {
  const Status = app.objection.models.status;

  app
    .get("/statuses", { name: "statuses", preHandler: requireAuthentication(app) }, async (req, reply) => {
      const statuses = await Status.query();
      reply.render("statuses/index", { statuses });
      return reply;
    })
    .get("/statuses/new", { name: "newStatus", preHandler: requireAuthentication(app) }, (req, reply) => {
      const status = new Status();
      reply.render("statuses/new", { status });
      return reply;
    })
    .get("/statuses/:id/edit", { preHandler: requireAuthentication(app) }, async (req, reply) => {
      const statusId = req.params.id;
      try {
        const status = await Status.query().findById(statusId);
        reply.render("statuses/edit", { status });
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.statuses.edit.error"));
        reply.redirect(app.reverse("statuses"));
      }
      return reply;
    })
    .post("/statuses", { preHandler: requireAuthentication(app) }, async (req, reply) => {
      const status = new Status();
      status.$set(req.body.data);

      try {
        const validStatus = await Status.fromJson(req.body.data);
        await Status.query().insert(validStatus);
        req.flash("info", i18next.t("flash.statuses.create.success"));
        reply.redirect(app.reverse("statuses"));
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.statuses.create.error"));
        reply.render("statuses/new", { status, errors: data });
      }

      return reply;
    })
    .patch("/statuses/:id", { preHandler: requireAuthentication(app) }, async (req, reply) => {
      const statusId = req.params.id;
      try {
        const status = await Status.query().findById(statusId);
        await Status.fromJson(req.body.data);
        status.$set(req.body.data);
        await status.$query().patch();
        req.flash("info", i18next.t("flash.statuses.edit.success"));
        reply.redirect(app.reverse("statuses"));
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.statuses.edit.error"));
        reply.render("statuses/edit", { status: { ...req.body.data, id: statusId }, errors: data });
      }

      return reply;
    })
    .delete("/statuses/:id", { preHandler: requireAuthentication(app) }, async (req, reply) => {
      try {
        const statusId = req.params.id;
        await Status.query().deleteById(statusId);
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
