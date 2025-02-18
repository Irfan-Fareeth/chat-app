import { Box } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { LuLogOut, LuUser } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import { Avatar } from "@chakra-ui/react"
import { useState } from "react"
import ProfileModal from "./ProfileModal"
import { ChatState } from "@/components/ApiContext/ChatProvider"
const Profile = () => {
  const navigate = useNavigate();
  const {setArr} = ChatState();
  const logoutHandler = async ()=>
  {
      localStorage.removeItem("userInfo");
      setArr([]);
      navigate('/');
  };
  const [modalShow, setModalShow] = useState(false);
  return (
      <>
      <MenuRoot>
      <MenuTrigger asChild>
        <Box cursor="pointer" fontWeight="bold">
        <Avatar.Root  size="sm">
        <Avatar.Fallback name="irfan fareeth" />
        <Avatar.Image src="vite.svg" />
        </Avatar.Root>
        </Box>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="profile" valueText="profile">
          <LuUser/>
          <Box  flex="1" onClick={() => setModalShow(true)}>Profile</Box>
        </MenuItem>
        
        <MenuItem value="logout" valueText="logout" onClick={logoutHandler}>
          <LuLogOut/>
          <Box flex="1" >Logout</Box>
          
        </MenuItem>
        
      </MenuContent>
      
      <ProfileModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </MenuRoot>
    </>
  )
}

export default Profile;
