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
  const {setArr, setSelectedChat, setVisibleProfileTab, user} = ChatState();
  const logoutHandler = async ()=>
  {
      localStorage.removeItem("userInfo");
      navigate('/');
      setTimeout(()=>{
        setArr([]);
        setVisibleProfileTab(false);
        setSelectedChat();
      },1000);
 };

  const [modalShow, setModalShow] = useState(false);
  return (
      <>
      <MenuRoot>
      <MenuTrigger asChild>
        <Box cursor="pointer" fontWeight="bold" display="flex" justifyContent="center" 
        alignItems="center" gap="4px">
          {/* {user.name} */}
        <Avatar.Root  size="sm">
        <Avatar.Fallback name={user?.name} />
        <Avatar.Image src={user?.pic} />
        </Avatar.Root>
        </Box>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="profile" valueText="profile" onClick={() => setModalShow(true)}>
          <LuUser/>
          <Box  flex="1"  width="100%" >Profile</Box>
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
