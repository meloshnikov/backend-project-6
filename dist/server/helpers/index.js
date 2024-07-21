"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
var _default = app => ({
  route(name) {
    return app.reverse(name);
  },

  t(key) {
    return _i18next.default.t(key);
  },

  _: _lodash.default,

  getAlertClass(type) {
    switch (type) {
      // case 'failure':
      //   return 'danger';
      case 'error':
        return 'danger';

      case 'success':
        return 'success';

      case 'info':
        return 'info';

      default:
        throw new Error(`Unknown flash type: '${type}'`);
    }
  },

  formatDate(str) {
    const date = new Date(str);
    return date.toLocaleString();
  }

});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9oZWxwZXJzL2luZGV4LmpzIl0sIm5hbWVzIjpbImFwcCIsInJvdXRlIiwibmFtZSIsInJldmVyc2UiLCJ0Iiwia2V5IiwiaTE4bmV4dCIsIl8iLCJnZXRBbGVydENsYXNzIiwidHlwZSIsIkVycm9yIiwiZm9ybWF0RGF0ZSIsInN0ciIsImRhdGUiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7OztBQUhBO2VBS2dCQSxHQUFELEtBQVU7QUFDdkJDLEVBQUFBLEtBQUssQ0FBQ0MsSUFBRCxFQUFPO0FBQ1YsV0FBT0YsR0FBRyxDQUFDRyxPQUFKLENBQVlELElBQVosQ0FBUDtBQUNELEdBSHNCOztBQUl2QkUsRUFBQUEsQ0FBQyxDQUFDQyxHQUFELEVBQU07QUFDTCxXQUFPQyxpQkFBUUYsQ0FBUixDQUFVQyxHQUFWLENBQVA7QUFDRCxHQU5zQjs7QUFPdkJFLEVBQUFBLENBQUMsRUFBREEsZUFQdUI7O0FBUXZCQyxFQUFBQSxhQUFhLENBQUNDLElBQUQsRUFBTztBQUNsQixZQUFRQSxJQUFSO0FBQ0U7QUFDQTtBQUNBLFdBQUssT0FBTDtBQUNFLGVBQU8sUUFBUDs7QUFDRixXQUFLLFNBQUw7QUFDRSxlQUFPLFNBQVA7O0FBQ0YsV0FBSyxNQUFMO0FBQ0UsZUFBTyxNQUFQOztBQUNGO0FBQ0UsY0FBTSxJQUFJQyxLQUFKLENBQVcsd0JBQXVCRCxJQUFLLEdBQXZDLENBQU47QUFWSjtBQVlELEdBckJzQjs7QUFzQnZCRSxFQUFBQSxVQUFVLENBQUNDLEdBQUQsRUFBTTtBQUNkLFVBQU1DLElBQUksR0FBRyxJQUFJQyxJQUFKLENBQVNGLEdBQVQsQ0FBYjtBQUNBLFdBQU9DLElBQUksQ0FBQ0UsY0FBTCxFQUFQO0FBQ0Q7O0FBekJzQixDQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtY2hlY2tcblxuaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCAoYXBwKSA9PiAoe1xuICByb3V0ZShuYW1lKSB7XG4gICAgcmV0dXJuIGFwcC5yZXZlcnNlKG5hbWUpO1xuICB9LFxuICB0KGtleSkge1xuICAgIHJldHVybiBpMThuZXh0LnQoa2V5KTtcbiAgfSxcbiAgXyxcbiAgZ2V0QWxlcnRDbGFzcyh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAvLyBjYXNlICdmYWlsdXJlJzpcbiAgICAgIC8vICAgcmV0dXJuICdkYW5nZXInO1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICByZXR1cm4gJ2Rhbmdlcic7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgcmV0dXJuICdzdWNjZXNzJztcbiAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICByZXR1cm4gJ2luZm8nO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZsYXNoIHR5cGU6ICcke3R5cGV9J2ApO1xuICAgIH1cbiAgfSxcbiAgZm9ybWF0RGF0ZShzdHIpIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoc3RyKTtcbiAgICByZXR1cm4gZGF0ZS50b0xvY2FsZVN0cmluZygpO1xuICB9LFxufSk7XG4iXX0=