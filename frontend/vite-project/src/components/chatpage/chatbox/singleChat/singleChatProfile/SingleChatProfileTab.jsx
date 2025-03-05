import React from "react";
import { Box, Text, Avatar } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { ChatState } from "@/components/ApiContext/ChatProvider";
import { GetEmailId, GetSender, isNonLoggedUser } from "@/components/chatpage/chatlist/ChatRequirements";
import "./center.css";
import "./SingleChatProfileTab.css";
const SingleChatProfileTab = () => {
  const { setVisibleProfileTab, user, selectedChat } = ChatState();

  const chatUser =
    selectedChat && selectedChat.users
      ? isNonLoggedUser(user, selectedChat.users[0])
        ? selectedChat.users[0]
        : selectedChat.users[1]
      : null;

  return (
    <Box width="100%" height={{ base: "92%", md: "80%" }} p="10px" display="flex" flexDirection="column" gap="10px"
      alignItems="center">
      
      {/* Back Button */}
      <Box
        display="flex"
        cursor="pointer"
        color="black"
        width="100%"
        height="50px"
        justifyContent="flex-start"
        alignItems="center"
        backgroundColor="white"
        borderRadius="10px"
        pl="10px"
        gap="10px"
        onClick={() => setVisibleProfileTab(false)}
      >
        <ArrowLeft size={24} />
      </Box>

  
      {/* Profile Section */}
      <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    width={{ base: "100%", md: "60%" }} gap="20px"
    height="89%"
    padding="10px"
    borderRadius="15px"
    background="rgba(255, 255, 255, 0.1)" /* Transparent Background */
    backdropFilter="blur(15px)" /* Blur Effect */
    boxShadow="0px 4px 20px rgba(0, 0, 0, 0.2)" /* Soft Shadow */
    border="1px solid rgba(255, 255, 255, 0.2)" /* Light Border */
    flexDirection="column"
    transition="all 0.3s ease-in-out"
    
  >


    {/* Avatar Box */}
    <Box
      height="80%"
      width="100%"
      display="flex"

      overflow="hidden"
    
      
      transition="all 0.3s"
   
    >
      <Avatar.Root style={{ width: "100%", height: "100%", backgroundColor: "transparent"}} shape="square">
     
      <Avatar.Image src={chatUser?.pic} className="avatar-image" />

    </Avatar.Root>
  </Box>


    <Text margin="0" color="white">
      {selectedChat ? GetEmailId(user, selectedChat.users) : "No Email"}
    </Text>

 
</Box>

    </Box>
  );
};

export default SingleChatProfileTab;
