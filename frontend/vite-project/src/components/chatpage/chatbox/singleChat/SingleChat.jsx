import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { GetSender } from '../../chatlist/ChatRequirements';
import { ArrowLeft } from 'lucide-react';
import { ChatState } from '@/components/ApiContext/ChatProvider';
import SingleChatProfile from './singleChatProfile/SingleChatProfile';
import GroupChatProfile from './singleChatProfile/GroupChatProfile';
import MessageBox from './singleChatProfile/messages/MessageBox';
const SingleChat = () => {
  const { selectedChat, user, setSelectedChat } = ChatState();

  return (
    <Box width="100%" 
         minHeight="100%" 
         maxHeight="100%"
         display="flex" 
         flexDirection="column"
         gap="10px">
      {/*header for the chat box {backarrow, }*/}
      <Box 
    display="flex" 
    flexDirection="column" 
    height="100%" gap="5px"
    width="100%"
  >
    {/* Header Section */}
    <Box 
      display="flex" 
      flexDirection="row" 
      height="auto"
      minHeight={selectedChat ? "50px" : "100%"}
      width="100%"
      gap="10px"
      
      borderRadius="5px"
    >
      {/* Back Arrow (Visible only on small screens) */}
      <Box display={{ base: "flex", md: "none" }} cursor="pointer" color="black" width="20%"
          justifyContent="center"
          alignItems="center"
          borderRadius="10px"
          backgroundColor="#EAFAEA"
          onClick={() => setSelectedChat(null)}
      >
        <ArrowLeft size={24} />
      </Box>

      {selectedChat ? (
        !selectedChat.isGroupChat ? (
          // Chat Title
          <Box display="flex" alignItems="center" flex="1"
              justifyContent="flex-start"
              paddingLeft="15px"
              backgroundColor="#EAFAEA"
              borderRadius="10px"
              gap="10px"
          >
            <Box><SingleChatProfile/></Box>
            <Text color="black" margin="0px" paddingLeft="10px">
              { user ? GetSender(user, selectedChat.users) : "Select users to chat with"}
            </Text>
          </Box>
        ) : (
          // GroupChat title
          <Box display="flex" alignItems="center" flex="1"
              justifyContent="space-around"
              paddingLeft="15px"
              backgroundColor="#EAFAEA"
              borderRadius="10px"
              gap="10px"
          >
            <Text color="black" margin="0px" paddingLeft="10px">
              { user ? selectedChat.chatName : "Select users to chat with"}
            </Text>
            <GroupChatProfile />
          </Box>
        )
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" flex="1" 
            backgroundColor="#EAFAEA"
            borderRadius="10px"
        >
          Select users to chat with 
        </Box>
      )}
    </Box>

    {/* Chat Messages Section */}
    <Box flex="1" minHeight="0">
      {selectedChat && <MessageBox />}
    </Box>
      </Box>

    </Box>
    
    
  );
};

export default SingleChat;


