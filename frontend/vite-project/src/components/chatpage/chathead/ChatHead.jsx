import React from 'react'
import { Box} from "@chakra-ui/react"
import './ChatHead'
import  Profile from './Profile/Profile'
const ChatHead = () => {
  return (
    <Box width="100%" display ="flex" justifyContent="space-between"  alignItems="center" padding="5px 10px 5px 10px"
         height='50px' backdropFilter="blur(10px)" opacity="0.8" backgroundColor="black" position="sticky" top="0">
        <Box color='white' >
            Chit-Chat
        </Box>
        <Box color='white'>
            <Profile/>
        </Box>
    </Box>
  )
}

export default ChatHead
