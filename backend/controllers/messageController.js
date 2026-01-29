//import { googleAI } from "../config/googleAi.js";
import imageKit from "../config/imageKit.js";
import Chat from "../models/chat.js";
import User from "../models/user.js";
import axios from 'axios'
import openai from "../config/googleAi.js";

export const textMessageController = async (req, res) => {
  try {
    const { chatId, prompt } = req.body;
    const userId = req.user._id;

    if (req.user.credits < 1) {
      return res.json({ success: false, message: "Not enough credits" });
    }

    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // Save user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Get AI response
    const {choices} = await openai.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {...choices[0].message,  timestamp: Date.now(), isImage: false}

    // Save AI reply
    chat.messages.push(reply);
    await chat.save();

    // Deduct 1 credit
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    res.json({ success: true, reply });

  } catch (error) {
    console.error("OpenAI ERROR 👉", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// image generation message controller
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { prompt, chatId, isPublished } = req.body;

    if (!prompt?.trim()) {
      return res.json({ success: false, message: "Prompt is required" });
    }

    if (req.user.credits < 2) {
      return res.json({ success: false, message: "Not enough credits" });
    }
    // find chat
    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) {
      return res.json({ success: false, message: "Chat not found" });
    }

    // save user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Encode the prompt
    const encodedPrompt = encodeURIComponent(prompt);
    // construct imageKit Ai generation url
    const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/Chat-ai-app/${Date.now()}.png?tr=w-800,h-800`;
    // trigger image generation fetching from ImageKit
    const aiImageResponse = await axios.get(generatedImageUrl, {responseType: "arraybuffer"});
    // convert to Base64
    const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString('base64')}`;
    
    // Upload to Imagekit media library
    const uploadResponse = await imageKit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: 'Chat-ai-app'
    });

    const reply = {
      role: "assistant", 
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished
    }

    chat.messages.push(reply);
    await chat.save();

    // deduct credits
    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

    res.json({ success: true, reply });

  } catch (error) {
    console.error("IMAGE ERROR 👉", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

