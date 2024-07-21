"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objection = require("objection");

var _objectionUnique = _interopRequireDefault(require("objection-unique"));

var _secure = _interopRequireDefault(require("../lib/secure.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
const unique = (0, _objectionUnique.default)({
  fields: ['email']
});

class User extends unique(_objection.Model) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        id: {
          type: 'integer'
        },
        email: {
          type: 'string',
          format: 'email'
        },
        password: {
          type: 'string',
          minLength: 3
        }
      }
    };
  }

  set password(value) {
    this.passwordDigest = (0, _secure.default)(value);
  }

  verifyPassword(password) {
    return (0, _secure.default)(password) === this.passwordDigest;
  }

}

exports.default = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9tb2RlbHMvVXNlci5qcyJdLCJuYW1lcyI6WyJ1bmlxdWUiLCJmaWVsZHMiLCJVc2VyIiwiTW9kZWwiLCJ0YWJsZU5hbWUiLCJqc29uU2NoZW1hIiwidHlwZSIsInJlcXVpcmVkIiwicHJvcGVydGllcyIsImlkIiwiZW1haWwiLCJmb3JtYXQiLCJwYXNzd29yZCIsIm1pbkxlbmd0aCIsInZhbHVlIiwicGFzc3dvcmREaWdlc3QiLCJ2ZXJpZnlQYXNzd29yZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUVBOzs7O0FBTEE7QUFPQSxNQUFNQSxNQUFNLEdBQUcsOEJBQWdCO0FBQUVDLEVBQUFBLE1BQU0sRUFBRSxDQUFDLE9BQUQ7QUFBVixDQUFoQixDQUFmOztBQUVlLE1BQU1DLElBQU4sU0FBbUJGLE1BQU0sQ0FBQ0csZ0JBQUQsQ0FBekIsQ0FBaUM7QUFDMUIsYUFBVEMsU0FBUyxHQUFHO0FBQ3JCLFdBQU8sT0FBUDtBQUNEOztBQUVvQixhQUFWQyxVQUFVLEdBQUc7QUFDdEIsV0FBTztBQUNMQyxNQUFBQSxJQUFJLEVBQUUsUUFERDtBQUVMQyxNQUFBQSxRQUFRLEVBQUUsQ0FBQyxPQUFELEVBQVUsVUFBVixDQUZMO0FBR0xDLE1BQUFBLFVBQVUsRUFBRTtBQUNWQyxRQUFBQSxFQUFFLEVBQUU7QUFBRUgsVUFBQUEsSUFBSSxFQUFFO0FBQVIsU0FETTtBQUVWSSxRQUFBQSxLQUFLLEVBQUU7QUFBRUosVUFBQUEsSUFBSSxFQUFFLFFBQVI7QUFBa0JLLFVBQUFBLE1BQU0sRUFBRTtBQUExQixTQUZHO0FBR1ZDLFFBQUFBLFFBQVEsRUFBRTtBQUFFTixVQUFBQSxJQUFJLEVBQUUsUUFBUjtBQUFrQk8sVUFBQUEsU0FBUyxFQUFFO0FBQTdCO0FBSEE7QUFIUCxLQUFQO0FBU0Q7O0FBRVcsTUFBUkQsUUFBUSxDQUFDRSxLQUFELEVBQVE7QUFDbEIsU0FBS0MsY0FBTCxHQUFzQixxQkFBUUQsS0FBUixDQUF0QjtBQUNEOztBQUVERSxFQUFBQSxjQUFjLENBQUNKLFFBQUQsRUFBVztBQUN2QixXQUFPLHFCQUFRQSxRQUFSLE1BQXNCLEtBQUtHLGNBQWxDO0FBQ0Q7O0FBdkI2QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1jaGVja1xuXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJ29iamVjdGlvbic7XG5pbXBvcnQgb2JqZWN0aW9uVW5pcXVlIGZyb20gJ29iamVjdGlvbi11bmlxdWUnO1xuXG5pbXBvcnQgZW5jcnlwdCBmcm9tICcuLi9saWIvc2VjdXJlLmpzJztcblxuY29uc3QgdW5pcXVlID0gb2JqZWN0aW9uVW5pcXVlKHsgZmllbGRzOiBbJ2VtYWlsJ10gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyB1bmlxdWUoTW9kZWwpIHtcbiAgc3RhdGljIGdldCB0YWJsZU5hbWUoKSB7XG4gICAgcmV0dXJuICd1c2Vycyc7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGpzb25TY2hlbWEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcmVxdWlyZWQ6IFsnZW1haWwnLCAncGFzc3dvcmQnXSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWQ6IHsgdHlwZTogJ2ludGVnZXInIH0sXG4gICAgICAgIGVtYWlsOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdlbWFpbCcgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgdHlwZTogJ3N0cmluZycsIG1pbkxlbmd0aDogMyB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgc2V0IHBhc3N3b3JkKHZhbHVlKSB7XG4gICAgdGhpcy5wYXNzd29yZERpZ2VzdCA9IGVuY3J5cHQodmFsdWUpO1xuICB9XG5cbiAgdmVyaWZ5UGFzc3dvcmQocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gZW5jcnlwdChwYXNzd29yZCkgPT09IHRoaXMucGFzc3dvcmREaWdlc3Q7XG4gIH1cbn1cbiJdfQ==