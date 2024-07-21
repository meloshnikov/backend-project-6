"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fastifyPassport = require("fastify-passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
class FormStrategy extends _fastifyPassport.Strategy {
  constructor(name, app) {
    super(name);
    this.app = app;
  }

  async authenticate(request) {
    if (request.isAuthenticated()) {
      return this.pass();
    }

    const email = _lodash.default.get(request, 'body.data.email', null);

    const password = _lodash.default.get(request, 'body.data.password', null);

    const {
      models
    } = this.app.objection;
    const user = await models.user.query().findOne({
      email
    });

    if (user && user.verifyPassword(password)) {
      return this.success(user);
    }

    return this.fail();
  }

}

exports.default = FormStrategy;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9saWIvcGFzc3BvcnRTdHJhdGVnaWVzL0Zvcm1TdHJhdGVneS5qcyJdLCJuYW1lcyI6WyJGb3JtU3RyYXRlZ3kiLCJTdHJhdGVneSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImFwcCIsImF1dGhlbnRpY2F0ZSIsInJlcXVlc3QiLCJpc0F1dGhlbnRpY2F0ZWQiLCJwYXNzIiwiZW1haWwiLCJfIiwiZ2V0IiwicGFzc3dvcmQiLCJtb2RlbHMiLCJvYmplY3Rpb24iLCJ1c2VyIiwicXVlcnkiLCJmaW5kT25lIiwidmVyaWZ5UGFzc3dvcmQiLCJzdWNjZXNzIiwiZmFpbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOzs7O0FBSEE7QUFLZSxNQUFNQSxZQUFOLFNBQTJCQyx5QkFBM0IsQ0FBb0M7QUFDakRDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxHQUFQLEVBQVk7QUFDckIsVUFBTUQsSUFBTjtBQUNBLFNBQUtDLEdBQUwsR0FBV0EsR0FBWDtBQUNEOztBQUVpQixRQUFaQyxZQUFZLENBQUNDLE9BQUQsRUFBVTtBQUMxQixRQUFJQSxPQUFPLENBQUNDLGVBQVIsRUFBSixFQUErQjtBQUM3QixhQUFPLEtBQUtDLElBQUwsRUFBUDtBQUNEOztBQUVELFVBQU1DLEtBQUssR0FBR0MsZ0JBQUVDLEdBQUYsQ0FBTUwsT0FBTixFQUFlLGlCQUFmLEVBQWtDLElBQWxDLENBQWQ7O0FBQ0EsVUFBTU0sUUFBUSxHQUFHRixnQkFBRUMsR0FBRixDQUFNTCxPQUFOLEVBQWUsb0JBQWYsRUFBcUMsSUFBckMsQ0FBakI7O0FBQ0EsVUFBTTtBQUFFTyxNQUFBQTtBQUFGLFFBQWEsS0FBS1QsR0FBTCxDQUFTVSxTQUE1QjtBQUNBLFVBQU1DLElBQUksR0FBRyxNQUFNRixNQUFNLENBQUNFLElBQVAsQ0FBWUMsS0FBWixHQUFvQkMsT0FBcEIsQ0FBNEI7QUFBRVIsTUFBQUE7QUFBRixLQUE1QixDQUFuQjs7QUFDQSxRQUFJTSxJQUFJLElBQUlBLElBQUksQ0FBQ0csY0FBTCxDQUFvQk4sUUFBcEIsQ0FBWixFQUEyQztBQUN6QyxhQUFPLEtBQUtPLE9BQUwsQ0FBYUosSUFBYixDQUFQO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLSyxJQUFMLEVBQVA7QUFDRDs7QUFwQmdEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWNoZWNrXG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBTdHJhdGVneSB9IGZyb20gJ2Zhc3RpZnktcGFzc3BvcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtU3RyYXRlZ3kgZXh0ZW5kcyBTdHJhdGVneSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGFwcCkge1xuICAgIHN1cGVyKG5hbWUpO1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICB9XG5cbiAgYXN5bmMgYXV0aGVudGljYXRlKHJlcXVlc3QpIHtcbiAgICBpZiAocmVxdWVzdC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFzcygpO1xuICAgIH1cblxuICAgIGNvbnN0IGVtYWlsID0gXy5nZXQocmVxdWVzdCwgJ2JvZHkuZGF0YS5lbWFpbCcsIG51bGwpO1xuICAgIGNvbnN0IHBhc3N3b3JkID0gXy5nZXQocmVxdWVzdCwgJ2JvZHkuZGF0YS5wYXNzd29yZCcsIG51bGwpO1xuICAgIGNvbnN0IHsgbW9kZWxzIH0gPSB0aGlzLmFwcC5vYmplY3Rpb247XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IG1vZGVscy51c2VyLnF1ZXJ5KCkuZmluZE9uZSh7IGVtYWlsIH0pO1xuICAgIGlmICh1c2VyICYmIHVzZXIudmVyaWZ5UGFzc3dvcmQocGFzc3dvcmQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdWNjZXNzKHVzZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmZhaWwoKTtcbiAgfVxufVxuIl19