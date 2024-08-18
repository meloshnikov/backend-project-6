import Task from "../models/Task.cjs";

class TaskService {
  constructor() {
    this.taskModel = Task;
  }

  getTasksByUserId = async (userId) => this.taskModel.query().where("executorId", userId).orWhere("creatorId", userId);
}

export default TaskService;
