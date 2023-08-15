import chatModel from "../models/chat.js";

export default class ChatManagerDb {
  getAllChats = async () => {
    try {
      const result = await chatModel.find();
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  saveChat = async (chat) => {
    try {
      const result = await chatModel.create(chat);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
