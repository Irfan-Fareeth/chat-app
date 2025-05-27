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

  const handleNotification = (notify) =>
  {
    setSelectedChat(notify.chat); 
    setNotification(notification.filter((n)=>n.chat._id!=notify.chat._id));
  };
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="5px 10px"
      height="50px"
      position="sticky"
      top="0"
      backgroundColor = "transparent"
      
    >

      <Box color="white" fontSize="2rem">
        <img src="./chatVengers.png" width={"100"} height="100"/>
      </Box>

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
            {notification.length==0? (
              <MenuItem>No new notifications</MenuItem>
            ) : (
              notification.map((notify) => (
                <MenuItem key={notify._id} onClick={()=>{handleNotification(notify)}}>
                  New message from {notify.chat.isGroupChat?notify.chat.chatName:GetSender(user, notify.chat.users)}
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
