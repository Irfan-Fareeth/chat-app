import React from 'react'
import { Avatar, Box } from "@chakra-ui/react"
import { ChatState } from '@/components/ApiContext/ChatProvider';
import { isNonLoggedUser } from '@/components/chatpage/chatlist/ChatRequirements';
const SingleChatProfile = () => {

   const {setVisibleProfileTab, selectedChat, user} = ChatState();
  return (
    <>
    <Box cursor="pointer" fontWeight="bold"  onClick={()=>setVisibleProfileTab(true)}>
        <Avatar.Root  size="sm">
            <Avatar.Fallback name="Default Profile" />
            <Avatar.Image src={isNonLoggedUser(user, selectedChat?.users[0])?  
              selectedChat?.users[0].pic:
              selectedChat?.users[1].pic} />
        </Avatar.Root>
    </Box>
    </>
  )
}

export default SingleChatProfile
