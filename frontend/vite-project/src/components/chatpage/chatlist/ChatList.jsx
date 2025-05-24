import React, { useEffect, useState } from 'react';
import './ChatList';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Search, UserPlus, SearchX, Plus,  } from 'lucide-react';
import { Box, Text,Avatar } from '@chakra-ui/react';
import { Stack } from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton"
import { ChatState } from '../../ApiContext/ChatProvider.jsx';
import { GetSender, GetSenderInformation } from './ChatRequirements';
import AddChatModal from './AddChatModal';
import GroupChatModal from '../groupchat/GroupChatModal';


const ChatList = () => {
   // Ensure it's an empty array, not undefined
  const [userInfo, setUserInfo] = useState(); // Start as null to check when it updates
  const [searchTerm,setSearchTerm] = useState("");
  const user = ChatState();
  const [addChatModal, setaddChatModal] = useState(false);
  const {arr, fetchChats, selectedChat, setSelectedChat, setVisibleProfileTab} = ChatState();
  const [filteredChats, setFilteredChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [addGroupModal, setAddGroupModal] = useState(false);
  //to display skeletons
  const [skeletonCount, setSkeletonCount] = useState(6); 
  useEffect(() => {
    // Calculate number of skeletons based on screen height
    const calculateSkeletons = () => {
      const chatHeight = 80; // Approx height of each chat item in px (5em ~ 80px)
      const availableHeight = window.innerHeight * 0.8; // 80% of screen height
      const count = Math.floor(availableHeight / chatHeight); // Calculate number of skeletons
      setSkeletonCount(count);
    };

    calculateSkeletons();
    window.addEventListener("resize", calculateSkeletons); // Recalculate on resize

    return () => window.removeEventListener("resize", calculateSkeletons);
  }, []);
  // Set userInfo when `user` changes
  useEffect(() => {
    if (user?.user) {
      setUserInfo(user.user);
    }
  }, [user]);

  // Fetch chats only when `userInfo` is available
  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo || !userInfo.token) return;
      setLoadingChats(true);
      await fetchChats();  // Ensure we wait for fetchChats to complete
      setLoadingChats(false);
    };
    fetchData();
  }, [userInfo]); // Re-run if `arr` updates
  // Run only when userInfo is set
  // to display
  //tofilter chats to find the required chat
  useEffect(() => {
    setLoadingChats(true);
    setFilteredChats(
      arr.filter((chat) => chat.chatName?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    console.log(arr);
    setLoadingChats(false);
  }, [arr, searchTerm]);

  
  return (
    <Box  padding="10px"  display={{md:"flex",base:selectedChat?"none":"flex"}}
        w={{base: "100%", md: "32%"}}flexDirection="column"
        minHeight="90vh" maxHeight="90vh" paddingBottom="0px"
        >
      {/* Search button and add chat button*/}
      <Box>
        <InputGroup className="mb-3" border="none">
          <Form.Control placeholder="Search chats" aria-label="Search chats" onChange={(e)=>setSearchTerm(e.target.value)}
             />
          
          <Button style={{backgroundColor:"rgb(0,0,0, 0.5)", border:"none"}} onClick={()=>setaddChatModal(true)}>
            <UserPlus size={24} />
          </Button> 
          <Button style={{backgroundColor:"rgb(0,0,0, 0.5)", border:"none", fontSize: "13px"}} onClick={()=>{setAddGroupModal(true)}}>
            Create Group
          </Button>
        </InputGroup>
      </Box>
      {/* Chat List */}
      <Box  display="flex" flexDirection="column" gap="3" maxHeight="100%" overflowY="auto"
        paddingRight="5px" css={{
          '&::-webkit-scrollbar': { width: '5px' },
          '&::-webkit-scrollbar-thumb': { background: 'white', borderRadius: '10px',  },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
        }}
        >
        {/*to display no results found when there is no chats matching*/
        loadingChats?
        <Stack gap="6" width="100%">
        {Array(skeletonCount).fill("").map((_, index) => (
          <Skeleton key={index} height="5em" width="100%" borderRadius="5px" />
        ))}
       </Stack>
        :
        (filteredChats.length>0)?
        filteredChats.map(chat => (
          <Box
                key={chat._id}
                borderRadius="10px"
                position="relative"
                width="100%"
                minHeight="5em"
                maxHeight="5em"
                display="flex"
                flexDirection="column"
                padding="10px"
                overflow="hidden"
                transition="all 0.35s ease"
                onClick={() => {
                  setSelectedChat(chat);
                  setVisibleProfileTab(false);
                }}
                _before={{
                  content: '""',
                  position: "absolute",
                  right: "0",
                  top: "0",
                  height: "14px",
                  width: "14px",
                  borderTop: "3px solid rgba(255, 255, 255, 0.5)",
                  borderRight: "3px solid rgba(255, 255, 255, 0.5)",
                  transform: "translate(-100%, 50%)",
                  transition: "all 0.35s ease",
                  opacity: 0,
                }}
                _after={{
                  content: '""',
                  position: "absolute",
                  left: "0",
                  bottom: "0",
                  height: "14px",
                  width: "14px",
                  borderBottom: "3px solid rgba(255, 255, 255, 0.5)",
                  borderLeft: "3px solid rgba(255, 255, 255, 0.5)",
                  transform: "translate(100%, -50%)",
                  transition: "all 0.35s ease",
                  opacity: 0,
                }}
                _hover={{
                  _before: { transform: "translate(0,0)", opacity: 1 },
                  _after: { transform: "translate(0,0)", opacity: 1 },
                  color: "white",
                  cursor: "pointer",
                }}
                background="rgba(255, 255, 255, 0.2)" /* More transparency */
                backdropFilter="blur(10px)" /* Stronger blur */
                border="1px solid rgba(255, 255, 255, 0.2)" /* Subtle border */
              >

            <Box display="flex" alignItems="center" gap="10px">
            <Avatar.Root  size="sm" border="1px solid white">
                <Avatar.Fallback name={chat?.name} />
                <Avatar.Image src={GetSenderInformation(userInfo, chat.users)?.pic} />
            </Avatar.Root>
            <Text fontWeight="bold" color="white" fontSize="1rem" margin="0">{
                  chat.isGroupChat?chat.chatName:GetSender(userInfo, chat.users)
                }</Text>
            </Box>   
            <div style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                color: 'white',
                fontSize: '14px',
                height: "100%",
                width: "100%"
              
            }}>
              {chat?.latestMessage[0] && chat.latestMessage[0]?.content 
                ? `${chat.latestMessage[0].sender._id === userInfo._id ? "You" : chat.latestMessage[0].sender.name}: ${chat.latestMessage[0].content}` 
                : "No messages yet"}
               
            </div>


          </Box>
        ))
        :<>
          {/* add contact when no result found*/} 
          <Button style={{
                         backgroundColor:"rgb(0,0,0, 0.5)", border:"none", display: "flex", 
                         justifyContent: "center", alignItems: "center", gap: "8px"
                        }}
                  onClick={()=>setaddChatModal(true)}
          >
            <UserPlus size={24} /> Add new contact
          </Button>
        

        </>
        }
      </Box>
      <AddChatModal show={addChatModal} setaddChatModal={setaddChatModal} onHide={() => setaddChatModal(false)} 
                    setLoadingChats = {setLoadingChats}/>
      <GroupChatModal  show={addGroupModal} setAddGroupModal={setAddGroupModal} onHide={() => setAddGroupModal(false)} 
                    />                     
    </Box>
  );
};

export default ChatList;
