import { fastify } from "fastify";
import init from "../server/plugin.js";
import {
  prepareLabelsData,
  createRandomLabel,
  prepareData,
  getUserCookie,
  createExecuteCrudRequest,
  getTestData,
} from "./helpers/index.js";

describe("test labels CRUD", () => {
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

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareLabelsData(app);
  });

  it("index", async () => {
    const { statusCode } = await executeCrudRequest("GET", ["labels"]);
    expect(statusCode).toBe(200);
  });

  it("new", async () => {
    const { statusCode } = await executeCrudRequest("GET", ["newLabel"]);
    expect(statusCode).toBe(200);
  });

  it("create", async () => {
    const newLabel = createRandomLabel();
    const { statusCode } = await executeCrudRequest("POST", ["labels"], newLabel);
    expect(statusCode).toBe(302);
    const addedTask = await models.label.query().findOne({ name: newLabel.name });
    expect(addedTask).toMatchObject(newLabel);
  });

  it("update", async () => {
    const newLabel = createRandomLabel();
    const existLabel = await models.label.query().first();
    const { statusCode } = await executeCrudRequest("PATCH", ["labels", existLabel.id], newLabel);
    expect(statusCode).toBe(302);
    const updatedTask = await models.label.query().findOne({ name: newLabel.name });
    expect(updatedTask).toMatchObject(newLabel);
  });

  it("delete", async () => {
    const existLabel = await models.label.query().first();
    const { statusCode } = await executeCrudRequest("DELETE", ["labels", existLabel.id]);
    const deletedLabel = await models.label.query().findById(existLabel.id);
    expect(statusCode).toBe(302);
    expect(deletedLabel).toBeFalsy();
  });

  it("delete with wrong auth", async () => {
    const existLabel = await models.label.query().first();
    const wrongCookies = await getUserCookie(app, testData.users.edit);
    const { statusCode } = await executeCrudRequest("DELETE", ["labels", existLabel.id], null, wrongCookies);
    const deletedLabel = await models.label.query().findById(existLabel.id);
    expect(statusCode).toBe(302);
    expect(deletedLabel).toBeTruthy();
  });

  afterEach(async () => {});

  afterAll(async () => {
    await app.close();
  });
});
