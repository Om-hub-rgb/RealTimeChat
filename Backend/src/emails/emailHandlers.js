const { resendClient, sender } = require("../lib/resend.js")
const { createWelcomeEmailTemplate } = require("../emails/emailTamplates.js")

const sendWelcomeEmail = async (email,name,clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chatify!",
        html: createWelcomeEmailTemplate(name,clientURL) 
    })

    if(error){
        console.error("Error sending Welcome Email:", error);
        throw new Error("Failed to send Welcome Email");
    }

    console.log("Welcome Email sent successfully", data);
};

module.exports = { resendClient, sendWelcomeEmail};