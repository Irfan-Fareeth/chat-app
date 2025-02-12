import React, { useState } from 'react'
import { Button, Input, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import {  FileUploadRoot, FileUploadTrigger } from "@/components/ui/file-upload"
import { HiUpload } from "react-icons/hi"
import { toaster } from "@/components/ui/toaster"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Register = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmailId] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();//navigate to another website
    const SubmitHandler = async ()=>{
        setLoading(true);
        if(password!=confirmPassword){
        toaster.create({
                title: "Passwords doesn't match!",
                type: "error",
              });
        return ;
        }

        try
        {
           const config = {headers:{ "Content-type": "application/json"},};

           const  {data}  = await axios.post('http://localhost:5000/api/user/register', {name, password, email}, config);
           console.log(data);
           toaster.create({
            title: "Registered successfully!",
            type: "success",
            
           });           
           localStorage.setItem('userInfo', JSON.stringify(data));
           setLoading(false);
           navigate('/chats')
        }catch(error)
        {
          toaster.create({
            title: error.response.data.message,
            type: "error",
           });  
          setLoading(false);
        }
    }
        
          
  return (
        <form >
            <Stack gap="5" align="center" maxW="lg">
              <Field label="User Name" required  errorText="This is field is required">
                <Input placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>
              </Field>
              <Field label="Email" required  errorText="This is field is required">
                <Input placeholder="Enter your email" type='email' onChange={(e)=>setEmailId(e.target.value)}/>
              </Field>
              <Field label="Password" required>
                <Input type='password' onChange={(e)=>setPassword(e.target.value)}/>  
              </Field>
              <Field label="Confirm Password" required>
                <Input type='password' onChange={(e)=>setConfirmPassword(e.target.value)}/>  
              </Field>
              
              <FileUploadRoot>
              <FileUploadTrigger asChild>
                <Button leftIcon={<HiUpload />} onClick={(e)=>setPhoto(e.target.files[0])} isLoading={loading}>Upload file</Button>
              </FileUploadTrigger>
              </FileUploadRoot>
              <Button w='40%' onClick={(e)=>{e.preventDefault(); SubmitHandler()}} type='submit'>Sign Up</Button>
            </Stack>
          </form>
    )
  }
  
  export default Register


             
      




