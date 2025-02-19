import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { GetSender } from '../../chatlist/ChatRequirements';
import { ArrowLeft } from 'lucide-react';
import { ChatState } from '@/components/ApiContext/ChatProvider';
import SingleChatProfile from './singleChatProfile/SingleChatProfile';
const SingleChat = () => {
  const { selectedChat, user, setSelectedChat } = ChatState();

  return (
    <Box width="100%" 
         height="92%" 
         padding="15px" 
         display="flex" 
         flexDirection="column"
         gap="10px">
      {/*header for the chat box {backarrow, }*/}
        <Box 
            display="flex" 
            flexDirection="row" 
            height={selectedChat?"50px":"100%"}
            width="100%"
            gap="10px"

        >
            {/* Back Arrow (Visible only on small screens) */}
            <Box display={{ base: "flex", md: "none" }} cursor="pointer" color="black" width="20%"
                 justifyContent="center"
                 alignItems="center"
                 backgroundColor="white"
                 borderRadius="10px"
                 onClick={()=>{setSelectedChat("")}}>
                <ArrowLeft size={24} />
            </Box>
            {/* Chat Title */}
            <Box display="flex"  alignItems="center" width="100%"
                 justifyContent={selectedChat?"flex-start":"center"}
                 paddingLeft="15px"
                 backgroundColor="white"
                 borderRadius="10px"
                 gap="10px">
                {selectedChat?<Box><SingleChatProfile></SingleChatProfile></Box>:null}
                <Text color="black" margin="0px">
                    {selectedChat && user ? GetSender(user, selectedChat.users) : "Select users to chat with"}
                </Text>
            </Box>
        </Box>
        {
          selectedChat?<Box height="90%" backgroundColor="white"
              borderRadius="10px"
              display="flex"
              justifyContent="center"
              alignItems="center">
              ChatBox
          </Box>:null
        }
    </Box>
    
    
  );
};

export default SingleChat;


