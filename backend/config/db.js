const mongoose = require("mongoose");
const connectDB = async()=>{
    try
    {
        console.log(process.env.MONGO_URL);
        const conn = await mongoose.connect("mongodb+srv://learnerProtocol:Irfan4002@cluster0.qz3pe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
        });
        console.log(`Mongo DB Connected: ${conn.connection.host}`);
    }
    catch(error)
    {
        console.log(`Error:${error}`);
        process.exit();
    }

}

module.exports = connectDB;