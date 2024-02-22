import { Router } from "express";
import { createMessage, getMessagesByGuildChannel } from "../controllers/message.controller";

const messageRouter:Router = Router()

messageRouter.post('/message',createMessage)
messageRouter.get('/messages/:id', getMessagesByGuildChannel)

export default messageRouter