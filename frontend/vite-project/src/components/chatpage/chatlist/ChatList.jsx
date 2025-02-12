import React, { useEffect, useState } from 'react';
import './ChatList';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Search } from 'lucide-react';
import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import { ChatState } from '../../ApiContext/ChatProvider.jsx';
import { toaster } from "@/components/ui/toaster";

const ChatList = () => {
  const [arr, setArr] = useState([]); // Ensure it's an empty array, not undefined
  const [userInfo, setUserInfo] = useState(); // Start as null to check when it updates
  const user = ChatState();

  // Set userInfo when `user` changes
  useEffect(() => {
    if (user?.user) {
      setUserInfo(user.user);
    }
  }, [user]);

  // Fetch chats only when `userInfo` is available
  useEffect(() => {
    if (!userInfo || !userInfo.token) return; // Prevent fetching with an undefined token

    const fetchChats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/chat/fetchChats", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        console.log(userInfo.token);
        setArr(data);
        toaster.create({ title: "Chat fetched successfully", type: "success" });
      } catch (error) {
        toaster.create({ title: error.response?.data?.message || "Unauthorized access", type: "error" });
      }
    };

    fetchChats();
  }, [userInfo]); // Run only when userInfo is set

  return (
    <Box width="35%" padding="20px" border="1px solid white" display="flex" flexDirection="column"
         height="100vh" overflowY="auto">
      {/* Search button */}
      <Box>
        <InputGroup className="mb-3">
          <Form.Control placeholder="Search chats" aria-label="Search chats" />
          <Button>
            <Search size={18} />
          </Button>
        </InputGroup>
      </Box>

      {/* Chat List */}
      <Box display="flex" flexDirection="column" gap="3" height="100vh" overflowY="auto"
        paddingRight="5px" css={{
          '&::-webkit-scrollbar': { width: '5px' },
          '&::-webkit-scrollbar-thumb': { background: 'gray', borderRadius: '10px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
        }}>
        {arr.map(chat => (
          <Box key={chat._id} borderRadius="5px" position="relative" width="100%" minHeight="5em"
            display="flex" flexDirection="column" padding="10px"
            backgroundColor="rgb(0, 0, 0, 0.5)" overflow="hidden"
            backdropFilter="blur(10px)" transition="all 0.35s ease"
            _before={{
              content: '""', position: "absolute", right: "0", top: "0",
              height: "14px", width: "14px", borderTop: "3px solid white",
              borderRight: "3px solid white", transform: "translate(-100%, 50%)",
              transition: "all 0.35s ease", opacity: 0,
            }}
            _after={{
              content: '""', position: "absolute", left: "0", bottom: "0",
              height: "14px", width: "14px", borderBottom: "3px solid white",
              borderLeft: "3px solid white", transform: "translate(100%, -50%)",
              transition: "all 0.35s ease", opacity: 0,
            }}
            _hover={{
              _before: { transform: "translate(0,0)", opacity: 1 },
              _after: { transform: "translate(0,0)", opacity: 1 },
              color: "white", cursor: "pointer",
            }}>
            <Text fontWeight="bold" color="white">{chat.chatName}</Text>
            <Text style={{
              display: "-webkit-box", WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1, textOverflow: "ellipsis", color: "white"
            }}>
              {chat.latestMessage}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChatList;
