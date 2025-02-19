import React, { useState } from 'react'
import { Box, Text, Avatar } from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { ChatState } from '@/components/ApiContext/ChatProvider';
import { GetEmailId, GetSender } from '@/components/chatpage/chatlist/ChatRequirements';
import './center.css'
const SingleChatProfileTab = () => {
  const { setVisibleProfileTab, user, selectedChat} = ChatState();
  return (
    <Box 
        width="100%" 
        height={{ base: "92%", md: "80%" }}
         padding="15px" 
         display="flex" 
         flexDirection="column"
         gap="10px"

>
    
    <Box display="flex" cursor="pointer" color="black" width="100%"
         height="50px"
         justifyContent="flex-start"
         alignItems="center"
         backgroundColor="white"
         borderRadius="10px"
         paddingLeft="10px"
         gap="10px"
         onClick={()=>{setVisibleProfileTab(false)}}>

        <ArrowLeft size={24} />
    </Box>
    <Box display="flex"  alignItems="center" width="100%"
         height="89%"
         padding="15px"
        
         borderRadius="10px"
         gap="10px"
         flexDirection="column">
        <Box height="10%" className="centeralized" width={{base:"100%", md: "70%"}} backgroundColor="white"
             borderRadius="10px">
          <Text margin="0px" className="centralized">{selectedChat?GetSender(user, selectedChat.users):null}</Text>
        </Box>
        <Box height="80%" width={{base:"100%", md: "70%"}} className="centeralized" borderRadius="10px">
           <Avatar.Root style={{ height: "100%", width: "100%" }} shape="rounded">
                      <Avatar.Image 
                        src={"vite.svg"} 
                        style={{ width: "100%", height: "100%", objectFit: "contain" }} 
                      />
            </Avatar.Root>
        </Box>
        <Box height="10%" className="centeralized" width={{base:"100%", md: "70%"}} backgroundColor="white"
             borderRadius="10px">
          <Text margin="0px">{selectedChat?GetEmailId(user, selectedChat.users):null}</Text>
        </Box>
    </Box>
  </Box>
  );
}

export default SingleChatProfileTab;
