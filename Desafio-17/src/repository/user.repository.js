import { CreateUserDto } from "../Dao/Dto/user.dto";

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async createUser(user) {
    const newUser = new CreateUserDto(user);
    const newUserCreated = await this.dao.createUser(newUser);
    return newUserCreated;
  }
  async getUser(user) {
    const userDB = await this.dao.getUser(user);
    return userDB;
  }
  async createGithub(user) {
    const newUser = new CreateUserDto(user);
    const newUserCreated = this.dao.createGithub(newUser);
    return newUserCreated;
  }
}

export default UserRepository;
