const express = require('express');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth.route");
const messagesRoutes = require("./routes/message.route");

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

app.listen(PORT, () => {console.log("server running on port:" + PORT);

});