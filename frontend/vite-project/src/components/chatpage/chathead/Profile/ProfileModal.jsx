import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Avatar } from "@chakra-ui/react";
import { ChatState } from '@/components/ApiContext/ChatProvider';

const ProfileModal = (props) => {
  const user = ChatState();
  const [userInfo, setUserInfo] = useState({}); // Initialize as an empty object

  useEffect(() => {
    if (user?.user) {
      setUserInfo(user.user);
    }
  }, [user]);

  return (
    <Modal
      {...props}
      size="md"
      height="50%"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <Modal.Header style={{ position: "relative", backgroundColor: "white" }} closeButton>
          <Modal.Title
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              
              marginTop:"3%"
            }}
          >
            <h3>{userInfo?.name || "Loading..."}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar.Root style={{ height: "16rem", width: "100%" }} shape="square">
            <Avatar.Fallback name={userInfo?.name || "User"} />
            <Avatar.Image 
              src={userInfo?.pic || "vite.svg"} 
              style={{ width: "100%", height: "100%", objectFit: "contain" }} 
            />
          </Avatar.Root>
          <h3>{userInfo?.email || "No email available"}</h3>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default ProfileModal;
