const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
dotenv.config();
connectDB();
const app = express();
app.use(cors());
const PORT = process.env.PORT||5000;

app.use(express.json()); //to tell the server to accept the json data
app.get('/', (req, res)=>
{
    res.send("Api running!");
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.listen(PORT, console.log(`Server listening on port ${PORT}`));