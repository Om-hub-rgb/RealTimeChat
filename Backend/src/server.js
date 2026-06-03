require("dotenv").config();
const express = require('express');
const path = require('path');

require('dotenv').config();



const app = express();
const rootdir = path.resolve();

console.log("ROOT:", rootdir);
console.log("DIST:", path.join(rootdir, "../Frontend/dist"));

const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth.route");
const messagesRoutes = require("./routes/message.route");
const connectDB = require("./lib/db.js");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

app.use(express.static(path.join(rootdir, "../Frontend/dist")));

app.get("/", (req, res) =>{
    res.sendFile(path.join(rootdir, "../Frontend/dist/index.html"));
});



app.listen(PORT, () => {
    console.log("server running on port:" + PORT);
    connectDB();

});