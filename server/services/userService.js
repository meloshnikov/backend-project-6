import User from "../models/User.cjs";

class UserService {
  constructor() {
    this.userModel = User;
  }

  getUsers = async () => this.userModel.query();

  getUserById = async (id) => this.userModel.query().findById(id);

  createUser = async (userData) => {
    const validUser = await this.userModel.fromJson(userData);
    return this.userModel.query().insert(validUser);
  };

  updateUser = async (userData) => {
    const user = await this.getUserById(userData.id);
    await this.userModel.fromJson(userData);
    user.$set(userData);
    await user.$query().patch();
  };

  deleteById = async (userId) => {
    const user = await this.getUserById(userId);
    await user.$query().delete();
  };
}

export default UserService;
