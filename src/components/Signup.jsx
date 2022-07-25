import React from 'react';
import { Box, Button, Heading, Input } from '@chakra-ui/react';

function Signup() {
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: ""
    });
    const { name, email, password } = data;

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name, email, password
        };
        try {
            let res = await fetch('http://localhost:3002/users', {
                method: "POST",
                body: JSON.stringify({ user: payload }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            await res.json();
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <Box width="700px" margin="auto">
                <Heading>Sign Up</Heading>
                <Input value={name} onChange={handleChange} name="name" placeholder="Enter your name" />
                <Input value={email} onChange={handleChange} name="email" placeholder="Enter email" />
                <Input value={password} onChange={handleChange} name="password" placeholder="Enter Password" />
                <Button onClick={handleSubmit}>Create Account</Button>
            </Box>
        </>
    )
}

export default Signup;
