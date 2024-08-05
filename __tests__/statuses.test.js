// @ts-check

import fastify from "fastify";

import init from "../server/plugin.js";
import { getTestData, prepareData, getUserCookie } from "./helpers/index.js";

describe("test statuses CRUD", () => {
  let app;
  let knex;
  let models;
  let cookies;
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
  });

  beforeEach(async () => {});

  it("index", async () => {
    const response = await app.inject({
      method: "GET",
      url: app.reverse("statuses"),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it("new", async () => {
    const response = await app.inject({
      method: "GET",
      url: app.reverse("newStatus"),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it("no login create", async () => {
    const params = testData.statuses.new;
    const response = await app.inject({
      method: "POST",
      url: app.reverse("statuses"),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const status = await models.status.query().findOne({ name: params.name });

    expect(status).toBeFalsy();
  });

  it("create", async () => {
    const params = testData.statuses.new;
    const response = await app.inject({
      method: "POST",
      url: app.reverse("statuses"),
      payload: {
        data: params,
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);
    const expected = { ...params };
    const status = await models.status.query().findOne({ name: params.name });

    expect(status).toMatchObject(expected);
  });

  it("no login patch", async () => {
    const status = await models.status.query().findOne({ name: testData.statuses.new.name });

    const response = await app.inject({
      method: "PATCH",
      url: `${app.reverse("statuses")}/${status.id}`,
      payload: {
        data: testData.statuses.edit,
      },
    });

    const edittedStatus = await models.status.query().findById(status.id);

    expect(response.statusCode).toBe(302);
    const expected = { ...testData.statuses.new };

    expect(edittedStatus).toMatchObject(expected);
  });

  it("patch", async () => {
    const params = testData.statuses.edit;

    const status = await models.status.query().findOne({ name: testData.statuses.new.name });

    const response = await app.inject({
      method: "PATCH",
      url: `${app.reverse("statuses")}/${status.id}`,
      payload: {
        data: testData.statuses.edit,
      },
      cookies,
    });

    const edittedStatus = await models.status.query().findById(status.id);

    expect(response.statusCode).toBe(302);
    const expected = { ...params };

    expect(edittedStatus).toMatchObject(expected);
  });

  it("no login delete", async () => {
    const status = await models.status.query().findOne({ name: testData.statuses.edit.name });

    const response = await app.inject({
      method: "DELETE",
      url: `${app.reverse("statuses")}/${status.id}`,
    });

    const deletedStatus = await models.status.query().findById(status.id);

    expect(response.statusCode).toBe(302);

    expect(deletedStatus).toMatchObject(status);
  });

  it("delete", async () => {
    const status = await models.status.query().findOne({ name: testData.statuses.edit.name });

    const response = await app.inject({
      method: "DELETE",
      url: `${app.reverse("statuses")}/${status.id}`,
      cookies,
    });

    const deletedStatus = await models.status.query().findById(status.id);

    expect(response.statusCode).toBe(302);

    expect(deletedStatus).toBeFalsy();
  });

  afterAll(async () => {
    await app.close();
  });
});
