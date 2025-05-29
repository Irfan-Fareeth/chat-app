const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
connectDB();
const app = express();
app.use(cors({
    origin: "https://chatapplicaton.onrender.com", // your frontend domain
    credentials: true,
}));
const PORT = process.env.PORT||5000;

app.use(express.json()); //to tell the server to accept the json data
app.get('/', (req, res)=>
{
    res.send("Api running!");
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
const server = app.listen(PORT, '0.0.0.0', console.log(`Server listening on port ${PORT}`));

const io = require('socket.io')(server,
    {   pingTimeout: 60000,
        cors: {
            origin: "*"

        }
    }
);

io.on("connection", (socket)=>
{
    console.log('connected to socket.io');

    //everytime when a user opens app they will connected to their own socket
    //new socket where frontend will send data and create new room
    socket.on('setup', (userData)=>
    {
        //room will be created 
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    });

    //when a user selected a chat. it will add the user to this chat room
    socket.on("join chat", (room)=>
        {
            socket.join(room);
            console.log("user Joined the room:" + room);
        });
        
    socket.on("typing", (room)=>socket.in(room).emit("typing"));
    socket.on("stop typing", (room)=>socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived)=>
    {
        var chat = newMessageReceived.chat;
        if(!chat.users) return console.log('chat.users not defined');

        //transferthe message to the chat room
        chat.users.forEach(user=>
        {
            if(user._id == newMessageReceived.sender._id) return;
            
            socket.in(user._id).emit("message received", newMessageReceived);
        }
        )

    });


    socket.off("setup", ()=>
    {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
