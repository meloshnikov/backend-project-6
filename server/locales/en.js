export default {
  translation: {
    appName: 'Fastify Boilerplate',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User successfully registered',
        },
        edit: {
          error: {
            wrong_auth: 'You cannot edit or delete another user',
            no_auth: 'Access denied! Please log in.',
            edit: 'Failed to edit user',
          },
          success: 'User successfully edited',
        },
        delete: {
          error: {
            auth: 'You cannot edit or delete another user',
            default: 'Failed to delete user',
          },
          success: 'User successfully deleted',
        },
        statuses: {
          create: {
            error: 'Failed to create status',
            success: 'Status successfully created',
          },
          edit: {
            error: 'Failed to edit status',
            success: 'Status successfully edited',
          },
          delete: {
            error: 'Failed to delete status',
            success: 'Status successfully deleted',
          },
        },
      },
      tasks: {
        create: {
          error: 'Failed to create task',
          success: 'Task successfully created',
        },
        edit: {
          error: 'Failed to edit task',
          success: 'Task successfully edited',
        },
        delete: {
          error: 'Only the author can delete the task',
          success: 'Task successfully deleted',
        },
      },
      labels: {
        create: {
          success: 'Label created successfully',
          error: 'Failed to create label',
        },
        update: {
          success: 'Label updated successfully',
          error: 'Failed to update label',
          labelConnectedToTask: 'You can not delete this label. Label is connected to one or more tasks',
        },
        delete: {
          success: 'Label deleted successfully',
          error: 'Failed to delete label',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        statuses: 'Statuses',
        tasks: 'Tasks',
        labels: 'Labels',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      users: {
        id: 'ID',
        title: 'Users',
        first_name: 'First Name',
        last_name: 'Last Name',
        password: 'Password',
        email: 'Email',
        createdAt: 'Created at',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
        edit: 'Edit User',
        actions: {
          title: 'Actions',
          edit: 'Edit',
          save: 'Save',
          delete: 'Delete',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Creation Date',
        title: 'Statuses',
        create_status_button: 'Create Status',
        actions: {
          title: 'Actions',
          delete: 'Delete',
          edit: 'Edit',
        },
        edit: {
          title: 'Edit Status',
          submit: 'Save',
          error: 'Failed to edit status',
        },
        new: {
          title: 'Create Status',
          submit: 'Create',
          create: 'Create',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        createdAt: 'Creation Date',
        title: 'Tasks',
        create_task_button: 'Create Task',
        my_tasks: 'Just my tasks',
        status: 'Status',
        show: 'Show',
        creator: 'Author',
        executor: 'Executor',
        is_creator_user: 'Only my tasks',
        labels: 'Labels',
        label: 'Label',
        actions: {
          title: 'Actions',
          delete: 'Delete',
          edit: 'Edit',
        },
        edit: {
          title: 'Edit Task',
          submit: 'Save',
          error: 'Failed to edit task',
        },
        new: {
          title: 'Create Task',
          submit: 'Create',
          create: 'Create',
        },
        view: {
          creator: 'Author',
          executor: 'Executor',
          createdAt: 'Creation Date',
        },
      },
      labels: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Creation Date',
        title: 'Labels',
        create_label_button: 'Create Label',
        actions: {
          title: 'Actions',
          delete: 'Delete',
          edit: 'Edit',
        },
        edit: {
          title: 'Edit Label',
          submit: 'Save',
          error: 'Failed to edit label',
        },
        new: {
          title: 'Create Label',
          submit: 'Create',
          create: 'Create',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
    },
  },
};
