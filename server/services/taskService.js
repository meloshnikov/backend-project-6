import Task from "../models/Task.cjs";

class TaskService {
  constructor() {
    this.taskModel = Task;
  }

  getTasks = async () => this.taskModel.query();

  getTaskById = async (id) => this.taskModel.query().findOne({ id });

  getTasksWithRelations = async (filterQuery = {}) => {
    let query = this.taskModel.query().withGraphFetched("[status, creator, executor, labels]");

    if (filterQuery.creatorId) {
      query = query.skipUndefined().where("creatorId", filterQuery.creatorId);
    }

    Object.entries(filterQuery).forEach(([field, value]) => {
      if (value) {
        if (field === "labels") {
          query = query.whereExists(this.taskModel.relatedQuery("labels").whereIn("labels.id", value));
        } else {
          query = query.where(field, value);
        }
      }
    });
    return query;
  };

  getTasksWithRelationsById = async (id) =>
    this.taskModel.query().findOne({ id }).withGraphFetched("[status, creator, executor, labels]");

  getTasksByUserId = async (userId) => this.taskModel.query().where("executorId", userId).orWhere("creatorId", userId);

  saveTask = async (taskData) => {
    const validTask = this.taskModel.fromJson(taskData);
    const labelIds = validTask.labels.map(({ id }) => ({ id }));

    this.taskModel.transaction(async (trx) => {
      const insertedTask = await this.taskModel
        .query(trx)
        .allowGraph("labels")
        .upsertGraph(
          { ...validTask, labels: labelIds },
          {
            relate: true,
            unrelate: true,
            noDelete: true,
          },
          trx,
        );
      return insertedTask;
    });
  };

  deleteTaskWithRelations = async (taskId) => {
    const task = await this.getTaskById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    await this.taskModel.transaction(async (trx) => {
      await task.$relatedQuery("labels", trx).unrelate();
      await task.$query(trx).delete();
    });
  };
}

export default TaskService;
