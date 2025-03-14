import React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Box } from "@chakra-ui/react";
import Profile from "./Profile/Profile";
import { GetSender } from "../chatlist/ChatRequirements";
import { ChatState } from "@/components/ApiContext/ChatProvider";

const ChatHead = () => {
  const { notification, setNotification, user, setSelectedChat } = ChatState();

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="5px 10px"
      height="50px"
      backdropFilter="blur(10px)"
      opacity="0.8"
      backgroundColor="black"
      position="sticky"
      top="0"
    >
      <Box color="white">Chit-Chat</Box>

      <Box color="white" display="flex" alignItems="center" gap="10px">
        <MenuRoot>
          <MenuTrigger asChild>
            <Badge
              badgeContent={notification.length}
              color="primary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MailIcon sx={{ color: "white" }} />
            </Badge>
          </MenuTrigger>

          <MenuContent>
            {notification.length === 0 ? (
              <MenuItem>No new notifications</MenuItem>
            ) : (
              notification.map((notify) => (
                <MenuItem key={notify._id} onClick={()=>{setSelectedChat(notify.chat); 
                setNotification(notification.filter((n)=>n.chat._id!=notify.chat._id))}}>
                  New message from {GetSender(user, notify.chat.users)}
                </MenuItem>
              ))
            )}
          </MenuContent>
        </MenuRoot>

        <Profile />
      </Box>
    </Box>
  );
};

export default ChatHead;
