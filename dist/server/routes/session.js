"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
var _default = app => {
  app.get('/session/new', {
    name: 'newSession'
  }, (req, reply) => {
    const signInForm = {};
    reply.render('session/new', {
      signInForm
    });
  }).post('/session', {
    name: 'session'
  }, app.fp.authenticate('form', async (req, reply, err, user) => {
    if (err) {
      return app.httpErrors.internalServerError(err);
    }

    if (!user) {
      const signInForm = req.body.data;
      const errors = {
        email: [{
          message: _i18next.default.t('flash.session.create.error')
        }]
      };
      return reply.render('session/new', {
        signInForm,
        errors
      });
    }

    await req.logIn(user);
    req.flash('success', _i18next.default.t('flash.session.create.success'));
    return reply.redirect(app.reverse('root'));
  })).delete('/session', (req, reply) => {
    req.logOut();
    req.flash('info', _i18next.default.t('flash.session.delete.success'));
    reply.redirect(app.reverse('root'));
  });
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9yb3V0ZXMvc2Vzc2lvbi5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnZXQiLCJuYW1lIiwicmVxIiwicmVwbHkiLCJzaWduSW5Gb3JtIiwicmVuZGVyIiwicG9zdCIsImZwIiwiYXV0aGVudGljYXRlIiwiZXJyIiwidXNlciIsImh0dHBFcnJvcnMiLCJpbnRlcm5hbFNlcnZlckVycm9yIiwiYm9keSIsImRhdGEiLCJlcnJvcnMiLCJlbWFpbCIsIm1lc3NhZ2UiLCJpMThuZXh0IiwidCIsImxvZ0luIiwiZmxhc2giLCJyZWRpcmVjdCIsInJldmVyc2UiLCJkZWxldGUiLCJsb2dPdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7OztBQUZBO2VBSWdCQSxHQUFELElBQVM7QUFDdEJBLEVBQUFBLEdBQUcsQ0FDQUMsR0FESCxDQUNPLGNBRFAsRUFDdUI7QUFBRUMsSUFBQUEsSUFBSSxFQUFFO0FBQVIsR0FEdkIsRUFDK0MsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLEtBQWdCO0FBQzNELFVBQU1DLFVBQVUsR0FBRyxFQUFuQjtBQUNBRCxJQUFBQSxLQUFLLENBQUNFLE1BQU4sQ0FBYSxhQUFiLEVBQTRCO0FBQUVELE1BQUFBO0FBQUYsS0FBNUI7QUFDRCxHQUpILEVBS0dFLElBTEgsQ0FLUSxVQUxSLEVBS29CO0FBQUVMLElBQUFBLElBQUksRUFBRTtBQUFSLEdBTHBCLEVBS3lDRixHQUFHLENBQUNRLEVBQUosQ0FBT0MsWUFBUCxDQUFvQixNQUFwQixFQUE0QixPQUFPTixHQUFQLEVBQVlDLEtBQVosRUFBbUJNLEdBQW5CLEVBQXdCQyxJQUF4QixLQUFpQztBQUNsRyxRQUFJRCxHQUFKLEVBQVM7QUFDUCxhQUFPVixHQUFHLENBQUNZLFVBQUosQ0FBZUMsbUJBQWYsQ0FBbUNILEdBQW5DLENBQVA7QUFDRDs7QUFDRCxRQUFJLENBQUNDLElBQUwsRUFBVztBQUNULFlBQU1OLFVBQVUsR0FBR0YsR0FBRyxDQUFDVyxJQUFKLENBQVNDLElBQTVCO0FBQ0EsWUFBTUMsTUFBTSxHQUFHO0FBQ2JDLFFBQUFBLEtBQUssRUFBRSxDQUFDO0FBQUVDLFVBQUFBLE9BQU8sRUFBRUMsaUJBQVFDLENBQVIsQ0FBVSw0QkFBVjtBQUFYLFNBQUQ7QUFETSxPQUFmO0FBR0EsYUFBT2hCLEtBQUssQ0FBQ0UsTUFBTixDQUFhLGFBQWIsRUFBNEI7QUFBRUQsUUFBQUEsVUFBRjtBQUFjVyxRQUFBQTtBQUFkLE9BQTVCLENBQVA7QUFDRDs7QUFDRCxVQUFNYixHQUFHLENBQUNrQixLQUFKLENBQVVWLElBQVYsQ0FBTjtBQUNBUixJQUFBQSxHQUFHLENBQUNtQixLQUFKLENBQVUsU0FBVixFQUFxQkgsaUJBQVFDLENBQVIsQ0FBVSw4QkFBVixDQUFyQjtBQUNBLFdBQU9oQixLQUFLLENBQUNtQixRQUFOLENBQWV2QixHQUFHLENBQUN3QixPQUFKLENBQVksTUFBWixDQUFmLENBQVA7QUFDRCxHQWRzQyxDQUx6QyxFQW9CR0MsTUFwQkgsQ0FvQlUsVUFwQlYsRUFvQnNCLENBQUN0QixHQUFELEVBQU1DLEtBQU4sS0FBZ0I7QUFDbENELElBQUFBLEdBQUcsQ0FBQ3VCLE1BQUo7QUFDQXZCLElBQUFBLEdBQUcsQ0FBQ21CLEtBQUosQ0FBVSxNQUFWLEVBQWtCSCxpQkFBUUMsQ0FBUixDQUFVLDhCQUFWLENBQWxCO0FBQ0FoQixJQUFBQSxLQUFLLENBQUNtQixRQUFOLENBQWV2QixHQUFHLENBQUN3QixPQUFKLENBQVksTUFBWixDQUFmO0FBQ0QsR0F4Qkg7QUF5QkQsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1jaGVja1xuXG5pbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcblxuZXhwb3J0IGRlZmF1bHQgKGFwcCkgPT4ge1xuICBhcHBcbiAgICAuZ2V0KCcvc2Vzc2lvbi9uZXcnLCB7IG5hbWU6ICduZXdTZXNzaW9uJyB9LCAocmVxLCByZXBseSkgPT4ge1xuICAgICAgY29uc3Qgc2lnbkluRm9ybSA9IHt9O1xuICAgICAgcmVwbHkucmVuZGVyKCdzZXNzaW9uL25ldycsIHsgc2lnbkluRm9ybSB9KTtcbiAgICB9KVxuICAgIC5wb3N0KCcvc2Vzc2lvbicsIHsgbmFtZTogJ3Nlc3Npb24nIH0sIGFwcC5mcC5hdXRoZW50aWNhdGUoJ2Zvcm0nLCBhc3luYyAocmVxLCByZXBseSwgZXJyLCB1c2VyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBhcHAuaHR0cEVycm9ycy5pbnRlcm5hbFNlcnZlckVycm9yKGVycik7XG4gICAgICB9XG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgY29uc3Qgc2lnbkluRm9ybSA9IHJlcS5ib2R5LmRhdGE7XG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHtcbiAgICAgICAgICBlbWFpbDogW3sgbWVzc2FnZTogaTE4bmV4dC50KCdmbGFzaC5zZXNzaW9uLmNyZWF0ZS5lcnJvcicpIH1dLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVwbHkucmVuZGVyKCdzZXNzaW9uL25ldycsIHsgc2lnbkluRm9ybSwgZXJyb3JzIH0pO1xuICAgICAgfVxuICAgICAgYXdhaXQgcmVxLmxvZ0luKHVzZXIpO1xuICAgICAgcmVxLmZsYXNoKCdzdWNjZXNzJywgaTE4bmV4dC50KCdmbGFzaC5zZXNzaW9uLmNyZWF0ZS5zdWNjZXNzJykpO1xuICAgICAgcmV0dXJuIHJlcGx5LnJlZGlyZWN0KGFwcC5yZXZlcnNlKCdyb290JykpO1xuICAgIH0pKVxuICAgIC5kZWxldGUoJy9zZXNzaW9uJywgKHJlcSwgcmVwbHkpID0+IHtcbiAgICAgIHJlcS5sb2dPdXQoKTtcbiAgICAgIHJlcS5mbGFzaCgnaW5mbycsIGkxOG5leHQudCgnZmxhc2guc2Vzc2lvbi5kZWxldGUuc3VjY2VzcycpKTtcbiAgICAgIHJlcGx5LnJlZGlyZWN0KGFwcC5yZXZlcnNlKCdyb290JykpO1xuICAgIH0pO1xufTtcbiJdfQ==