const BaseModel = require("./BaseModel.cjs");
const User = require("./User.cjs");
const Status = require("./Status.cjs");
const Label = require("./Label.cjs");

module.exports = class Task extends BaseModel {
  static get tableName() {
    return "tasks";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "statusId", "creatorId"],
      properties: {
        id: { type: "integer" },
        description: { type: "string" },
        statusId: { type: "integer", minimum: 1 },
        creatorId: { type: "integer" },
        executorId: { type: "integer" },
        name: { type: "string", minLength: 1 },
      },
    };
  }

  static relationMappings = {
    creator: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "tasks.creatorId",
        to: "users.id",
      },
    },
    executor: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "tasks.executorId",
        to: "users.id",
      },
    },
    status: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Status,
      join: {
        from: "tasks.statusId",
        to: "statuses.id",
      },
    },
    labels: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: Label,
      join: {
        from: "tasks.id",
        through: {
          from: "tasks_labels.taskId",
          to: "tasks_labels.labelId",
        },
        to: "labels.id",
      },
    },
  };
};
