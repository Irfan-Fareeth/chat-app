const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const allMessages = asyncHandler(
    async(req, res)=>
    {
        try
        {
            const messages = await Message.find({chat: req.params.chatId})
                            .populate("sender", "name pic")
                            .populate("chat");
            res.json(messages);

        }catch(error)
        {
            res.status(400);
            throw new Error(error.message);
        }
    }
);
const sendMessages = asyncHandler(async (req, res) => {
    const { chatId, content } = req.body;

    if (!chatId || !content) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        let message = await Message.create(newMessage);

        message = await Message.findById(message._id)
            .populate("sender", "name pic")
            .populate({
                path: "chat",
                populate: { path: "users", select: "name pic email" }
            });

        console.log("New message sent: ", message);  // Debugging

        // Update latestMessage in the chat
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

        res.json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = {sendMessages, allMessages};