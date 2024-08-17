import fastify from "fastify";
import init from "../server/plugin.js";
import {
  getTestData,
  prepareData,
  getUserCookie,
  createExecuteCrudRequest,
  createRandomStatus,
} from "./helpers/index.js";

describe("test statuses CRUD", () => {
  let app;
  let knex;
  let models;
  let cookies;
  let executeCrudRequest;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: "pino-pretty" },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

    await knex.migrate.latest();
    await prepareData(app);

    cookies = await getUserCookie(app, testData.users.existing);
    executeCrudRequest = createExecuteCrudRequest(app, cookies);
  });

  beforeEach(async () => {});

  it("index", async () => {
    const { statusCode } = await executeCrudRequest("GET", ["statuses"]);
    expect(statusCode).toBe(200);
  });

  it("new", async () => {
    const { statusCode } = await executeCrudRequest("GET", ["newStatus"]);
    expect(statusCode).toBe(200);
  });

  it("create", async () => {
    const newStatus = createRandomStatus();
    const { statusCode } = await executeCrudRequest("POST", ["statuses"], newStatus);
    expect(statusCode).toBe(302);
    const addedTask = await models.status.query().findOne({ name: newStatus.name });
    expect(addedTask).toMatchObject(newStatus);
  });

  it("update", async () => {
    const newStatus = createRandomStatus();
    const existStatus = await models.status.query().first();
    const { statusCode } = await executeCrudRequest("PATCH", ["statuses", existStatus.id], newStatus);
    expect(statusCode).toBe(302);
    const updatedTask = await models.status.query().findOne({ name: newStatus.name });
    expect(updatedTask).toMatchObject(newStatus);
  });

  it("delete with wrong auth", async () => {
    const existStatus = await models.status.query().first();
    const wrongCookies = await getUserCookie(app, testData.users.edit);
    const { statusCode } = await executeCrudRequest("DELETE", ["statuses", existStatus.id], null, wrongCookies);
    const deletedStatus = await models.status.query().findById(existStatus.id);
    expect(statusCode).toBe(302);
    expect(deletedStatus).toBeTruthy();
  });

  it("delete", async () => {
    const existStatus = await models.status.query().first();
    const { statusCode } = await executeCrudRequest("DELETE", ["statuses", existStatus.id]);
    const deletedTask = await models.status.query().findById(existStatus.id);
    expect(statusCode).toBe(302);
    expect(deletedTask).toBeFalsy();
  });

  afterAll(async () => {
    await app.close();
  });
});
