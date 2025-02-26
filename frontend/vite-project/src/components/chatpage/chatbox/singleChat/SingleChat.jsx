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
         height="89vh" 
          
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
           { selectedChat?
             !selectedChat.isGroupChat?
            //Chat Title
            <Box display="flex"  alignItems="center" width="100%"
                 justifyContent={selectedChat?"flex-start":"center"}
                 paddingLeft="15px"
                 backgroundColor="white"
                 borderRadius="10px"
                 gap="10px">
                <Box><SingleChatProfile/></Box>

                <Text color="black" margin="0px" paddingLeft="10px">
                    { user ? GetSender(user, selectedChat.users) : "Select users to chat with"}
                </Text>
                
            </Box>
            :
            //GroupChat title
            <Box display="flex"  alignItems="center" width="100%"
                 justifyContent={selectedChat?"space-around":"center"}
                 paddingLeft="15px"
                 backgroundColor="white"
                 borderRadius="10px"
                 gap="10px">
                <Text color="black" margin="0px" paddingLeft="10px">
                    { user ? selectedChat.chatName : "Select users to chat with"}
                </Text>
                {/*display group info button only if a chat is selected */}
                <GroupChatProfile/>
            </Box>
            :
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" 
                  backgroundColor="white"
                  borderRadius="10px">
              SelectedUsers to chat with 
            </Box>
           }
            {/* {ChatBox} */}
        </Box>
        {
          selectedChat?<MessageBox/>:null
        }
    </Box>
    
    
  );
};

export default SingleChat;


