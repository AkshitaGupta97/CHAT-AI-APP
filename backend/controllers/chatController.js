import Chat from "../models/chat.js";

//Api controller for creating new chat
export const createChat = async(req, res) => {
    try {
        const userId = req.user._id; //we get userId from middleware
        const chatData = {
            userId, 
            messages: [],
            name: "New Chat",
            userName: req.user.name
        }
        await Chat.create(chatData);
        res.json({success: true, message: "Chat Created"});

    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

// Api controller for getting all chats
export const getChats = async(req, res) => {
    try {
        const userId = req.user._id; //we get userId from middleware
        const chats = await Chat.find({userId}).sort({updatedAt: -1});

        res.json({success: true, chats});

    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

// Api controller to delete chats
export const deleteChats = async(req, res) => {
    try {
        const userId = req.user._id; //we get userId from middleware
        const {chatId} = req.body;

        await Chat.deleteOne({_id: chatId, userId});

        res.json({success: true, message: "Chat Deleted"});

    } catch (error) {
        res.json({success:false, message: error.message});
    }
}
