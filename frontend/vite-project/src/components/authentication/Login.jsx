import React, { useState, useCallback, useEffect } from 'react';
import { Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from '../ui/password-input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toaster } from "@/components/ui/toaster";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isGuestLogin, setGuestLogin] = useState(false);
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
        const config = { headers: { "Content-Type": "application/json" } };
        try {
            const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password }, config);
            toaster.create({ title: "Login successful!", type: "success" });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/chats');
        } catch (error) {
            toaster.create({ title: error.response?.data?.message || "Login failed", type: "error" });
        }
    }, [email, password, navigate]);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Stack gap="5" align="center" maxW="lg">
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
                <Button
                    colorScheme="blue"
                    width="70%"
                    mt="4"
                    onClick={SubmitHandler}
                >
                    Login
                </Button>
                <Button
                    variant="solid"
                    colorScheme="red"
                    width="70%"
                    mt="2"
                    onClick={() => {
                       setEmail("guestguest@gmail.com");
                       setPassword("guest@4002");
                       console.log(email);
                       console.log(password);
                       setGuestLogin(true);
                    }}
                >
                    Get Guest User Credentials
                </Button>
            </Stack>
        </form>
    );
};

export default Login;
