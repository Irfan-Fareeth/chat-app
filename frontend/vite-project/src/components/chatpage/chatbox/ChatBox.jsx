import React from 'react';
import './ChatBox.css'; 
import { Box} from '@chakra-ui/react';
import { ChatState } from '@/components/ApiContext/ChatProvider';
import GroupChatProfileTab from './singleChat/singleChatProfile/GroupChatProfileTab';
import SingleChat from './singleChat/SingleChat';
const ChatBox = () => {
  const { selectedChat, visibleProfileTab } = ChatState();

  return (
    <>
    
    <Box
      padding="0px 10px"
      paddingTop="10px"
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      justifyContent="center"
      w={{ base: "100%", md: "68%" }}
      minHeight="90vh"  maxHeight="90vh"
    >
    {!visibleProfileTab?  
      <SingleChat/>:
      <GroupChatProfileTab/>
    }
    </Box>
    </>
  );
};

export default ChatBox;
