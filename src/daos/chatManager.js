import { chatModel } from "./models/chat.model.js";

class ChatManager{
    constructor() {
        this.model = chatModel;
      }

      async addMessage(chat) {
        try {
          return await this.model.create(chat);
        } catch (err) {
          throw err;
        }
      }
    
      async getChat() {
        try {
          return await this.model.find();
        } catch (err) {
          throw err;
        }
      }     
}

export { ChatManager }