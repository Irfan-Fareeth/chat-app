const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, photo} = req.body;

    if(!name|| !email || !password)
    {
        res.status(400).json({ message: "enter all the fields" });
        throw new Error("Please Enter all the Fields");
    }


    const userExists = await User.findOne({email});

    if(userExists)
    {
        res.status(400).json({ message: "User already exists" });

        throw new Error("User already exits");
    }
    const pic = photo;
    const user = await User.create(
        {
            name, email, password, pic
        }
    );

    if(user)
    {
        res.status(201).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id) // jwt token

            }
        )
    }
    else
    {
        res.status(400);
        throw new Error("Failed to Create the user");
    }


})

const authUser = asyncHandler( async(req, res)=>
{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password)))
    {
        res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            }
        );
    }
    else
    {
        res.status(401).json({message: "Invalid Email or Password"});
        throw new Error("Invalid Email or password");
    }
});

const allUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search 
    ? {
        $or: [
            { name: { $regex: `^${req.query.search}` , $options: "i" } },
            { email: { $regex: `^${req.query.search}`, $options: "i" } }
        ],
    } 
    : {};

    try {
        const users = await User.find(keyword).find({_id: { $ne:req.user._id }});
        res.send(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = { registerUser, authUser, allUser };