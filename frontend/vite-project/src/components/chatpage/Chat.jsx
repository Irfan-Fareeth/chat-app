import React from 'react'
import { Container, Box} from "@chakra-ui/react"
import { ChatState } from '../ApiContext/ChatProvider'
import ChatHead from './chathead/ChatHead'
import ChatList from './chatlist/ChatList'
import ChatBox from './chatbox/ChatBox'
import 'bootstrap/dist/css/bootstrap.min.css'; // to import react-bootstrap styling

const Chat = () => {
    const user = ChatState();
  return (
      <Box width="100%" padding="0px" backgroundImage="url(doodle-black.jpg)"
            backgroundColor="#143D60" 
            backgroundBlendMode="multiply"
        >
        <Box width="100%" >{<ChatHead/>}</Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" height='95vh'>
           {user && <ChatList/>}
           {user && <ChatBox/>}
        </Box>
      </Box>
  )
}

export default Chat
