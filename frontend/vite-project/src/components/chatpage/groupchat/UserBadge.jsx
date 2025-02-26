import React from 'react'
import { Box } from '@chakra-ui/react'
import {X} from 'lucide-react'

const UserBadge = ({RemoveUser,user}) => {
  return (
    <Box backgroundColor="grey" color="white"
         cursor="pointer"
         onClick={()=>RemoveUser()} //onclick this badge user will removed 
         borderRadius="10px"
         fontSize="12px"
         display="flex"
         justifyContent="center"
         alignItems="center"
         padding="3px 5px 3px 5px"
         flexDirection="row">
        <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>{user.name}</div>
        <div style={{paddingTop:"3px"}}><X size={11} /></div>
    </Box>
  )
}

export default UserBadge
