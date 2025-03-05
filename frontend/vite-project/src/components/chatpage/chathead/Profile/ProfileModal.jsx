import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { ChatState } from "@/components/ApiContext/ChatProvider";
import Card from "react-bootstrap/Card";

const ProfileModal = (props) => {
  const user = ChatState();
  const [userInfo, setUserInfo] = useState({});

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
      centered
      // style={{
      //   backdropFilter: "blur(12px)",
      //   background: "rgba(10, 15, 30, 0.95)", // Dark navy background
      //   borderRadius: "15px",
      //   transition: "all 0.3s ease-in-out",
      //   opacity: props.show ? 1 : 0,
      //   transform: props.show ? "scale(1)" : "scale(0.9)",
      //   overflow: "hidden",
      // }}
    >
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(5, 10, 25, 0.98)", // Deep dark blue
          backdropFilter: "blur(12px)",
          padding: "15px",
          boxShadow: "0px 4px 15px rgba(0, 0, 50, 0.6)", // Dark blue glow effect
          border: "1px solid rgba(50, 80, 150, 0.3)", // Subtle blue outline
          position: "relative",
          transition: "0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        {/* Dark Blue Gradient Border Effect */}
        <div
          style={{
            content: "",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            background: "linear-gradient(135deg, #0a0f1f, #162447, #1b1f3a)", // Dark blue gradient
            boxShadow: "inset 0 0 15px rgba(0, 0, 30, 0.5)", // Dark shadow inset
          }}
        ></div>

        <Card
          style={{
            width: "100%",
            maxHeight: "90vh",
            overflow: "hidden",
            textAlign: "center",
            background: "rgba(10, 15, 35, 0.95)", // Dark navy blue
            color: "white",
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 60, 0.5)", // Dark blue glow
            padding: "10px",
            border: "none",
            transition: "0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0px 4px 15px rgba(80, 100, 180, 0.6)") // Dark blue hover effect
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              "0px 4px 10px rgba(0, 0, 60, 0.5)")
          }
        >
          <Card.Img
            variant="top"
            src={userInfo?.pic}
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "contain",
          
              borderRadius: "10px",
              border: "2px solid rgba(50, 80, 150, 0.5)", // Blue frame
              transition: "0.3s ease-in-out",
            }}
          />
          <Card.Body>
            <Card.Title
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#AFCBFF", // Soft blue text
                
              }}
            >
              {userInfo?.name}
            </Card.Title>
            <Card.Text style={{ color: "#B0C4DE" }}>{userInfo?.email}</Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
