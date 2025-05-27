import React, { useEffect, useRef, useState } from "react";
import { Box,Center, Menu, Portal  } from "@chakra-ui/react";
import { ChatState } from "@/components/ApiContext/ChatProvider";
import { ThreeDot } from "react-loading-indicators";
import axios from "axios";
import { isLoggedUser } from "@/components/chatpage/chatlist/ChatRequirements";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const MessageBox = () => {
  const [newMessage, setNewMessage] = useState("");
  const { user, selectedChat, fetchChats } = ChatState();
  const [allMessages, setAllMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messageCache, setMessageCache] = useState({});
  //notificaiton
  const {notification, setNotification} = ChatState();
  //useEffect to 
  useEffect(()=>
  {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", ()=>setSocketConnected(true));
    socket.on("typing", ()=>setIsTyping(true));
    socket.on("stop typing", ()=> setIsTyping(false));
    return () => {
      socket.disconnect();
    };
  }, []);


  useEffect(() => {
    if(!selectedChat)
      return ;
    if (messageCache[selectedChat._id]) {
      // Show cached messages immediately
      setAllMessages(messageCache[selectedChat._id]);
      socket.emit('join chat', selectedChat._id);
    } else {
      setAllMessages([]); // Clear while loading new messages
      fetchMessages();
    }
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  


 
  useEffect(() => {
    const messageHandler =  (newMessageReceived) => {
      if (selectedChat==""|| !selectedChat || selectedChat._id != newMessageReceived.chat._id) {

          setNotification((prev) => [newMessageReceived, ...prev]);
        
      } else {

        setAllMessages((prevMessages => 
        {
          const updatedMessages = [...prevMessages, newMessageReceived];
          setMessageCache( prev => (
            {
              ...prev,
              [selectedChat._id]:updatedMessages,
            }
          ))
          return updatedMessages;
        }
        ))
      }
      fetchChats(); 
    };
  
    socket.on("message received",messageHandler);
    return () => socket.off("message received", messageHandler);
  }, [selectedChat, fetchChats]);
  
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
        setMessageCache( prev => ({
            ...prev,
            [selectedChat._id]: data
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      socket.emit('join chat', selectedChat._id);
      setIsLoading(false);
    }
  };
  
  const typingHandler = (e)=>
  {
    setNewMessage(e.target.value);

    if(!socketConnected) return ;
    if(!typing)
    {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(()=>
    {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if(timeDiff >= timerLength && typing)
      {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    socket.emit("stop typing", selectedChat._id);
    const messageToSend = newMessage;
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
        { chatId: selectedChat._id, content: messageToSend },
        config
      );
  
      socket.emit("new message", data);
  
      // Use a functional update to always work with the latest state
      setAllMessages(prevMessages => [...prevMessages, data]);
      await fetchChats();
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
  backgroundColor="transparent"
>
  {/* Message Display Section */}
      <Box
    flex="1"
    overflowY="auto"
    borderRadius="4px"
    padding="10px"
    paddingBottom="30px"
    display="flex"
    flexDirection="column"
    gap="5px" 
    style={{ scrollbarWidth: "none" }}
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
              marginBottom="6px"
              padding="5px"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              backgroundColor="transparent"
              color="white"
              alignItems="center"

            >
              <Box display="flex" justifyContent="center">
                **🔒 Messages are end-to-end encrypted**
              </Box>
              <Box display="flex" justifyContent="center">
                No one outside of this chat, not even ChitChat, can read or listen to them.
              </Box>
            </Box>
            {/* Chat Messages */}
            {allMessages.map((message) => (
              <Menu.Root>
              <Menu.ContextTrigger width="full">
                
                <Box 
                  display="flex"
                  width="100%"
                  key={message._id}
                  justifyContent={isLoggedUser(user, message.sender) ? "flex-end" : "flex-start"}
                >
                <Box
                    maxWidth="65%"
                    display="flex"
                    justifyContent={isLoggedUser(user, message.sender) ? "flex-end" : "flex-start"}
                    minHeight="40px"
                    alignItems="center"
                    padding="8px"
                    fontSize="75%"
                    borderRadius="10px"
                    color="white"
                    backgroundColor={isLoggedUser(user, message.sender) ? "#474E93" : "#71BBB2"}
                    background="rgba(255, 255, 255, 0.2)" /* More transparency */
                    backdropFilter="blur(15px)" /* Stronger blur */
                    boxShadow="0 4px 10px rgba(255, 255, 255, 0.2)" /* Soft glow effect */
                    border={isLoggedUser(user, message.sender)?"1px solid aqua":"1px solid #A0C878"} /* Subtle border */
                    >
                    <Box width="100%" height="100%">{message.content}</Box>
                    
                </Box>
                </Box>
                
              </Menu.ContextTrigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="new-txt">Delete</Menu.Item>
                    <Menu.Item value="new-file">Copy</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            
            ))}

            {/* Dummy div to scroll to bottom */}
            <div ref={messagesEndRef} />
          </>
        )}
      {isTyping?<ThreeDot variant="pulsate" color="#71BBB2" size="small" text="" textColor="#NaNNaNNaN" />
      :<></>}
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
            onChange={typingHandler}
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
