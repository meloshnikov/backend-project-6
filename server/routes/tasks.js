import i18next from "i18next";
import { getDataByServices, processData, adaptTaskData, getLabelIds, getFilterConditions } from "../helpers/index.js";
import { TaskService, UserService, StatusService, LabelService } from "../services/index.js";

export default (app) => {
  const taskService = new TaskService();
  const statusService = new StatusService();
  const userService = new UserService();
  const labelService = new LabelService();

  app
    .get("/tasks", { name: "tasks", preValidation: app.authenticate }, async (req, reply) => {
      const { statuses, users, labels } = await getDataByServices(statusService, userService, labelService);
      const form = {};
      let query;

      const filterConditions = getFilterConditions(req);

      if (Object.values(filterConditions).some((condition) => condition)) {
        query = taskService.getTasksWithRelations().where(filterConditions);
      } else {
        query = taskService.getTasksWithRelations();
      }

      const tasks = await query;
      reply.render("/tasks/index", { tasks, statuses, users, labels, form });
      return reply;
    })
    .get("/tasks/new", { name: "newTask", preValidation: app.authenticate }, async (req, reply) => {
      const task = {};
      const { statuses, users, labels } = await getDataByServices(statusService, userService, labelService);
      reply.render("tasks/new", { task, statuses, users, labels });
      return reply;
    })
    .get("/tasks/:id", { name: "viewTask" }, async (req, reply) => {
      const { id } = req.params;
      const task = await taskService.getTasksWithRelationsById(id);
      reply.render("/tasks/view", { task });
      return reply;
    })
    .get("/tasks/:id/edit", { name: "taskUpdate", preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await await taskService.getTaskById(id);
      const { statuses, users, labels } = await getDataByServices(statusService, userService, labelService);
      const relatedData = await processData(task, statuses, users, labels);
      reply.render("tasks/edit", { task, ...relatedData });
      return reply;
    })
    .post("/tasks", { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const labelIds = getLabelIds(req);
        const labels = await labelService.getLabelsbyIds(labelIds);
        const taskData = { ...adaptTaskData(req), labels };
        await taskService.saveTask(taskData);
        req.flash("info", i18next.t("flash.tasks.create.success"));
        reply.redirect(app.reverse("tasks"));
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.tasks.create.error"));
        const statuses = await statusService.getStatuses();
        const users = await userService.getUsers();
        const labels = await labelService.getLabels();
        reply.render("tasks/new", { statuses, users, labels, errors: data });
      }
      return reply;
    })
    .patch("/tasks/:id", { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);
      try {
        const labelIds = getLabelIds(req);
        const labels = await labelService.getLabelsbyIds(labelIds);
        const taskData = { ...adaptTaskData(req), labels };
        await taskService.saveTask(taskData);
        req.flash("info", i18next.t("flash.tasks.update.success"));
        reply.redirect(app.reverse("tasks"));
      } catch (e) {
        req.flash("error", i18next.t("flash.tasks.update.error"));
        const { statuses, users, labels } = await getDataByServices(statusService, userService, labelService);
        const relatedData = await processData(task, statuses, users, labels);
        reply.render("tasks/edit", { task, ...relatedData });
      }
      return reply;
    })
    .delete("/tasks/:id", { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      try {
        await taskService.deleteTaskWithRelations(id);
        req.flash("info", i18next.t("flash.tasks.delete.success"));
        reply.redirect(app.reverse("tasks"));
      } catch ({ data }) {
        req.flash("error", i18next.t("flash.tasks.delete.error"));
        reply.redirect(app.reverse("tasks"), { errors: data });
      }
      return reply;
    });
};
