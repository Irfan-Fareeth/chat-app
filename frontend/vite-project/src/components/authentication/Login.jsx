import React, { useState, useCallback, useEffect } from 'react';
import { Button, Input, Stack } from "@chakra-ui/react";
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
            const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password }, config);
            
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
        <form onSubmit={(e) => e.preventDefault()}>
            <Stack gap="5" align="center" width="100%">
                <Field label="Email" required>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Field>
                <Field label="Password" required>
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Field>
                <Stack gap="2" width="100%">
                <Button
                    colorScheme="blue"
                    width="100%"
                    mt="4"
                    onClick={SubmitHandler}
                    disabled={isLogging}
                >
                    Login
                </Button>
                <Button
                    variant="solid"
                    
                    width="100%"
                    disabled={isLogging}
                    onClick={async () => {
                       await setEmail("guestguest@gmail.com");
                       await setPassword("guest@4002");
                       console.log(email);
                       console.log(password);
                       setGuestLogin(true);
                    }}
                >
                    Get Guest User Credentials
                </Button>
                </Stack>
            </Stack>
        </form>
    );
};

export default Login;
