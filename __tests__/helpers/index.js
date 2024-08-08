import { URL } from "url";
import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

// TODO: использовать для фикстур https://github.com/viglucci/simple-knex-fixtures

const getFixturePath = (filename) => path.join("..", "..", "__fixtures__", filename);
const readFixture = (filename) => fs.readFileSync(new URL(getFixturePath(filename), import.meta.url), "utf-8").trim();
const getFixtureData = (filename) => JSON.parse(readFixture(filename));

export const getTestData = () => getFixtureData("testData.json");

export const prepareData = async (app) => {
  const { knex } = app.objection;

  await knex("users").insert(getFixtureData("users.json"));
  await knex("statuses").insert(getFixtureData("statuses.json"));
};

export const stringifyValues = (obj) => {
  const object = JSON.parse(JSON.stringify(obj));

  function isNumber(value) {
    return typeof value === "number";
  }

  Object.entries(object).forEach(([key, value]) => {
    if (isNumber(value)) {
      object[key] = String(value);
    }
  });

  return object;
};

export const getUserCookie = async (app, user) => {
  const responseSignIn = await app.inject({
    method: "POST",
    url: app.reverse("session"),
    payload: {
      data: user,
    },
  });

  const [sessionCookie] = responseSignIn.cookies;
  const { name, value } = sessionCookie;
  return { [name]: value };
};

export const createRandomTask = () => ({
  name: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  statusId: faker.number.int({ min: 1, max: 5 }),
  executorId: faker.number.int({ min: 1, max: 5 }),
});

export const createRandomStatus = () => ({
  name: faker.word.adjective(),
});

export const truncateTables = async (knex) => {
  await Promise.all([knex("tasks").truncate(), knex("users").truncate(), knex("statuses").truncate()]);
};

export const createExecuteCrudRequest = (app, cookies) => async (method, url, payload, customCookies) => {
  const [baseRoute, dynamicPart] = url;

  const response = await app.inject({
    method,
    url: `${app.reverse(baseRoute)}${dynamicPart ? `/${dynamicPart}` : ""}`,
    payload: { data: payload },
    cookies: customCookies ?? cookies,
  });

  return { response, statusCode: response.statusCode };
};
