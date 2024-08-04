// @ts-check

import i18next from 'i18next';
import { isAuthoriedUser } from '../helpers/index.js';

export default (app) => {

  const User = app.objection.models.user;

  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await User.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new User();
      reply.render('users/new', { user });
      return reply;
    })
    .get('/users/:id/edit', async (req, reply) => {
      const userId = req.params.id;
      try {
        const user = await User.query().findById(userId);
        const sessionUserData = req.user;
        if (!req.isAuthenticated()) {
          req.flash('error', i18next.t('flash.users.edit.error.no_auth'));
          reply.redirect(app.reverse('users'));
        } else if (!isAuthoriedUser(sessionUserData, user.id)) {
          req.flash('error', i18next.t('flash.users.edit.error.wrong_auth'));
          reply.redirect(app.reverse('users'));
        } else {
          reply.render('users/edit', { user });
        }
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.edit.error.wrong_auth'));
        reply.redirect(app.reverse('users'));
      }
      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = new User();
      user.$set(req.body.data);

      try {
        const validUser = await User.fromJson(req.body.data);
        await User.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
        await req.logIn(validUser);
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    })
    .patch('/users/:id', async (req, reply) => {
      const userId = req.params.id;
      try {
        const user = await User.query().findById(userId);
        const sessionUserData = req.user;
        if (!req.isAuthenticated()) {
          req.flash('error', i18next.t('flash.users.edit.error.no_auth'));
          reply.redirect(app.reverse('users'));
        } else if (!isAuthoriedUser(sessionUserData, user.id)) {
          req.flash('error', i18next.t('flash.users.edit.error.wrong_auth'));
          reply.redirect(app.reverse('users'));
        } else {
          await User.fromJson(req.body.data);
          user.$set(req.body.data);
          await user.$query().patch();
          req.flash('info', i18next.t('flash.users.edit.success'));
          reply.redirect(app.reverse('users'));
        }
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.edit.error.edit'));
        reply.render('users/edit', { user: { ...req.body.data, id: userId }, errors: data });
      }

      return reply;
    })
    .delete('/users/:id', async (req, reply) => { // eslint-disable-line consistent-return
      try {
        const userId = req.params.id;
        const user = await User.query().findById(userId);
        const sessionUserData = req.user;

        if (!req.isAuthenticated()) {
          req.flash('error', i18next.t('flash.users.edit.error.no_auth'));
          reply.redirect(app.reverse('users'));
        } else if (!isAuthoriedUser(sessionUserData, user.id)) {
          req.flash('error', i18next.t('flash.users.edit.error.wrong_auth'));
          reply.redirect(app.reverse('users'));
        } else {
          try {
            const deletedUser = await User.query().deleteById(userId);
            if (deletedUser !== 1) {
              throw Error;
            }
            req.logOut();
            req.flash('info', i18next.t('flash.users.delete.success'));
            reply.redirect(app.reverse('users'));
            return reply;
          } catch {
            throw Error('User can\'t be deleted');
          }
        }
      } catch (error) {
        if (error.message === 'User can\'t be deleted') {
          req.flash('error', i18next.t('flash.users.delete.error.default'));
        } else {
          req.flash('error', i18next.t('flash.users.delete.error.auth'));
        }
        reply.redirect(app.reverse('users'));
        return reply;
      }
    });
};
