// @ts-check

export default {
  translation: {
    appName: 'Fastify Шаблон',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        edit: {
          error: {
            wrong_auth: 'Вы не можете редактировать или удалять другого пользователя',
            no_auth: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
            edit: 'Не удалось изменить пользователя',
          },
          success: 'Пользователь успешно изменён',
        },
        delete: {
          error: {
            auth: 'Вы не можете редактировать или удалять другого пользователя',
            default: 'Не удалось удалить пользователя',
          },
          success: 'Пользователь успешно удалён',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        title: 'Пользователи',
        fullName: 'Полное имя',
        email: 'Email',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        edit: 'Изменение пользователя',
        actions: {
          title: 'Действия',
          edit: 'Изменить',
          save: 'Сохранить',
          delete: 'Удалить'
        }
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
    },
  },
};
