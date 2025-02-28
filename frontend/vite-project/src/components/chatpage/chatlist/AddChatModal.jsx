import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { ChatState } from "@/components/ApiContext/ChatProvider";
import Button from "react-bootstrap/Button";
import { Search } from "lucide-react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Box, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton"
import toast from "react-hot-toast";

const AddChatModal = ({ setaddChatModal, setLoadingChats,...props }) => {
  const user = ChatState();
  const {arr, setArr, fetchChats, setSelectedChat} = ChatState();
  const [userInfo, setUserInfo] = useState(null);
  const [availableChat, setAvailableChat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // Track if a search was made
  const [isChatCreating, setIsChatCreating] = useState(false);
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

const createChat = async (userId) => {
  setIsChatCreating(true);

  await toast.promise(
    (async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.post("http://localhost:5000/api/chat", { userId }, config);

        if (arr.find((c) => c._id === data._id)) {
          setaddChatModal(false);
          setSelectedChat(data);
          setSearchTerm("");
          return;
        }

        setSelectedChat(data);
        setSearchTerm("");
        setArr([data, ...arr]);

        // Refetch chats
        setLoadingChats(true);
        setaddChatModal(false);
        await fetchChats();
        setLoadingChats(false);
      } catch (error) {
        throw new Error("Failed to create chat");
      } finally {
        setIsChatCreating(false);
      }
    })(),
    {
      loading: "Warming up the chat room...",
      success: "Boom! Your chat is live! 🚀",
      error: "Failed to create chat. Try again!",
    }
  );
};


  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton style={{ backgroundColor: "white", minHeight: "80px" }}>
        <Modal.Title style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Box width="100%">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: "none",
                  borderBottom: "1px solid grey",
                  boxShadow: "none",
                  borderRadius: "0",
                }}
              />
              <Button style={{ backgroundColor: "rgb(0,0,0, 0.5)", border: "none" }}>
                <Search size={18} />
              </Button>
            </InputGroup>
          </Box>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "60vh", minHeight: "30vh", overflowY: "auto" }}>
        <Box display="flex" flexDirection="column" gap="3" paddingRight="5px">
          {loading ? (
                <Stack gap="3" width="100%">
                  <Skeleton height="3em" width="100%"/>
                  <Skeleton height="3em" width="100%"/>
                  <Skeleton height="3em" width="100%"/>
                  
                </Stack>
          ) : searched && availableChat.length === 0 ? (
            <>
              <Text color="black" textAlign="center">User not found</Text>
              <Text color="black" textAlign="center" mt="3">
                Search for other users to chat
              </Text>
              <Text color="black" textAlign="center">
                Try searching: spiderman, hulk, tony stark
              </Text>
            </>
          ) : availableChat.length > 0 ? (
            availableChat.map((chat) => (
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
                onClick={() => createChat(chat._id)}
              >
                <Text fontWeight="bold" color="white" fontSize="1rem">
                  {chat.name}
                </Text>
              </Box>
            ))
          ) : (
            <>
              <Text color="black" textAlign="center">Search for other users to chat</Text>
              <Text color="black" textAlign="center">Try searching: spiderman, hulk, tony stark</Text>
            </>
          )}
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default AddChatModal;
