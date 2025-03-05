import React, { useState } from 'react';
import { Button, Input, Stack, Box, Spinner } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';

const Register = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmailId] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const photoHandler = async(e)=>
    {
        setLoading(true);
        const file  = e.target.files[0];
        console.log(file);
        if(!file) return ;
        
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dfehumiqx");
        
        await fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPhoto(data.url.toString());
            console.log(data.url.toString());
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error("error uploading the image");
            setLoading(false);
          });
  
        console.log(photo);

    }
    const SubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            toast.error("All fields are required.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const config = { headers: { "Content-type": "application/json" } };

            const { data } = await axios.post(
                'http://localhost:5000/api/user/register',
                { name, password, email, photo },
                config
            );

            toast.success("Registered successfully!");
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            navigate('/chats');
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed.");
            setLoading(false);
        }
    };

    return (
      <Box 
          w="100%" 
          height="80%"
      >
          <form onSubmit={SubmitHandler} style={{ width: "100%"}}>
              <Stack spacing={3}  w="100%">
                  <Field label="User Name" required>
                      <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                  </Field>
                  <Field label="Email" required>
                      <Input placeholder="Enter your email" type='email' value={email} onChange={(e) => setEmailId(e.target.value)} />
                  </Field>
                  <Field label="Password" required>
                      <Input placeholder="Enter your password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Field>
                  <Field label="Confirm Password" required>
                      <Input  placeholder="Enter your password" type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </Field>
                  <Field label="Upload file">
                       <Input type="file" onChange={photoHandler}/>
                  </Field>  
                  
                  {!loading?
                  <Button w='100%' type='submit' isLoading={loading}>
                      Sign Up
                  </Button>:
                  <Button w='100%'  disabled>
                    <Spinner/>
                  </Button>
                    }
              </Stack>
          </form>
      </Box>
  );
  
};

export default Register;
