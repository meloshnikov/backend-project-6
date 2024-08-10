export default {
  translation: {
    appName: "Fastify Шаблон",
    flash: {
      session: {
        create: {
          success: "Вы залогинены",
          error: "Неправильный емейл или пароль",
        },
        delete: {
          success: "Вы разлогинены",
        },
      },
      users: {
        create: {
          error: "Не удалось зарегистрировать",
          success: "Пользователь успешно зарегистрирован",
        },
        edit: {
          error: {
            wrong_auth: "Вы не можете редактировать или удалять другого пользователя",
            no_auth: "Доступ запрещён! Пожалуйста, авторизируйтесь.",
            edit: "Не удалось изменить пользователя",
          },
          success: "Пользователь успешно изменён",
        },
        delete: {
          error: {
            auth: "Вы не можете редактировать или удалять другого пользователя",
            default: "Не удалось удалить пользователя",
          },
          success: "Пользователь успешно удалён",
        },
      },
      statuses: {
        create: {
          error: "Не удалось создать статус",
          success: "Статус успешно создан",
        },
        edit: {
          error: "Не удалось изменить статус",
          success: "Статус успешно изменён",
        },
        delete: {
          error: "Не удалось удалить статус",
          success: "Статус успешно удалён",
        },
      },
      tasks: {
        create: {
          error: "Не удалось создать задачу",
          success: "Задача успешно создана",
        },
        edit: {
          error: "Не удалось изменить задачу",
          success: "Задача успешно изменена",
        },
        delete: {
          error: "Задачу может удалить только её автор",
          success: "Задача успешно удалёна",
        },
      },
      labels: {
        create: {
          success: "Метка успешно создана",
          error: "Не удалось создать метку",
        },
        update: {
          success: "Метка успешно изменена",
          error: "Не удалось обновить метку",
          labelConnectedToTask: "Вы не можете удалить эту метку. Метка связана с одной или несколькими задачами",
        },
        delete: {
          success: "Метка успешно удалена",
          error: "Не удалось удалить метку",
        },
      },
      authError: "Доступ запрещён! Пожалуйста, авторизируйтесь.",
    },
    layouts: {
      application: {
        users: "Пользователи",
        signIn: "Вход",
        signUp: "Регистрация",
        signOut: "Выход",
        statuses: "Статусы",
        tasks: "Задачи",
        labels: "Метки",
      },
    },
    views: {
      session: {
        new: {
          signIn: "Вход",
          submit: "Войти",
        },
      },
      users: {
        id: "ID",
        title: "Пользователи",
        first_name: "Имя",
        last_name: "Фамилия",
        password: "Пароль",
        fullName: "Полное имя",
        email: "Email",
        createdAt: "Дата создания",
        new: {
          submit: "Сохранить",
          signUp: "Регистрация",
        },
        edit: "Изменение пользователя",
        actions: {
          title: "Действия",
          edit: "Изменить",
          save: "Сохранить",
          delete: "Удалить",
        },
      },
      statuses: {
        id: "ID",
        name: "Полное имя",
        createdAt: "Дата создания",
        title: "Статусы",
        create_status_button: "Создать статус",
        actions: {
          title: "Действия",
          delete: "Удалить",
          edit: "Изменить",
        },
        edit: {
          title: "Изменение статуса",
          submit: "Сохранить",
          error: "Не удалось изменить статус",
        },
        new: {
          title: "Создание статуса",
          submit: "Создать",
          create: "Создать",
        },
      },
      tasks: {
        id: "ID",
        name: "Наименование",
        description: "Описание",
        createdAt: "Дата создания",
        title: "Задачи",
        create_task_button: "Создать задачу",
        my_tasks: "Только мои задачи",
        status: "Статус",
        show: "Показать",
        creator: "Автор",
        executor: "Исполнитель",
        is_creator_user: "Только мои задачи",
        labels: "Метки",
        label: "Метка",
        actions: {
          title: "Действия",
          delete: "Удалить",
          edit: "Изменить",
        },
        edit: {
          title: "Изменение задачи",
          submit: "Изменить",
          error: "Не удалось изменить задачу",
        },
        new: {
          title: "Создание задачи",
          submit: "Создать",
          create: "Создать",
        },
        view: {
          creator: "Автор",
          executor: "Исполнитель",
          createdAt: "Дата создания",
        },
      },
      labels: {
        id: "ID",
        name: "Полное имя",
        createdAt: "Дата создания",
        title: "Метки",
        create_label_button: "Создать метку",
        actions: {
          title: "Действия",
          delete: "Удалить",
          edit: "Изменить",
        },
        edit: {
          title: "Изменение статуса",
          submit: "Изменить",
          error: "Не удалось изменить статус",
        },
        new: {
          title: "Создание метки",
          submit: "Создать",
          create: "Создать",
        },
      },
      welcome: {
        index: {
          hello: "Привет от Хекслета!",
          description: "Практические курсы по программированию",
          more: "Узнать Больше",
        },
      },
    },
  },
};
