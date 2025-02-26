import React, { useState } from 'react';
import { Button, Input, Stack, Box } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { FileUploadRoot, FileUploadTrigger } from "@/components/ui/file-upload";
import { HiUpload } from "react-icons/hi";
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
                { name, password, email },
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
  
                  <FileUploadRoot>
                      <FileUploadTrigger asChild>
                          <Button leftIcon={<HiUpload />} isLoading={loading} as="label" padding="10px">
                              Upload file
                              <input type="file" hidden onChange={(e) => setPhoto(e.target.files[0])} />
                          </Button>
                      </FileUploadTrigger>
                  </FileUploadRoot>
  
                  <Button w='100%' type='submit' isLoading={loading}>
                      Sign Up
                  </Button>
              </Stack>
          </form>
      </Box>
  );
  
};

export default Register;
