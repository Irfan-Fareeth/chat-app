import React, { useState, useCallback, useEffect } from 'react';
import { Button, Input, Stack, Box } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from '../ui/password-input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isGuestLogin, setGuestLogin] = useState(false);
    const [isLogging, setIsLogging] = useState(false);
    
    //if guestlogin is set to true this hook will be called;
    useEffect(()=>
    {
      if(isGuestLogin)
      {
        SubmitHandler();
        setGuestLogin(false);
      }
    },[email, password, isGuestLogin]);
    const navigate = useNavigate();

    const SubmitHandler = useCallback(async () => {
        if(isLogging) return ;
        setIsLogging(true);
        const config = { headers: { "Content-Type": "application/json" } };
        try {
            const { data } = 
            await axios.post('https://chatapplication-luz3.onrender.com/api/user/login', { email, password }, config);
            
            // Show success toast
            toast.success("Login successful!");
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/chats');
        } catch (error) {
            // Show error toast
            setIsLogging(false);
            toast.error(error.response?.data?.message || "Login failed");
        }
    }, [email, password, navigate]);

    return (
        <Box minHeight="100%" height="100%"  maxHeight="100%"  >
            <Stack gap="5" align="center" width="100%"  
             height="100%" minHeight="100%" maxHeight="100%">
                <Field label="Email" required>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        border="none"
                        borderBottom="1px solid #143D60"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Field>
                <Field label="Password" required>
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        border="none"
                        borderBottom="1px solid #143D60"
                        placeholder="Enter your password"
                    />
                </Field>
                 <Box m="50px" width="80%" minHeight="100%" height="100%" display="flex" flexDirection="column" gap="3" justifyContent="flex-end">
                <Button
                   color="#143D60"
                    backgroundColor="white"
                    border="1px solid #143D60"
                    width="100%"
                    onClick={SubmitHandler}
                    disabled={isLogging}
                    onMouseOver={(e) => {e.target.style.background = "#143D60";e.target.style.color="white"}}
                    onMouseOut={(e) => {e.target.style.background = "white"; e.target.style.color="#143D60"}}
                >
                    Login
                </Button>
                <Button
                   backgroundColor="white"
                    border="1px solid #143D60"
                    width="100%"
                    color="#143D60"
                    disabled={isLogging}
                    onClick={async () => {
                        setEmail("guest@gmail.com");
                        setPassword("guest@4002");
                       console.log(email);
                       console.log(password);
                       setGuestLogin(true);
                    }}
                    onMouseOver={(e) =>{ e.target.style.background = "#143D60"; e.target.style.color="white"}}
                    onMouseOut={(e) => {e.target.style.background = "white"; e.target.style.color="#143D60"}}
                >
                    Get Guest User Credentials
                </Button>
                 </Box>
            </Stack>
        </Box>
    );
};

export default Login;
