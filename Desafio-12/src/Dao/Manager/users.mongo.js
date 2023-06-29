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
}
export default UserMongo;
