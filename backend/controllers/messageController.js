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
const sendMessages = asyncHandler(
    async(req, res)=>
    {
        const {chatId, content}  = req.body;
        if(!chatId || !content)
        {
            console.log("Invalid data passed into request");
            return res.sendStatus(400);
        }
        var newMessages =
        {
            sender: req.user._id,
            content: content,
            chat: chatId
        };
        
        try
        {
            var message = await Message.create(newMessages);
            message = await message.populate("sender", "name pic");
            message = await message.populate("chat");
            message = await User.populate(message,
                {
                    path: "chat.users",
                    select: "name pic email",
                }
            );
            //to update latestmessage
            await Chat.findByIdAndUpdate(chatId, 
                {
                    latestMessage: message,
                }
            )
            res.json(message);
        }catch(error)
        {
            res.status(400);
            throw new Error(error.message);
        }
    }
)
module.exports = {sendMessages, allMessages};