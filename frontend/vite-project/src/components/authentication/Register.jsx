import React, { useState } from 'react';
import { Button, Input, Stack, Box, Spinner } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';
import './hover.css';
import { HiUpload } from "react-icons/hi"
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
            setPhoto(data.secure_url);  // ✅ Always uses HTTPS

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
                'https://chatapplication-luz3.onrender.com/api/user/register',
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
              <Stack spacing={3}  w="100%" display="flex" justifyContent="center" alignItems="center">
                  <Field label="User Name" required>
                      <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} 
                      border="none"
                      borderBottom="1px solid #143D60"/>
                  </Field>
                  <Field label="Email" required>
                      <Input placeholder="Enter your email" type='email' value={email} onChange={(e) => setEmailId(e.target.value)} 
                      border="none"
                      borderBottom="1px solid #143D60"/>
                  </Field>
                  <Field label="Password" required>
                      <Input placeholder="Enter your password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} 
                      border="none"
                      borderBottom="1px solid #143D60"/>
                  </Field>
                  <Field label="Confirm Password" required>
                      <Input  placeholder="Enter your password" type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                      border="none"
                      borderBottom="1px solid #143D60"/>
                  </Field>
                  <Box position="relative" width="100%">
                    <Input 
                        type="file" 
                        id="file-upload"
                        onChange={photoHandler} 
                        display="none" // Hide the default file input
                    />
                    
                    <label 
                        htmlFor="file-upload"
                        style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        width: "fit-content",
                        padding: "8px 16px",
                        background: "transparent",
                        color: "white",
                        border: "2px solid white",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                        }}
                        
                        onMouseOver={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
                        onMouseOut={(e) => e.target.style.background = "transparent"}
                    >
                        <HiUpload />
                        Upload File
                    </label>
                    </Box>

                  
                  
                  {!loading?
                  <Button w='80%' type='submit' isLoading={loading}
                    backgroundColor="white"
                    border="1px solid #143D60"
                    color="#143D60"
                    onMouseOver={(e) => {e.target.style.background = "#143D60"; e.target.style.color="white"}}
                    onMouseOut={(e) => {e.target.style.background = "white"; e.target.style.color="#143D60"}}>
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
