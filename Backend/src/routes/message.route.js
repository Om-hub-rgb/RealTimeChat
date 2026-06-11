const express = require("express");
const { getAllContacts, getMessagesByUserId, 
   sendMessage, getChatPartners, } = require("../controllers/message.controller.js");
const protectRoute = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/contacts", protectRoute, getAllContacts);
router.get("/chats",protectRoute, getChatPartners);
router.get("/:id", protectRoute, getMessagesByUserId);
router.post("/send/:id", protectRoute, sendMessage);


module.exports = router;