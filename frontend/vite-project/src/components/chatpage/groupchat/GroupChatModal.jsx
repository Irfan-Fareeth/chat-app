import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { ChatState } from "@/components/ApiContext/ChatProvider";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Box, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton"
import  UserBadge  from "./UserBadge.jsx";
import { toaster } from "@/components/ui/toaster";
import {toast} from "react-hot-toast"
const GroupChatModal = ({setAddGroupModal,...props}) => {
      const user = ChatState();
      const {arr, setArr, fetchChats, setSelectedChat} = ChatState();
      const [userInfo, setUserInfo] = useState(null);
      const [availableChat, setAvailableChat] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [loading, setLoading] = useState(false);
      const [searched, setSearched] = useState(false); 
      const [selectedUsers, setSelectedUsers] = useState([]);
      const [groupName, setGroupName] = useState("");
      let searchTimeout;
// Set userInfo when user is available
useEffect(() => {
    if (user?.user) {
      setUserInfo(user.user);
    }
  }, [user]);

  // Reset search when modal is closed
  useEffect(() => {
    if (!props.show) {
      setSearchTerm("");
      setAvailableChat([]);
      setSearched(false); // Reset search state
    }
  }, [props.show]);

  // Fetch users with debouncing
    useEffect(() => {
    if (searchTerm=="") {
      setAvailableChat([]);
      setSearched(false); // Reset search state when input is cleared
      return;
    }
  
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 300); // Debounce delay of 300ms
  
    return () => clearTimeout(searchTimeout);
  }, [searchTerm, userInfo]);
  
  
  const fetchUsers = async (search) => {
    if (!userInfo || !userInfo.token) return;
    setLoading(true);
    setSearched(true); // Mark that a search was performed
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/register?search=${search}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setAvailableChat(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const addChat = (user) => {
    setSelectedUsers((prev) => {
      if (prev.some((u) => u._id === user._id)) return prev;
      return [user, ...prev];
    });
  };
  const RemoveUserBadge = (user) => {
        console.log("clicked");
        setSelectedUsers(prev => prev.filter(u => u._id !== user._id)); 
  };
  const CreateGroup = async()=>
  {
    console.log("createGroup clicked!");
    if(!groupName)
    {
      toast.error("Pls enter a group name");
      return ;
    }
    if(selectedUsers.length<2) 
    {

      toast.error("Pls select 2 or more users");
      return ;
    }
    
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/chat/group`,
        {
          name: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      await setArr([data,...arr]);
      await fetchChats();
      setAddGroupModal(false);
      console.log(data);
    }catch(error)
    {
      console.log(error);
    }

  }
  return (
    <Modal {...props} size="md" centered >
      
      <Modal.Body style={{ maxHeight: "70vh", minHeight: "40vh", overflowY: "scroll",
                   
       }}>
        <Box display="flex" justifyContent="center" flexDirection="row" gap="10px" flexWrap="wrap"
             paddingBottom="4px">
            {
                selectedUsers.map((u)=>
                (
                    <UserBadge key={u._id}user={u} RemoveUser={()=>RemoveUserBadge(u)}/>
                ))
            }
        </Box>
        <Box width="100%">
             
            <InputGroup className="mb-3">
              <InputGroup.Text style={{border:"none"}} >Group Name:</InputGroup.Text>
              <Form.Control
                placeholder="Search users..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                style={{
                  border: "none",
                  borderBottom: "1px solid grey",
                  boxShadow: "none",
                  borderRadius: "0",
                }}
              />
              
            </InputGroup>
        </Box>
        <Box width="100%">
            
            <InputGroup className="mb-3">
            <InputGroup.Text style={{border:"none"}} >Select users:</InputGroup.Text>
              <Form.Control
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm((e.target.value).trim())}
                style={{
                  border: "none",
                  borderBottom: "1px solid grey",
                  boxShadow: "none",
                  borderRadius: "0",
                }}
              />
              {/* <Button style={{ backgroundColor: "rgb(0,0,0, 0.5)", border: "none" }}>
                <Search size={18} />
              </Button> */}
            </InputGroup>
          </Box>
                
        <Box display="flex" flexDirection="column" gap="3" paddingRight="5px" className="mb-3" width="100%"
             height="12em" overFlowy="scroll">
            {loading ? (
                <Stack gap="3" width="100%">
                  <Skeleton height="3em" width="100%"/>
                  <Skeleton height="3em" width="100%"/>
                  <Skeleton height="3em" width="100%"/>
                </Stack>
          ) : searched && availableChat.length == 0 ? (
            <>
              <Text color="black" textAlign="center">User not found</Text>
              <Text color="black" textAlign="center">
                Try searching: spiderman, hulk, tony stark
              </Text>
            </>
          ) : availableChat.length > 0 ? (
            availableChat.slice(0, 3).map((chat) => (
              <Box
                key={chat._id}
                borderRadius="5px"
                position="relative"
                width="100%"
                maxHeight="3em"
                display="flex"
                flexDirection="column"
                padding="10px"
                backgroundColor="rgb(0, 0, 0, 0.5)"
                overflow="hidden"
                backdropFilter="blur(10px)"
                transition="all 0.35s ease"
                _hover={{ color: "white", cursor: "pointer" }}
                onClick={() => addChat(chat)}
              >
                <Text fontWeight="bold" color="white" fontSize="1rem">
                  {chat.name}
                </Text>
              </Box>
            ))
          ) : (
            <>
              <Text color="black" textAlign="center">Try searching: spiderman, hulk, tony stark</Text>
            </>
          )}
        </Box>
        <Box backgroundColor="grey" width="115px" padding="10px" borderRadius="10px" color="white"
          cursor="pointer"
          onClick={()=>CreateGroup()} >
          Create Group
        </Box>
          
      </Modal.Body>
    </Modal>
  )
}

export default GroupChatModal
