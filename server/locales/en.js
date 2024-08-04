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
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
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
