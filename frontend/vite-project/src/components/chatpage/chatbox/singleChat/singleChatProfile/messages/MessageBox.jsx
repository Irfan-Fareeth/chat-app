import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChatState } from "@/components/ApiContext/ChatProvider";
import { ThreeDot } from "react-loading-indicators";
import axios from "axios";
import { isLoggedUser } from "@/components/chatpage/chatlist/ChatRequirements";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const MessageBox = () => {
  const [newMessage, setNewMessage] = useState("");
  const { user, selectedChat } = ChatState();
  const [allMessages, setAllMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  //useEffect to 
  useEffect(()=>
  {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on('connected', ()=>setSocketConnected(true));
  }, []);


  useEffect(() => {
    setAllMessages([]);
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);


  useEffect(()=>
  {
    socket.on("message received", (newMessageReceived)=>
    {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id)
      {
        //notification
      }
      else
      {
        setAllMessages([...allMessages, newMessageReceived]);
      }
    });
  })
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [allMessages]);

  const chatIdRef = useRef(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    chatIdRef.current = selectedChat._id; // Track the latest selected chat
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
  
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
  
      // Ensure that we only update messages for the latest selected chat
      if (chatIdRef.current === selectedChat._id) {
        setAllMessages(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      socket.emit('join chat', selectedChat._id);
      setIsLoading(false);
    }
  };
  

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setNewMessage("");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/message",
        { chatId: selectedChat._id, content: newMessage },
        config
      );

      socket.emit('new message', data);
      setAllMessages([...allMessages, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box 
  display="flex" 
  flexDirection="column" 
  height="100%" 
  width="100%" 
  gap="5px"
>
  {/* Message Display Section */}
  <Box
    flex="1"
    overflowY="auto"
    borderRadius="4px"
    padding="10px"
    display="flex"
    flexDirection="column"
    gap="5px"
    style={{ scrollbarWidth: "none" }}
    backgroundColor="#EAFAEA"
    minHeight="0" /* Ensures flexbox does not break scrolling */
    ref={messagesContainerRef}
  >

        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="80%">
            <ThreeDot variant="bounce" color="#395496" size="medium" text="Loading" textColor="#395496" />
          </Box>
        ) : (
          <>
            {/* Encryption Message */}
            <Box
              width="100%" borderRadius="4px" 
              borderRadius="px"
              marginBottom="6px"
              padding="5px"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              backgroundColor="#27445D"
              color="white"
              alignItems="center"
            >
              <Box display="flex" justifyContent="center">
                **🔒 Messages are end-to-end encrypted**
              </Box>
              No one outside of this chat, not even ChitChat, can read or listen to them.
            </Box>
            {/* Chat Messages */}
            {allMessages.map((message) => (
              <Box 
                display="flex"
                width="100%"
                key={message._id}
                justifyContent={isLoggedUser(user, message.sender) ? "flex-end" : "flex-start"}
              >
                <Box
                  maxWidth="45%"
                  display="flex"
                  justifyContent={isLoggedUser(user, message.sender) ? "flex-end" : "flex-start"}
                  minHeight="40px"
                  alignItems="center"
                  padding="8px"
                  fontSize="75%"
                  borderRadius="10px"
                  color="white"
                  backgroundColor={isLoggedUser(user, message.sender) ? "#27445D" : "#71BBB2"}
                >
                  {message.content}
                </Box>
              </Box>
            ))}

            {/* Dummy div to scroll to bottom */}
            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      {/* Input Section */}
      <Box minHeight="50px" maxHeight="50px" width="100%" borderRadius="4px" padding="2px" backgroundColor="#EAFAEA">
        <Box width="100%" height="100%" display="flex" gap="2px" paddingLeft="2px" backgroundColor="#EAFAEA">
          <input
            type="text"
            placeholder="Send message..."
            height="100%"
            style={{ width: "100%", outline: "none", backgroundColor: "#EAFAEA" }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Listen for Enter key
          />

          <Box
            height="100%"
            padding="10px"
            backgroundColor="black"
            color="white"
            borderRadius="4px"
            onClick={sendMessage}
            cursor="pointer"
          >
            Send
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageBox;
