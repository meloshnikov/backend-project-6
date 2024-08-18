import User from "../models/User.cjs";

export const isAuthoriedUser = (sessionUserId, requiredUserId) => sessionUserId === requiredUserId;

class AuthService {
  constructor() {
    this.userModel = User;
  }

  async checkUserAuthorization(userId, sessionUserId) {
    try {
      const user = await this.userModel.query().findById(userId);
      return isAuthoriedUser(sessionUserId, user.id);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default AuthService;
