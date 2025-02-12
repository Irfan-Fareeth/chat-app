import React, { useState } from 'react'
import { Button, Input, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { PasswordInput } from '../ui/password-input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toaster } from "@/components/ui/toaster"

const Login = () => {
   
    const [email, setEmailId] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    const SubmitHandler = async ()=>
    {
      const config = {headers:{ "Content-type": "application/json"},};
      try{
      const { data } = await axios.post('http://localhost:5000/api/user/login', {email, password}, config);
      
      toaster.create({ title: "Login successfully!", type: "success"});   
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/chats');
      }catch(error)
      {
        toaster.create({ title: error.response.data.message , type: "error"});   
      }

    };


  return (
    <form>
    <Stack gap="5" align="center" maxW="lg">
      
      <Field label="Email" required  errorText="This is field is required">
        <Input placeholder="Enter your email" onChange={(e)=>setEmailId(e.target.value)}/>
      </Field>
      <Field label="Password" required>
        <PasswordInput onChange={(e)=>setPassword(e.target.value)}></PasswordInput>
      </Field>
      <Button
        colorScheme="blue"
        width="70%"
        style={{ marginTop: 15 }}
        onClick={SubmitHandler}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="70%"
        onClick={() => {
          setEmailId("Guest@gmail.com");
          setPassword("guest@4002");
        }}
      >
        Get Guest User Credentials
      </Button>
    </Stack>
  </form>
  )
}

export default Login
