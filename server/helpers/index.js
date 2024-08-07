import i18next from "i18next";
import _ from "lodash";

export default (app) => ({
  route(name) {
    return app.reverse(name);
  },
  t(key) {
    return i18next.t(key);
  },
  _,
  getAlertClass(type) {
    switch (type) {
      case "error":
        return "danger";
      case "success":
        return "success";
      case "info":
        return "info";
      default:
        throw new Error(`Unknown flash type: '${type}'`);
    }
  },
  formatDate(str) {
    const date = new Date(str);
    return date.toLocaleString();
  },
});

export const isAuthoriedUser = (sessionUser, requiredUserId) => sessionUser.id === requiredUserId;

export const redirectToRootIfNotAuthenticated = (app) => (req, reply, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", i18next.t("flash.users.edit.error.noAuth"));
    return reply.redirect(app.reverse("root"));
  }

  return next();
};

export const formDataToTask = (req, res, next) => {
  Object.keys(req.body.data)
    .filter((key) => key.includes("Id"))
    .forEach((key) => {
      if (_.isEmpty(req.body.data[key])) {
        delete req.body.data[key];
      } else {
        req.body.data[key] = Number(req.body.data[key]);
      }
    });
  if (req.body.data.labels) {
    req.body.data.labels = Array(req.body.data.labels)
      .flat()
      .map((labelId) => Number(labelId));
  }
  next();
};

export const getSelectedItems = (items, ids) =>
  items.map((item) => ({
    ...item,
    selected: ids.includes(item.id),
  }));

export const getDataByModels = async (Status, User) => {
  const [statuses, users, labels] = await Promise.all([Status.query(), User.query()]);
  return { statuses, users, labels };
};

export const processData = async (task, statuses, users) => {
  const statusesWithSelected = getSelectedItems(statuses, [task.statusId]);
  const usersWithSelected = getSelectedItems(users, [task.executorId]);

  return { statuses: statusesWithSelected, users: usersWithSelected };
};
