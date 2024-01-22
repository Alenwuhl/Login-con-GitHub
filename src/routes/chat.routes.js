import { Router } from "express"
import { ChatManager } from "../daos/chatManager.js";

const router = Router();
const chatManager = new ChatManager("mongodb://localhost:27017");

router.get("/", async (req, res) => {
  const chats = await chatManager.getChat();

  try {
    res.json(chats);
  } catch (error) {
    console.error("Hubo un error al devolver los mensjaes", error);
    res.status(500).send("Hubo un error al devolver los mensajes");
  }
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(500).send(`Debes enviar algún mensaje.`);
    }
    const chats = await chatManager.addMessage(req.body);
    res.json({
      chats,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send(`Hubo un error al agregar el mensaje`);
  }
});

export default router