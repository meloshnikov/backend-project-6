"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check

/**
 * @param {string} value
 */
var _default = value => _crypto.default.createHash('sha256').update(value).digest('hex');

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9saWIvc2VjdXJlLmpzIl0sIm5hbWVzIjpbInZhbHVlIiwiY3J5cHRvIiwiY3JlYXRlSGFzaCIsInVwZGF0ZSIsImRpZ2VzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7O0FBRkE7O0FBSUE7QUFDQTtBQUNBO2VBQ2dCQSxLQUFELElBQVdDLGdCQUFPQyxVQUFQLENBQWtCLFFBQWxCLEVBQ3ZCQyxNQUR1QixDQUNoQkgsS0FEZ0IsRUFFdkJJLE1BRnVCLENBRWhCLEtBRmdCLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtY2hlY2tcblxuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5leHBvcnQgZGVmYXVsdCAodmFsdWUpID0+IGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKVxuICAudXBkYXRlKHZhbHVlKVxuICAuZGlnZXN0KCdoZXgnKTtcbiJdfQ==