import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../service/authService";

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessage() {
      const messageRef = doc(db, "/messages", "w40Az72UbrmlNSr34s9q");
      const messageDoc = await getDoc(messageRef);
      console.log(messageRef);
      if (messageDoc.exists()) {
        const messageData = messageDoc.data();
        const createdAt = messageData.createdAt;
        const text = messageData.text;
        setMessages(text);
        console.log("createdAt:", createdAt);
      } else {
        console.log("No such document!");
      }
    }
    fetchMessage();
  }, []);

  return <>{console.log(messages)}</>;
}

export default Chat;
