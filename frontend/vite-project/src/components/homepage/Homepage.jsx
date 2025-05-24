import './Homepage.css'
import React from 'react'
import { Container, Box, Tabs } from "@chakra-ui/react"
import { LuFolder, LuUser } from "react-icons/lu"
import Login from '../authentication/Login'
import Register from '../authentication/Register'

const Homepage = () => {
  return (
    <>
      <Container centerContent flexDirection="row" alignItems="stretch" width="100%" 
      minWidth="100%" maxHeight={{md: "100vh"}}
      padding="3px" backgroundColor="white"  margin="0" marginRight="0px"
      
      >
        <Box display="flex"  backgroundColor="#143D60" width="100%" paddingTop="30px"
        flexDirection={{md:"row", base: "column-reverse"}} height="100%"
        
        >
        <Box  width={{ base: "100%", md: "80%" }} display={{ base: "flex", md: "flex" }}
            alignItems="center" flexDirection="column"
          >
          <Box   className="assemble"
            display="flex" justifyContent="center" alignItems="center" fontSize={{base: "2em", md: "5em"}}
            padding="20px" >Avengers assemble!
            </Box>
          <Box overflow="hidden" maxWidth="90%">
            <img src="c.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" color="white"
            padding="5px" maxWidth="90%" fontSize="20px" flexDirection="column" >
            Assemble your team and chat like a hero! Experience a super-powered chat application.
          </Box>

        </Box>
        <Box  width="100%" display="flex" 
          alignItems="center" flexDirection="column" 
          border="5px solid #143D60" paddingBottom="5px"
         >
        <Box
          display="flex"
          w="95%"
          justifyContent="center"
          alignItems="center"
          p={3}
          color="white"
          border="3px solid white"
          backgroundImage="url(avengers.jpg)"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundColor="#143D60"
          backgroundBlendMode="multiply"
          height="100px"
        >

          <img
            src="chatVengers.png"
            alt="ChatVengers Logo"
            style={{
              height: "100%",
              width: "auto",
              objectFit: "contain"
            }}
          />
        </Box>


          <Box 
            display='flex' 
            w='95%' 
            justifyContent='center' 
            p={3}
            color="#410445"
            backgroundColor="white"
            border="3px solid white"
            height="100%"
          >
            <Tabs.Root defaultValue="login" w='100%' height="100%">
              <Tabs.List display="flex" justifyContent="center" >
                <Tabs.Trigger 
                  value="login" 
                  minW='50%' 
                  _selected={{ borderBottom: "4px solid #143D60", color: "black" }}
                  _hover={{ color: "#143D60" }}
                  p={2}
                  transition="all 0.1s"
                >
                  <LuUser />
                  Login
                </Tabs.Trigger>
                <Tabs.Trigger 
                  value="register" 
                  minW='50%' 
                  _selected={{ borderBottom: "4px solid #143D60", color: "black" }}
                  _hover={{ color: "#143D60" }}
                  p={2}
                  transition="all 0.1s"
                >
                  <LuFolder />
                  Register
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="login" minHeight="90%" maxHeight="90%" paddingBottom="0px" >
                <Login />
              </Tabs.Content>
              <Tabs.Content value="register">
                <Register />
              </Tabs.Content>

            </Tabs.Root>
          </Box>

        </Box>
        </Box>
      </Container>
    </>
  );
}

export default Homepage;
