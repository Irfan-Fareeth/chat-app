const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel")
const accessChats = asyncHandler(
    async(req, res)=>
    {
        const {userId} = req.body;
        const sender = await User.findOne({_id: userId});
        console.log(req.body);
        console.log(req.user._id);
        if(!userId)
        {
            console.log("UserId is not Sent with the request");
            return res.sendStatus(400)
        }
        let isChat = await Chat.find({
            isGroupChat: false,
            $and:[
                    {users: {$elemMatch: {$eq: userId}}},
                    {users: {$elemMatch: {$eq: req.user._id}}}
                ]
                
        }).populate("users","-password").populate("latestMessage");

        isChat = await User.populate(isChat,
            {
             path: "latestMessage.sender" ,
             select: "name email photo"
            }
        )

        if(isChat.length>0)
        {
            res.send(isChat[0]);
        }
        else
        {
            var chatData =
            {
                chatName: sender.name,
                isGroupChat: false,
                users: [req.user._id, userId]
            };
            try{
                const createChat = await Chat.create(chatData);
                const fullChat = await Chat.findOne({ id: createChat._id})
                .populate("users", "-password");

                res.status(200).send(fullChat);
            }
            catch(error)
            {
                res.status(400);
                throw new Error(error.message);
            }
        }
    }
);

const fetchChats = asyncHandler(
    async(req, res)=>
    {
        try{
        await Chat.find({ users: {$elemMatch: {$eq: req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin")
        .populate("latestMessage")
        .populate({
            path: "unreadMessages",
            populate: {
              path: "sender",
              select: "name email photo _id"
            }
          })          
        .sort({ updatedAt: -1})
        .then(async (result)=>
        {

            result = await User.populate(result, {
                path: "latestMessage.sender",
                select: "name email photo"
            })
            
            res.status(200).send(result);
        })
        

        }catch(error)
        {
            res.status(400).json({message: "tokenized"});
            throw new Error(error.message);
        }

    }
)

const createGroupChat = asyncHandler(
    async(req, res)=>
    {
        console.log("vander");
        if(!(req.body.users) || !(req.body.name))
        {
            return res.status(400).send({message: "Please fill all the fields"});
        }
        var users = JSON.parse(req.body.users);

        if(users.length<2)
            return res.status(400).send({message: "more than 2 users are required to form a group chat"});

        users.push(req.user);

        try
        {
            const createChat = await Chat.create(
                {
                    chatName: req.body.name,
                    users: users,
                    isGroupChat: true,
                    groupAdmin: req.user
                }
            );    
            
            const GroupChat = await Chat.findOne({_id: createChat._id})
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            
            res.status(200).json(GroupChat);

        }catch(error)
        {
              res.status(400);
              throw new Error(error.message);
        }

    }
);

const renameGroupChat = asyncHandler(
    async(req, res)=>
    {
        const {chatId, chatName} = req.body;
        if(!chatId || !chatName) return res.status(400).send({message: "Not enough credentials"});

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                chatName
            },
            {
                new: true
            }
        ).populate("users", "-password")
        .populate("groupAdmin", "-password");

        if(!updatedChat)
        {
            res.status(400);
            throw new Error("Chat Not found");
        }
        else
        {
            res.json(updatedChat);
        }

    }
);

const addToGroup = asyncHandler(
    async(req,res)=>
    {
        const {userToAdd, chatId} = req.body;
        if(!userToAdd || userToAdd.length<1)
            return res.status(400).send({message: "please select one or more users"});

        
        const updatedGroupChat = await Chat.findByIdAndUpdate(
            chatId,
            {$push: { users: userToAdd }},
            { new: true }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        
        if(!updatedGroupChat)
        {
            res.status(400);
            throw new Error("Group Chat Not found");
        }
        else
        {
            res.json(updatedGroupChat);
        }


    }
);

const removeFromGroup = asyncHandler(
    async(req, res)=>
    {
        const { userId, chatId } = req.body;
        const updatedGroupChat = await Chat.findByIdAndUpdate(chatId, 
            {$pull: { users:userId }},
            {new: true}
        ).populate("users", "-password")
        .populate("groupAdmin", "-password");

        if(!updatedGroupChat)
        {
            res.status(400);
            throw new Error("Group chat not found");
        }else
        {
            res.json(updatedGroupChat);
        }
    }
)
module.exports = { accessChats, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup};