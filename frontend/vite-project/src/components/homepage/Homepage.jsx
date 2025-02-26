import './Homepage'
import React from 'react'
import { Container, Box, Tabs } from "@chakra-ui/react"

import { LuFolder, LuUser } from "react-icons/lu"
import Login from '../authentication/Login'
import Register from '../authentication/Register'

const Homepage = () => {

  return(
  <> 
  <Container maxW='xl' centerContent>
        <Box 
          display='flex' 
          w='100%' 
          justifyContent="center"
          p={3}
          bg={"white"}
          m = "40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px">
          <h1>Chit Chat</h1>
        </Box>
        <Box 
          display='flex' 
          w='100%' 
          justifyContent='center'
          p={3}
          bg={"white"}
          
          borderRadius="lg"
          borderWidth="1px">
          <Tabs.Root defaultValue="login" w='100%'>
            <Tabs.List >
              <Tabs.Trigger value="login" minW='50%'>
                <LuUser />
                Login 
              </Tabs.Trigger>
              <Tabs.Trigger value="register" minW='50%'>
                <LuFolder />
                Register
              </Tabs.Trigger>
            </Tabs.List>
              
            <Tabs.Content value="login">
              <Login></Login>
            </Tabs.Content>
            <Tabs.Content value="register">
              <Register/>
            </Tabs.Content>
            
        </Tabs.Root>
          </Box>
  </Container>
  </>);
}

export default Homepage
