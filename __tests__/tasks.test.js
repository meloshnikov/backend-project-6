import { fastify } from 'fastify';
import init from '../server/plugin.js';
import {
  prepareData,
  createRandomTask,
  getTestData,
  getUserCookie,
  createExecuteCrudRequest,
} from './helpers/index.js';

describe('test tasks CRUD', () => {
  let app;
  let knex;
  let models;
  let cookies;
  let executeCrudRequest;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
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

  it('index', async () => {
    const { statusCode } = await executeCrudRequest('GET', ['tasks']);
    expect(statusCode).toBe(200);
  });

  it('new', async () => {
    const { statusCode } = await executeCrudRequest('GET', ['newTask']);
    expect(statusCode).toBe(200);
  });

  it('create', async () => {
    const newTask = createRandomTask();
    const { statusCode } = await executeCrudRequest('POST', ['tasks'], newTask);
    expect(statusCode).toBe(302);
    const addedTask = await models.task.query().findOne({ name: newTask.name });
    expect(addedTask).toMatchObject(newTask);
  });

  it('create with empty non required fields', async () => {
    const newTask = createRandomTask();
    const { statusCode } = await executeCrudRequest('POST', ['tasks'], newTask);
    expect(statusCode).toBe(302);
    const addedTask = await models.task.query().findOne({ name: newTask.name });
    expect(addedTask).toMatchObject(newTask);
  });

  it('update', async () => {
    const newTask = createRandomTask();
    const existTask = await models.task.query().first();
    const { statusCode } = await executeCrudRequest('PATCH', ['tasks', existTask.id], newTask);
    expect(statusCode).toBe(302);
    const updatedTask = await models.task.query().findOne({ name: newTask.name });
    expect(updatedTask).toMatchObject(newTask);
  });

  it('delete with wrong auth', async () => {
    const existTask = await models.task.query().first();
    const wrongCookies = await getUserCookie(app, testData.users.edit);
    const { statusCode } = await executeCrudRequest('DELETE', ['tasks', existTask.id], null, wrongCookies);
    const deletedTask = await models.task.query().findById(existTask.id);
    expect(statusCode).toBe(302);
    expect(deletedTask).toBeTruthy();
  });

  it('delete', async () => {
    const existTask = await models.task.query().first();
    const { statusCode } = await executeCrudRequest('DELETE', ['tasks', existTask.id]);
    const deletedTask = await models.task.query().findById(existTask.id);
    expect(statusCode).toBe(302);
    expect(deletedTask).toBeFalsy();
  });

  afterEach(async () => {});

  afterAll(async () => {
    await app.close();
  });
});
