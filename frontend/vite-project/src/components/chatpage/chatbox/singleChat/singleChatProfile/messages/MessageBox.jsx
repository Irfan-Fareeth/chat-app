import React, {useState} from 'react'
import {Box} from "@chakra-ui/react"
const MessageBox = () => {
    const [newMessage, setNewMessage] = useState("");
    const sendMessage = async()=>
    {

    }
  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%" gap="10px">
        <Box backgroundColor="white" height="90%" borderRadius="10px">
            
        </Box>
        {/* input section */}
        <Box height="50px" backgroundColor="white" width="100%" borderRadius="4px" padding="2px">
        <Box width="100%" height="100%" display="flex" gap="2px" paddingLeft="2px">
            <input type="text" placeholder="send message..."  height="100%" style={{width: "100%", outline: "none"}}
                 onChange={(e)=>setNewMessage(e.target.value)}></input>
            <Box height="100%"  padding="10px" backgroundColor="black" color="white" borderRadius="4px" 
                onClick={sendMessage} cursor="crosshair">
            sendMessage</Box>
        </Box>
        </Box>
    </Box>
  )
}

export default MessageBox
