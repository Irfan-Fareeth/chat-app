import {createContext, useState, useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toaster } from "@/components/ui/toaster";
const ChatContext = createContext();
const ChatProvider = ({children})=>
{
    const [user, setUser] = useState();
    const [arr, setArr] = useState([]);
    const [selectedChat, setSelectedChat] = useState("");
    const [visibleProfileTab, setVisibleProfileTab] = useState(false);
    const navigate = useNavigate();
    const [notification, setNotification] = useState([]);
    //fetch chats
    const fetchChats = async () => {
        try {
          const { data } = await axios.get("http://localhost:5000/api/chat/fetchChats", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          console.log(user.token);
          setArr(data);
          toaster.create({ title: "Chat fetched successfully", type: "success" });
        } catch (error) {
          toaster.create({ title: error.response?.data?.message || "Unauthorized access", type: "error" });
        }
      };

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if(!userInfo)
        {
            
            navigate('/');
        }
    }, [navigate]);
    return <ChatContext.Provider 
              value={{user, setUser, 
                      arr, setArr, 
                      fetchChats, 
                      selectedChat, setSelectedChat,
                      visibleProfileTab, setVisibleProfileTab,
                      notification, setNotification
                     }}>{children}</ChatContext.Provider>;

}

const ChatState = ()=>
{
    return useContext(ChatContext);
}
export  {ChatProvider, ChatState};