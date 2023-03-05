import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from "axios";
import {Alert} from "@mui/material";

// JWT
import Cookies from "universal-cookie";
const cookies = new Cookies();


export default function SignInSide() {
    const [error, setError] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const jwtToken = cookies.get('jwt_authorization_pwc');
        setIsLoggedIn(!!jwtToken);
    }, []);

    const saveJWT = (token) => {
        cookies.set(
            "jwt_authorization_pwc", token, {
                maxAge: 3600 // Will expire after 1hr (value is in number of sec.)
            });
        setIsLoggedIn(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.post(
            'http://127.0.0.1:8000/api/login', //TODO
            {
                username: data.get('username').toLowerCase(),
                password: data.get('password').toLowerCase(),
            },
            {headers}
        ).then(response => {
            console.log("Success:", response.data.token);
            saveJWT(response.data.token);
        }).catch(error => {
                setError(true);
                console.log("Error:", error);
            }
        )
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>You are already logged in.</div>
            ) : (
                <Box sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        {error && (
                            <Alert variant="outlined" severity="error">
                                <strong>Unable to Login</strong> - Please check your credentials
                            </Alert>
                        )}
                    </Box>
                </Box>
            )}
        </div>
    );
}