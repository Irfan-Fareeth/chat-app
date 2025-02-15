import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Avatar } from "@chakra-ui/react";
import { ChatState } from '@/components/ApiContext/ChatProvider';
import Button from 'react-bootstrap/Button';
import { Search } from 'lucide-react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Box, Text } from '@chakra-ui/react';

const AddChatModal = (props) => {
    const user = ChatState();
    const [userInfo, setUserInfo] = useState({}); 
    const [arr, setArr] = useState([
        { chatName: "irfan", _id: 1, latestMessage: "iam irfan" },
        { chatName: "fareeth", _id: 2, latestMessage: "i am fareeth" },
        { chatName: "irfan", _id: 3, latestMessage: "iam irfan" },
        { chatName: "fareeth", _id: 4, latestMessage: "i am fareeth" },
        { chatName: "irfan", _id: 5, latestMessage: "iam irfan" },
        { chatName: "fareeth", _id: 6, latestMessage: "i am fareeth" },
        { chatName: "irfan", _id: 7, latestMessage: "iam irfan" },
        { chatName: "fareeth", _id: 8, latestMessage: "i am fareeth" },
        { chatName: "irfan", _id: 9, latestMessage: "iam irfan" },
        { chatName: "fareeth", _id: 10, latestMessage: "i am fareeth" },
        { chatName: "irfan", _id: 11, latestMessage: "iam irfan" },
        { chatName: "fareeth", _id: 12, latestMessage: "i am fareeth" },
        { chatName: "irfan", _id: 13, latestMessage: "iam irfan" },
        { chatName: "fareeth", _id: 14, latestMessage: "i am fareeth" },
      ]);
      
    useEffect(() => {
      if (user?.user) {
        setUserInfo(user.user);
      }
    }, [user]);
  
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        style={{height: "75%"}}
        centered
      >
          <Modal.Header style={{ position: "relative", backgroundColor: "white", paddingTop:"8%", paddingBottom: "4%" }} closeButton>
            <Modal.Title
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                
              }}
            >
                    <Box style={{width: "100%"}}>
                        <InputGroup className="mb-3" border="none" width="100%">
                        <Form.Control placeholder="Search chats" aria-label="Search chats" onChange={(e)=>setSearchTerm(e.target.value)}
                                style={{
                                    border: "none",
                                    borderBottom: "1px solid grey",
                                    boxShadow: "none", // Removes default blue highlight
                                    borderRadius: "0"
                                  }}
                                  onFocus={(e) => (e.target.style.borderBottom = "1px solid grey")}
                                  onBlur={(e) => (e.target.style.borderBottom = "1px solid white")}
                              
                        />
                        <Button style={{backgroundColor:"rgb(0,0,0, 0.5)", border:"none"}} >
                            <Search size={18} />
                        </Button>
                        </InputGroup>
                    </Box>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{maxHeight: "500px",  overflowY: "auto"}} css={{
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-thumb': { background: 'gray', borderRadius: '10px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            }}>
            <Box display="flex" flexDirection="column" gap="3" overflowY="auto"
            paddingRight="5px" >
            {/*to display no results found when there is no chats matching*/
            (arr.length>0)?
            arr.map(chat => (
            <>
            <Box key={chat._id} borderRadius="5px" position="relative" width="100%" 
                maxHeight="3em"
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
            </Box>
            </>
            ))
            :"false"
            }
            </Box>
          </Modal.Body>
      </Modal>
    );
}

export default AddChatModal
