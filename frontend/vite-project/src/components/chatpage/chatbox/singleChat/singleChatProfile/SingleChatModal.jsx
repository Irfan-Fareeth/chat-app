import React from 'react'
import Modal from "react-bootstrap/Modal";
import { Box, Text, Avatar } from "@chakra-ui/react";
import { ChatState } from "@/components/ApiContext/ChatProvider";
import { GetEmailId, GetSender, isNonLoggedUser } from "@/components/chatpage/chatlist/ChatRequirements";
const SingleChatModal = (props) => {
    const {user, selectedChat} = ChatState();
    const chatUser =
    selectedChat && selectedChat.users
      ? isNonLoggedUser(user, selectedChat.users[0])
        ? selectedChat.users[0]
        : selectedChat.users[1]
      : null;

  return (
        
        <Modal {...props} size="md" centered>
          <Modal.Body border="2px solid #143D60"> {/*#143D60*/}
          <Box  height="100%" width="100%">
                <Avatar.Root style={{ width: "100%", height: "100%", backgroundColor: "transparent"}} shape="square">
                <Avatar.Image src={chatUser?.pic} className="avatar-image" />
                </Avatar.Root>
                <Box width="100%" style={{display: "flex", justifyContent:"center"}}>{chatUser?.email}</Box>
            </Box>
          </Modal.Body>
        </Modal>
  )
}

export default SingleChatModal
