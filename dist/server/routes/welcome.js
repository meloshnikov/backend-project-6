"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// @ts-check
var _default = app => {
  app.get('/', {
    name: 'root'
  }, (req, reply) => {
    reply.render('welcome/index');
  }).get('/protected', {
    name: 'protected',
    preValidation: app.authenticate
  }, (req, reply) => {
    reply.render('welcome/index');
  });
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9yb3V0ZXMvd2VsY29tZS5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnZXQiLCJuYW1lIiwicmVxIiwicmVwbHkiLCJyZW5kZXIiLCJwcmVWYWxpZGF0aW9uIiwiYXV0aGVudGljYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7ZUFFZ0JBLEdBQUQsSUFBUztBQUN0QkEsRUFBQUEsR0FBRyxDQUNBQyxHQURILENBQ08sR0FEUCxFQUNZO0FBQUVDLElBQUFBLElBQUksRUFBRTtBQUFSLEdBRFosRUFDOEIsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLEtBQWdCO0FBQzFDQSxJQUFBQSxLQUFLLENBQUNDLE1BQU4sQ0FBYSxlQUFiO0FBQ0QsR0FISCxFQUlHSixHQUpILENBSU8sWUFKUCxFQUlxQjtBQUFFQyxJQUFBQSxJQUFJLEVBQUUsV0FBUjtBQUFxQkksSUFBQUEsYUFBYSxFQUFFTixHQUFHLENBQUNPO0FBQXhDLEdBSnJCLEVBSTZFLENBQUNKLEdBQUQsRUFBTUMsS0FBTixLQUFnQjtBQUN6RkEsSUFBQUEsS0FBSyxDQUFDQyxNQUFOLENBQWEsZUFBYjtBQUNELEdBTkg7QUFPRCxDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWNoZWNrXG5cbmV4cG9ydCBkZWZhdWx0IChhcHApID0+IHtcbiAgYXBwXG4gICAgLmdldCgnLycsIHsgbmFtZTogJ3Jvb3QnIH0sIChyZXEsIHJlcGx5KSA9PiB7XG4gICAgICByZXBseS5yZW5kZXIoJ3dlbGNvbWUvaW5kZXgnKTtcbiAgICB9KVxuICAgIC5nZXQoJy9wcm90ZWN0ZWQnLCB7IG5hbWU6ICdwcm90ZWN0ZWQnLCBwcmVWYWxpZGF0aW9uOiBhcHAuYXV0aGVudGljYXRlIH0sIChyZXEsIHJlcGx5KSA9PiB7XG4gICAgICByZXBseS5yZW5kZXIoJ3dlbGNvbWUvaW5kZXgnKTtcbiAgICB9KTtcbn07XG4iXX0=