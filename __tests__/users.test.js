import fastify from 'fastify';
import _ from 'lodash';

import encrypt from '../server/lib/secure.cjs';
import init from '../server/plugin.js';

import {
  getTestData,
  getUserCookie,
  prepareData,
  createExecuteCrudRequest,
} from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
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
    executeCrudRequest = createExecuteCrudRequest(app, undefined);
  });

  beforeEach(async () => {});

  it('index', async () => {
    const { statusCode } = await executeCrudRequest('GET', ['users']);
    expect(statusCode).toBe(200);
  });

  it('new', async () => {
    const { statusCode } = await executeCrudRequest('GET', ['newUser']);
    expect(statusCode).toBe(200);
  });

  it('create', async () => {
    const newUser = testData.users.new;
    const { statusCode } = await executeCrudRequest('POST', ['users'], newUser);
    expect(statusCode).toBe(302);
    const expected = { ..._.omit(newUser, 'password'), passwordDigest: encrypt(newUser.password) };
    const edittedUser = await models.user.query().findOne({ email: newUser.email });
    expect(edittedUser).toMatchObject(expected);
  });

  it('update', async () => {
    const newUser = testData.users.edit;
    const existUser = await models.user.query().findOne({ email: testData.users.new.email });
    const cookies = await getUserCookie(app, testData.users.new);
    const { statusCode } = await executeCrudRequest('PATCH', ['users', existUser.id], newUser, cookies);
    expect(statusCode).toBe(302);
    const edittedUser = await models.user.query().findById(existUser.id);
    const expected = { ..._.omit(newUser, 'password'), passwordDigest: encrypt(newUser.password) };
    expect(edittedUser).toMatchObject(expected);
  });

  it('update with wrong auth', async () => {
    const newUser = testData.users.edit;
    const existUser = await models.user.query().findOne({ email: testData.users.existing.email });
    const wrongCookies = await getUserCookie(app, testData.users.new);
    const { statusCode } = await executeCrudRequest('PATCH', ['users', existUser.id], newUser, wrongCookies);
    const edittedUser = await models.user.query().findById(existUser.id);
    expect(statusCode).toBe(302);
    expect(edittedUser).toMatchObject(existUser);
  });

  it('update user not found', async () => {
    const nonExistentId = 'non-existent-id';
    const { statusCode } = await executeCrudRequest('GET', ['users', nonExistentId]);
    expect(statusCode).toBe(404);
  });

  it('delete with wrong auth', async () => {
    const existUser = await models.user.query().findOne({ email: testData.users.edit.email });
    const wrongCookies = await getUserCookie(app, testData.users.existing);
    const { statusCode } = await executeCrudRequest('DELETE', ['users', existUser.id], null, wrongCookies);
    const deletedUser = await models.user.query().findById(existUser.id);
    expect(statusCode).toBe(302);
    expect(deletedUser).toBeTruthy();
  });

  it('delete', async () => {
    const existUser = await models.user.query().findOne({ email: testData.users.edit.email });
    const { statusCode } = await executeCrudRequest('DELETE', ['users', existUser.id]);
    const deletedUser = await models.status.query().findById(existUser.id);
    expect(statusCode).toBe(302);
    expect(deletedUser).toBeFalsy();
  });

  afterAll(async () => {
    await app.close();
  });
});
