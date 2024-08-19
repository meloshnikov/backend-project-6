import i18next from "i18next";
import { LabelService } from "../services";

export default (app) => {
  const labelService = new LabelService();

  app
    .get("/labels", { name: "labels", preValidation: app.authenticate }, async (req, reply) => {
      const labels = await labelService.getLabels();
      reply.render("/labels/index", { labels });
      return reply;
    })
    .get("/labels/new", { name: "newLabel", preValidation: app.authenticate }, (req, reply) => {
      reply.render("/labels/new");
    })
    .get("/labels/:id/edit", { preValidation: app.authenticate }, async (req, reply) => {
      const labelId = req.params.id;
      try {
        const label = await labelService.getLabelById(labelId);
        reply.render("labels/edit", { label: label[0] });
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.labels.edit.error"));
        reply.redirect(app.reverse("labels"));
      }
      return reply;
    })
    .post("/labels", { preValidation: app.authenticate }, async (req, reply) => {
      const label = req.body.data;
      try {
        await labelService.createLabel(label);
        req.flash("info", i18next.t("flash.labels.create.success"));
        reply.redirect(app.reverse("labels"));
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.labels.create.error"));
        reply.render("labels/new", { label, errors: data });
      }
      return reply;
    })
    .patch("/labels/:id", { preValidation: app.authenticate }, async (req, reply) => {
      const labelId = Number(req.params.id);
      try {
        await labelService.updateLabel({ ...req.body.data, id: labelId });
        req.flash("info", i18next.t("flash.labels.update.success"));
        reply.redirect(app.reverse("labels"));
      } catch (errors) {
        req.flash("error", i18next.t("flash.labels.update.error"));
        reply.render("labels/edit", { label: { ...req.body.data, id: labelId }, errors });
      }
      return reply;
    })
    .delete("/labels/:id", { preValidation: app.authenticate }, async (req, reply) => {
      const labelId = req.params.id;
      const labelWithTasks = await labelService.getlabelWithTasks(labelId);

      if (labelWithTasks.tasks?.length > 0) {
        req.flash("error", i18next.t("flash.labels.edit.labelConnectedToTask"));
        reply.redirect(app.reverse("labels"));
        return reply;
      }
      try {
        await labelService.deleteById(labelId);
        req.flash("info", i18next.t("flash.labels.delete.success"));
        reply.redirect(app.reverse("labels"));
      } catch (errors) {
        req.flash("error", i18next.t("flash.labels.delete.error"));
        reply.render("", { errors });
      }
      return reply;
    });
};
