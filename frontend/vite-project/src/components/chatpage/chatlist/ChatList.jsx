import React, { useEffect, useState } from 'react';
import './ChatList';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Search, UserPlus, SearchX } from 'lucide-react';
import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import { ChatState } from '../../ApiContext/ChatProvider.jsx';
import { toaster } from "@/components/ui/toaster";
import AddChatModal from './AddChatModal';
const ChatList = () => {
  const [arr, setArr] = useState([]); // Ensure it's an empty array, not undefined
  const [userInfo, setUserInfo] = useState(); // Start as null to check when it updates
  const [searchTerm,setSearchTerm] = useState("");
  const user = ChatState();
  const [modalShow, setModalShow] = useState(false);


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

  //tofilter chats to find the required chat
  const filteredChats = arr.filter( chat=>
    chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Box width="35%" padding="20px" border="1px solid white" display="flex" flexDirection="column"
         height="100vh" overflowY="auto">
      {/* Search button and add chat button*/}
      <Box>
        <InputGroup className="mb-3" border="none">
          <Form.Control placeholder="Search chats" aria-label="Search chats" onChange={(e)=>setSearchTerm(e.target.value)}
             />
          <Button style={{backgroundColor:"rgb(0,0,0, 0.5)", border:"none"}} >
            <Search size={18} />
          </Button>
          <Button style={{backgroundColor:"rgb(0,0,0, 0.5)", border:"none"}} onClick={()=>setModalShow(true)}>
            <UserPlus size={24} />
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
        {/*to display no results found when there is no chats matching*/
        (filteredChats.length>0)?
        filteredChats.map(chat => (
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
              {chat.latestMessage==""?`latestMessage from ${chat.chatName}`:chat.latestMessage}
            </Text>
          </Box>
        ))
        :<>
          {/* add contanct when no result found*/}
          <Button style={{
                         backgroundColor:"rgb(0,0,0, 0.5)", border:"none", display: "flex", 
                         justifyContent: "center", alignItems: "center", gap: "8px"
                        }}
                  onClick={()=>setModalShow(true)}
          >
            <UserPlus size={24} /> Add new contact
          </Button>
          <Text  textAlign="center" fontSize="large"  color="white" style={{border:"none", display: "flex", 
                         justifyContent: "center", alignItems: "center", gap: "8px", height: "100%",
                        width: "100%"
          }}>
            <SearchX size={30}/> No results
          </Text>

        </>
        }
      </Box>
      <AddChatModal show={modalShow} onHide={() => setModalShow(false)} />
    </Box>
  );
};

export default ChatList;
