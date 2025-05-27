import React, { useState } from 'react'
import { Avatar, Box } from "@chakra-ui/react"
import { ChatState } from '@/components/ApiContext/ChatProvider';
import { isNonLoggedUser, GetSender } from '@/components/chatpage/chatlist/ChatRequirements';
import SingleChatModal from './singleChatModal';
const SingleChatProfile = () => {

   const {selectedChat, user} = ChatState();
   const [modalShow, setModalShow] = useState(false);
  return (
    <>
    <Box cursor="pointer" fontWeight="bold"  onClick={()=>setModalShow(true)}>
        <Avatar.Root  size="sm">
            <Avatar.Fallback name={GetSender(user, selectedChat?.users[0])} />
            <Avatar.Image src={isNonLoggedUser(user, selectedChat?.users[0])?  
              selectedChat?.users[0].pic:
              selectedChat?.users[1].pic} />
        </Avatar.Root>
    </Box>
    <SingleChatModal show={modalShow} setModalShow={(v) => setModalShow(v)} onHide={() => setModalShow(false)} />
    </>
  )
}

export default SingleChatProfile
