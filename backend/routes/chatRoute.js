import express from "express";
import { protect } from "../middleware/auth.js";
import { createChat, deleteChats, getChats } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get('/create', protect, createChat);
chatRouter.get('/get', protect, getChats);
chatRouter.post('/delete', protect, deleteChats); // ✅ correct

export default chatRouter;