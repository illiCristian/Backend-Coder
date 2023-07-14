import { createHash } from "../../utils.js";
import cartModel from "../models/cart.js";
import userModel from "../models/user.js";

class UserMongo {
  constructor() {
    this.userModel = userModel;
  }
  register = async (
    first_name,
    last_name,
    email,
    age,
    role,
    password,
    username
  ) => {
    try {
      const user = await this.userModel.findOne({ email: username }).exec();
      if (user) {
        console.log("El usuario existe");
        return false;
      }
      const newCart = await cartModel.create({});
      const newUser = {
        first_name,
        last_name,
        email,
        age,
        cart: newCart._id,
        role,
        password: createHash(password),
      };
      const result = await userModel.create(newUser);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  login = async (username) => {
    try {
      const user = await userModel.findOne({ email: username }).exec();
      if (!user) {
        console.log("No existe el usuario");
        return false;
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  findUserByEmail = async (email) => {
    try {
      const user = await userModel.findOne({ email: email }).exec();
      if (!user) {
        console.log("No existe el usuario");
        return false;
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  findUserById = async (id) => {
    try {
      const user = await userModel.findById(id).exec();
      if (!user) {
        console.log("No existe el usuario");
        return false;
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  createUser = async (user) => {
    try {
      const result = await userModel.create(user);
      if (!result) return false;
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
export default UserMongo;
