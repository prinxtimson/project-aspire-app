import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

const botName = "ELint-X Bot";

const config = {
    botName: botName,
    lang: "no",
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#5ccc9d",
        },
    },
    initialMessages: [
        createChatBotMessage(
            "Hello, I'm an admin of ElintX. I'm here to help you"
            //`Hi I'm ${botName}. I’m here to help you explain how I work.`
        ),
    ],
};

export default config;
