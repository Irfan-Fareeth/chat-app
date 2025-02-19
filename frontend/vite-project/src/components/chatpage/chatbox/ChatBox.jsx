import React from 'react';
import './ChatBox.css'; 
import { Box} from '@chakra-ui/react';
import { ChatState } from '@/components/ApiContext/ChatProvider';
import SingleChatProfileTab from './singleChat/singleChatProfile/SingleChatProfileTab';
import SingleChat from './singleChat/SingleChat';
const ChatBox = () => {
  const { selectedChat, user, visibleProfileTab } = ChatState();

  return (
    <>
    
    <Box
      padding="0px 10px"
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      justifyContent="center"
      w={{ base: "100%", md: "68%" }}
      height="100%"
    >
    {!visibleProfileTab?  
      <SingleChat/>:
      <SingleChatProfileTab/>
    }
    </Box>
    </>
  );
};

export default ChatBox;
