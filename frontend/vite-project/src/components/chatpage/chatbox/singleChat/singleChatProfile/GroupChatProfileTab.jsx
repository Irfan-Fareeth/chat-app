import React, { useState } from 'react';
import { Box, Avatar, Spinner, Text, HStack, VStack } from '@chakra-ui/react';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ChatState } from '@/components/ApiContext/ChatProvider';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import './center.css';
import axios from 'axios';
import AddMembers from './addMembers';

const GroupChatProfileTab = () => {
  const { setVisibleProfileTab, user, selectedChat, setSelectedChat, fetchChats } = ChatState();
  const [removeLoading, setRemoveLoading] = useState(null);
  const [chatName, setChatName] = useState('');
  const [renameLoading, setRenameLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  //to confirm removing a user 
  const [confirming, setConfirming] = useState({});

  const renameGroup = async () => {
    if (!chatName) return;
    setRenameLoading(true);
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/renameGroup",
        { chatId: selectedChat._id, chatName },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      await fetchChats();
      setSelectedChat(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setRenameLoading(false);
  };

  const removeFromGroup = async (u) => {
    if (removeLoading === u._id) return;
    if (removeLoading) return;
    setRemoveLoading(u._id);
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/removeFromGroup",
        { chatId: selectedChat._id, userId: u._id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      await fetchChats();
      setSelectedChat(data);
       // Reset confirming state for this user
       setConfirming(prev => {
        const newState = { ...prev };
        delete newState[u._id]; 
        return newState;
    });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setRemoveLoading(null);
    }
  };

  return (
    <Box 
      width="100%" 
      height="88vh" // Full height for small screens
      padding="15px" 
      display="flex" 
      flexDirection="column" 
      gap="10px"
   
    >
      {/* Back Button */}
      <Box 
        display="flex" 
        cursor="pointer" 
        color="black" 
        width="100%"
        justifyContent="flex-start" 
        alignItems="center" 
        backgroundColor="white"
        borderRadius="10px" 
        paddingLeft="10px" 
        gap="10px"
        minHeight="30px"
        onClick={() => setVisibleProfileTab(false)}
      >
        <ArrowLeft size={24} />
      </Box>

      {/* Group Info */}
      <Box 
        display="flex" 
        alignItems="center" 
        width="100%" 
        height="100%" 
        padding="15px" 
        borderRadius="10px" 
        gap="10px" 
        flexDirection="column"
      >
        {/* Group Name Input */}
        <Box 
          height="50px" 
          className="centeralized" 
          width={{ base: "100%", md: "70%" }} 
          backgroundColor="white"
          borderRadius="10px" 
          gap="10px"
        >
          <Box 
            margin="0px" 
            className="centeralized" 
            fontSize="2em" 
            gap="10px" 
            width="100%"
            padding="10px"
          >
            <InputGroup>
              <Form.Control
                placeholder={selectedChat.chatName}
                onChange={(e) => setChatName(e.target.value)}
                style={{ border: "none", boxShadow: "none", borderRadius: "0" }}
              />
              {user._id === selectedChat.groupAdmin[0]._id && (
                <>
                  <Button
                    style={{ backgroundColor: "#143D60", border: "none" }}
                    onClick={renameGroup}
                    disabled={renameLoading} // Disables button while loading
                  >
                    {renameLoading ? <Spinner size="sm" /> : <Pencil size={20} />}
                  </Button>

                  <Button 
                    onClick={() => setModalShow(true)} 
                    style={{ backgroundColor: "#143D60", border: "none", borderLeft: "1px solid white" }}
                  >
                    Add Members
                  </Button>
                </>
              )}
            </InputGroup>
          </Box>
        </Box>

        {/* Group Members List */}
        <Box 
          width={{ base: "100%", md: "70%" }} 
          display="flex" 
          flexDirection="column" 
          borderRadius="10px" 
          backgroundColor="white" 
          maxHeight={{ base: "calc(100vh - 100px)", md: "90vh" }} 
          minHeight="65vh"
          overflowY="auto"
        >
          <Box maxHeight="65vh" padding="10px">
            {selectedChat.users.map((u) => (
              <Box 
                key={u._id} 
                display="flex" 
                padding="10px" 
                alignItems="center" 
                borderBottom="1px solid grey" 
                justifyContent="space-between"
              >
                {/* User Info */}
                <PopoverRoot trigger="hover">
                  <PopoverTrigger asChild>
                    <Box
                      cursor="pointer"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="row"
                    >
                      <Avatar.Root size="sm">
                        <Avatar.Fallback name="Default Profile" />
                        <Avatar.Image src={u.pic} />
                      </Avatar.Root>
                      <Box paddingLeft="10px" display="flex" gap="10px">
                        <Box >{u.name}</Box>
                        <Box>{selectedChat.groupAdmin[0]._id == u._id ? "(GroupAdmin)" : null}</Box>
                      </Box>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody border="6px solid #143D60">
                      <PopoverTitle fontWeight="medium" display="flex" justifyContent="center"
                              borderBottom="2px solid #143D60">
                        User's Profile
                      </PopoverTitle>
                      <Box display="flex" flexDirection="column" padding="20px">
                        <Box>Name: {u.name}</Box>
                        <Box>Email: {u.email}</Box>
                      </Box>
                      <Box width="100%" 
                          backgroundColor="#143D60" 
                          color="white"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="30px">
                        Message
                      </Box>

                    </PopoverBody>
                  </PopoverContent>
                </PopoverRoot>

                {/* Remove / Admin / Leave Buttons */}
                {selectedChat.groupAdmin[0]._id === user._id ? (
                  user._id !== u._id ? (
                    <Box 
                      cursor="pointer" 
                      
                      backgroundColor="white" 
                      borderRadius="10px" 
                    >
                      {removeLoading === u._id ? <Box color="red"><Spinner size="sm" /></Box> : 
                      confirming[u._id] ? (
                        <VStack gap="0">
                          <Text margin="0px" fontSize="10px">Are you sure?</Text>
                          <HStack>
                            <Button variant="outline-danger" style={{ fontSize: "10px", padding: "5px 5px", lineHeight: "1" }}
                            onClick={() => removeFromGroup(u)}>Yes</Button>
                            <Button variant="outline-success" style={{ fontSize: "10px", padding: "5px 5px", lineHeight: "1" }}
                             onClick={() => setConfirming(prev => ({ ...prev, [u._id]: false }))}>No</Button>
                          </HStack>
                        </VStack>
                      ) : (
                        <Button variant="outline-danger"  style={{ fontSize: "10px", padding: "5px 5px", lineHeight: "1" }} 
                        onClick={() => setConfirming(prev => ({ ...prev, [u._id]: true }))}>Remove</Button>
                      )
                    }
                    </Box>
                  ) : null
                ) : null}

                {u._id === user._id && selectedChat.groupAdmin[0]._id !== u._id ? (
                  <Box 
                    cursor="pointer" 
                    padding="5px" 
                    backgroundColor="white" 
                    borderRadius="10px" 
                    color="red"
                    onClick={() => removeFromGroup(u)}
                    fontSize={{ base: "13px" }}
                  >
                    {removeLoading === u._id ? <Spinner size="sm" /> : "Leave Group"}
                  </Box>
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>
        <Box backgroundColor="white" width="100%" height="100%">
          Huifaf
         </Box>
      </Box>

      <AddMembers show={modalShow} setModalShow={(v) => setModalShow(v)} members={selectedChat.users} onHide={() => setModalShow(false)} />
    </Box>
  );
};

export default GroupChatProfileTab;
