// @ts-check

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
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        statuses: 'Statuses',
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
          delete: 'Delete'
        }
      },
      statuses: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Creation Date',
        actions: 'Actions',
        title: 'Statuses',
        createStatusButton: 'Create Status',
        act: {
          delete: 'Delete',
          edit: 'Edit',
        },
        edit: {
          title: 'Edit Status',
          submit: 'Edit',
          error: 'Failed to edit status',
        },
        new: {
          title: 'Create Status',
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
