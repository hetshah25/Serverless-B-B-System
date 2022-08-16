import LexChat from "react-lex-plus";
import React, { Component } from "react";

const ChatBot = () => {
  return (
    <LexChat
      botName="finalbot"
      IdentityPoolId="us-east-1:15d2a9f0-9320-424c-9c78-eea38a5054db"
      placeholder="Placeholder text"
      backgroundColor="#FFFFFF"
      height={430}
      region="us-east-1"
      headerText="Chat with our bot"
      headerStyle={{ backgroundColor: "#000000", fontSize: "1rem" }}
      greeting={"Hello, how can I help?"}
    />
  );
};

export default ChatBot;
