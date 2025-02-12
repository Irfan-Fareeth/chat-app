import { Box } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { LuLogOut, LuUser } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate();
  const logoutHandler = async ()=>
  {
      localStorage.removeItem("userInfo");
      navigate('/');
  };
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Box cursor="pointer" fontWeight="bold">
          Avatar
        </Box>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="profile" valueText="profile">
          <LuUser/>
          <Box flex="1">Profile</Box>
        </MenuItem>
        
        <MenuItem value="logout" valueText="logout" onClick={logoutHandler}>
          <LuLogOut/>
          <Box flex="1" >Logout</Box>
          
        </MenuItem>
        
      </MenuContent>
    </MenuRoot>
  )
}

export default Profile;
