const cloudinary = require("../lib/cloudinary.js");
const Message = require("../models/message.js");
const User = require("../models/User.js");



const getAllContacts = async (req, res) => {
  try {
   // const loggedInUserId = req.user._id;
    const filteredUser = await User.find().select("-password")

    res.status(200).json(filteredUser);

  } catch (error) {
    console.log("Error in getAllcontacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMessagesByUserId = async (req, res) => {
 try { const myId = req.user._id;
  const {id:userToChatId} = req.params;

  const messages = await Message.find({
    $or: [
      {senderId:myId, receiverId: userToChatId},
      {senderId:userToChatId, receiverId: myId},
    ],
  });
 res.status(200).json(messages)
 } catch (error) {
   console.log("Error in getMessages controller:", error.message);
   res.status(500).json({ error: "Internal server error" });
 }

};

const sendMessage = async (req, res) => {
try {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let imageUrl;
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  await newMessage.save();
  res.status(201).json(newMessage);
} catch (error) {
  console.log("Error in sendMessage controller:", error.message);
  res.status(500).json({ error: "Internal server error" });
}
};

const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all the messages where the logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId}],
    });

    const getChatPartnerIds = [
      ...new Set (messages.map((msg) =>
         msg.senderId.toString() === loggedInUserId.toString() 
         ? msg.receiverId.toString() 
           : msg.senderId.toString())
    ),
  ];

  const getChatPartners = await 
  User.find({
    _id: { $in: getChatPartnerIds }
  }).select("-password");

  res.status(200).json(getChatPartners);
  } catch (error) {
    console.error("Error in getcChatPartners: ", error.message);
    res.status(500).json({ error: "Internal server error"});
  }
};
module.exports = { getAllContacts,
   getMessagesByUserId, 
   sendMessage,
   getChatPartners,
} ;