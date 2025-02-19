import React from 'react'
import { Avatar, Box } from "@chakra-ui/react"
import { ChatState } from '@/components/ApiContext/ChatProvider';

const SingleChatProfile = () => {

   const {setVisibleProfileTab} = ChatState();
  return (
    <>
    <Box cursor="pointer" fontWeight="bold"  onClick={()=>setVisibleProfileTab(true)}>
        <Avatar.Root  size="sm">
            <Avatar.Fallback name="irfan fareeth" />
            <Avatar.Image src="vite.svg" />
        </Avatar.Root>
    </Box>
    </>
  )
}

export default SingleChatProfile
