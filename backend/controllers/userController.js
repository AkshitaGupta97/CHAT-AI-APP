import User from "../models/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import Chat from "../models/chat.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

}
//console.log("JWT_SECRET =", process.env.JWT_SECRET);

// Api to register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("🔥 REGISTER HIT", req.body);

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.json({ success: false, message: "User already exist" });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res.json({ success: true, token });

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

// Api to login user 
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = generateToken(user._id);
        return res.json({ success: true, token });
      }
    }
    return res.json({ success: false, message: ' Invalid email or password' });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// API to get user data
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// Api to get published images
export const getPublishedImages = async (req, res) => {
  try {
    const publishedImagesMessages = await Chat.aggregate([
      { $unwind: "$messages" },
      {
        $match: {
          "messages.isImage": true,
          "messages.isPublished": true
        }
      },
      {
        $project: {
          _id: 0,
          imageUrl: "$messages.content",
          userName: "$userName"
        }
      }
    ])
    res.json({ success: true, images: publishedImagesMessages.reverse() })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

/*
Assume this is ONE document in Chat collection
{
  _id: "chat123",
  userId: "user001",
  userName: "Akshita",
  messages: [
    {
      role: "user",
      content: "Draw a cat",
      isImage: false,
      timestamp: 1
    },
    {
      role: "assistant",
      content: "https://ik.imagekit.io/app/cat.png",
      isImage: true,
      isPublished: true,
      timestamp: 2
    },
  ]
}
🔹Stage 1: $unwind
{ $unwind: "$messages" }  What $unwind does -> It breaks the messages array into individual documents.
Before $unwind = messages: [ msg1, msg2, msg3 ]
After $unwind = MongoDB turns one document into three:
{
  userName: "Akshita",
  messages: {
    role: "user",
    content: "Draw a cat",
    isImage: false
  }
}
{
  userName: "Akshita",
  messages: {
    role: "assistant",
    content: "https://ik.imagekit.io/app/cat.png",
    isImage: true,
    isPublished: true
  }
}
📌 Why we need this = You cannot filter inside an array directly.
$unwind lets MongoDB look at each message separately.
🔹 Stage 2: $match
{
  $match: {
    "messages.isImage": true,
    "messages.isPublished": true
  }
}
What $match does
Filters documents like a WHERE clause. MongoDB keeps ONLY documents where:  messages.isImage === true, messages.isPublished === true
Documents after $match  -> Only one document survives:
{
  userName: "Akshita",
  messages: {
    content: "https://ik.imagekit.io/app/cat.png",
    isImage: true,
    isPublished: true
  }
}
❌ These are removed: Text messages, Unpublished images
🔹 Stage 3: $project
{
  $project: {
    _id: 0,
    imageUrl: "$messages.content",
    userName: "$userName"
  }
}
What $project does : Shapes the final output format.
Field-by-field explanation -> _id: 0 -> Removes MongoDB’s default _id field
imageUrl: "$messages.content"
Takes: messages.content => Renames it to: imageUrl
userName: "$userName" : Keeps the parent chat’s user name
Final result document
{
  imageUrl: "https://ik.imagekit.io/app/cat.png",
  userName: "Akshita"
}
🧾 Final aggregation output (array)
[
  {
    imageUrl: "https://ik.imagekit.io/app/cat.png",
    userName: "Akshita"
  },
  {
    imageUrl: "https://ik.imagekit.io/app/flower.png",
    userName: "Rahul"
  }
]
🔥 
$unwind → break array into rows
$match → filter rows
$project → choose & rename fields
Aggregation always returns an array
 */
