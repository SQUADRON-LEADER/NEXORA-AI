'use client'
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'
import config from "../config";
import ActionProvider from "../Actionprovider";
import MessagePraser from "../MessageParser";
const ChatComponent = () => {
    return (
        <div>
        <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessagePraser}
        />
        </div>
    )
}
export default ChatComponent;