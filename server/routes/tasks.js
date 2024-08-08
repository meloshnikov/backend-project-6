import i18next from "i18next";
import { getDataByModels, processData } from "../helpers/index.js";

export default (app) => {
  const Task = app.objection.models.task;
  const Status = app.objection.models.status;
  const User = app.objection.models.user;

  app
    .get("/tasks", { name: "tasks", preValidation: app.authenticate }, async (req, reply) => {
      const { statuses, users } = await getDataByModels(Status, User);
      const form = {};
      let query = Task.query().withGraphFetched("[status, creator, executor]");
      if (req.query.isCreatorUser) {
        query = query.where("creatorId", req.user.id);
        form.isCreatorUser = true;
      }
      if (req.query.status) {
        query = query.where("statusId", req.query.status);
        form.statusId = Number(req.query.status);
      }
      if (req.query.executor) {
        query = query.where("executorId", req.query.executor);
        form.executorId = Number(req.query.executor);
      }
      const tasks = await query;
      reply.render("/tasks/index", {
        tasks,
        statuses,
        users,
        form,
      });

      return reply;
    })
    .get("/tasks/new", { name: "newTask", preValidation: app.authenticate }, async (req, reply) => {
      const task = new Task();
      const { statuses, users } = await getDataByModels(Status, User);
      reply.render("tasks/new", { task, statuses, users });
      return reply;
    })
    .get("/tasks/:id", { name: "viewTask" }, async (req, reply) => {
      const { id } = req.params;
      const task = await Task.query().findOne({ id }).withGraphFetched("[status, creator, executor, labels]");
      reply.render("/tasks/view", { task });
      return reply;
    })
    .get("/tasks/:id/edit", { name: "taskUpdate", preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await Task.query().findOne({ id });
      const { statuses, users } = await getDataByModels(Status, User);
      const relatedData = await processData(task, statuses, users);
      reply.render("tasks/edit", {
        task,
        ...relatedData,
      });
      return reply;
    })
    .post("/tasks", { preValidation: app.authenticate }, async (req, reply) => {
      const task = new Task();
      try {
        const taskData = {
          name: req.body.data.name,
          description: req.body.data.description,
          statusId: Number(req.body.data.statusId),
          executorId: Number(req.body.data.executorId),
          creatorId: req.user.id,
        };
        await Task.transaction(async (trx) => {
          const insertedTask = await Task.query(trx).allowGraph("labels").upsertGraph(taskData, {
            relate: true,
            unrelate: true,
            noDelete: true,
          });
          return insertedTask;
        });
        req.flash("info", i18next.t("flash.tasks.create.success"));
        reply.redirect(app.reverse("tasks"));
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.tasks.create.error"));
        const statuses = await Status.query();
        const users = await User.query();

        reply.render("tasks/new", {
          task,
          statuses,
          users,
          errors: data,
        });
      }
      return reply;
    })
    .patch("/tasks/:id", { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await Task.query().findOne({ id });
      try {
        const taskData = {
          id: Number(id),
          name: req.body.data.name,
          description: req.body.data.description,
          statusId: Number(req.body.data.statusId),
          executorId: Number(req.body.data.executorId),
          creatorId: task.creatorId,
        };
        await Task.transaction(async (trx) => {
          const updatedTask = await Task.query(trx).allowGraph("labels").upsertGraph(taskData, {
            relate: true,
            unrelate: true,
            noDelete: true,
          });

          return updatedTask;
        });
        req.flash("info", i18next.t("flash.tasks.update.success"));
        reply.redirect(app.reverse("tasks"));
      } catch (e) {
        req.flash("error", i18next.t("flash.tasks.update.error"));
        const { statuses, users } = await getDataByModels(Status, User);
        const relatedData = await processData(task, statuses, users);
        reply.render("tasks/edit", {
          task,
          ...relatedData,
        });
      }
      return reply;
    })
    .delete("/tasks/:id", { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await Task.query().findOne({ id });
      try {
        Task.transaction(async (trx) => {
          await task.$query(trx).delete();
        });
        req.flash("info", i18next.t("flash.tasks.delete.success"));
        reply.redirect(app.reverse("tasks"));
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.tasks.delete.error"));
        reply.redirect(app.reverse("tasks"), { task, errors: data });
      }
      return reply;
    });
};
