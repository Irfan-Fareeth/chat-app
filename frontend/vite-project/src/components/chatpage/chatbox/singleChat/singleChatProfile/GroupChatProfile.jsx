import React from 'react'
import { Box } from "@chakra-ui/react"
import { ChatState } from '@/components/ApiContext/ChatProvider';

const GroupChatProfile = () => {

   const {setVisibleProfileTab} = ChatState();
  return (
    <>
    <Box cursor="pointer" fontWeight="bold"  onClick={()=>setVisibleProfileTab(true)} margin="2px">
        Group info
    </Box>
    </>
  )
}

export default GroupChatProfile;
