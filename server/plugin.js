import path from 'path';
import { fileURLToPath } from 'url';

// NOTE: не поддердивает fastify 4.x
// import fastifyErrorPage from 'fastify-error-page';
import fastifyFormbody from '@fastify/formbody';
import fastifyPassport from '@fastify/passport';
import fastifySecureSession from '@fastify/secure-session';
import fastifySensible from '@fastify/sensible';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import fastifyMethodOverride from 'fastify-method-override';
import fastifyObjectionjs from 'fastify-objectionjs';
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes';
import i18next from 'i18next';
import Pug from 'pug';
import qs from 'qs';

import * as knexConfig from '../knexfile.js';

import getHelpers from './helpers/index.js';
import FormStrategy from './lib/passportStrategies/FormStrategy.js';
import en from './locales/en.js';
import ru from './locales/ru.js';
import models from './models/index.js';
import addRoutes from './routes/index.js';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

const mode = process.env.NODE_ENV || 'development';
// const isDevelopment = mode === 'development';

const setUpViews = (app) => {
  const helpers = getHelpers(app);
  app.register(fastifyView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      ...helpers,
      assetPath: (filename) => `/assets/${filename}`,
    },
    templates: path.join(__dirname, '..', 'server', 'views'),
  });

  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};

const setUpStaticAssets = (app) => {
  const pathPublic = path.join(__dirname, '..', 'dist');
  app.register(fastifyStatic, {
    root: pathPublic,
    prefix: '/assets/',
  });
};

const setupLocalization = async () => {
  await i18next.init({
    lng: 'ru',
    fallbackLng: 'en',
    // debug: isDevelopment,
    resources: {
      ru,
      en,
    },
  });
};

const addHooks = (app) => {
  app.addHook('preHandler', async (req, reply) => {
    reply.locals = {
      isAuthenticated: () => req.isAuthenticated(),
    };
  });
};

const registerPlugins = async (app) => {
  await app.register(fastifySensible);
  // await app.register(fastifyErrorPage);
  await app.register(fastifyReverseRoutes);
  await app.register(fastifyFormbody, { parser: qs.parse });
  await app.register(fastifySecureSession, {
    secret: process.env.SESSION_KEY,
    cookie: {
      path: '/',
    },
  });

  fastifyPassport.registerUserDeserializer((user) => app
    .objection.models.user.query().findById(user.id));
  fastifyPassport.registerUserSerializer((user) => Promise.resolve(user));
  fastifyPassport.use(new FormStrategy('form', app));
  await app.register(fastifyPassport.initialize());
  await app.register(fastifyPassport.secureSession());
  await app.decorate('fp', fastifyPassport);
  await app.decorate('authenticate', (...args) => fastifyPassport
    .authenticate('form', {
      failureRedirect: app.reverse('root'),
      failureFlash: i18next.t('flash.authError'),
    })(...args));

  await app.decorate('checkUserAuthorization', (req, reply, done) => {
    if (req.user.id !== Number(req.params.id)) {
      req.flash('error', i18next.t('flash.users.edit.error.wrong_auth'));
      reply.redirect(app.reverse('users'));

      return reply;
    }
    return done();
  });

  await app.register(fastifyMethodOverride);
  await app.register(fastifyObjectionjs, {
  /* eslint-disable-next-line import/namespace */
    knexConfig: knexConfig[mode],
    models,
  });
};

export const options = {
  exposeHeadRoutes: false,
};
/* eslint-disable-next-line no-unused-vars */
export default async (app, opt) => {
  await registerPlugins(app);

  await setupLocalization();
  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);
  addHooks(app);

  return app;
};
