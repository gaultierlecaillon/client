import GameNew from './components/GameNew';
import GamePlay from './components/GamePlay';
import Header from './components/Header';
import './App.css';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import {Alert, Snackbar, CssBaseline, Typography} from "@mui/material";

import gameHashContext from "./game-context";


// JWT
//import Cookies from "universal-cookie";
import {useCookies} from 'react-cookie';
import {useEffect, useState} from "react";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt_authorization_pwc']);

    // Is the user logged in ?
    const [error, setError] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [gameHash, setGameHash] = React.useState(null);
    const value = {gameHash, setGameHash};
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        if (cookies.jwt_authorization_pwc) {
            setIsLoggedIn(true);
        }
    }, [cookies]);

    useEffect(() => {
        console.log("gameHash:", gameHash);
    }, [gameHash]);

    const saveJWT = (token) => {
        setCookie('jwt_authorization_pwc', token, {path: '/', maxAge: 3600});
    }

    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        setIsLoggedIn(false);
        removeCookie('jwt_authorization_pwc', {path: '/'});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const headers = {
            'Content-Type': 'application/json'
        };

        axios.post(
            `${process.env.REACT_APP_HOST_API}/api/login`,
            {
                username: data.get('username').toLowerCase(),
                password: data.get('password').toLowerCase(),
            },
            {headers}
        ).then(response => {
            console.log("Success:", response.data.token);
            saveJWT(response.data.token);
            setOpen(true);
        }).catch(error => {
                setError(true);
                console.log("Error:", error);
            }
        )
    };

    return (
        <gameHashContext.Provider value={value}>
            <div className="App">
                <Grid container component="main" sx={{height: '100vh'}}>
                    <CssBaseline/>
                    <Header/>
                    <Grid item pt={5} xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Snackbar
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            message="Hello there, let's play 👋"
                            severity="success"
                        />
                        <Typography component="h1" variant="h4" align="center" fontWeight="bold" color="#474747" sx={{mt:10}}>
                            Guess The Number
                        </Typography>

                        <Typography variant="body1" align="center" color="#474747">
                            {gameHash}
                        </Typography>

                        <div>
                            {isLoggedIn && !gameHash && <GameNew/>}
                            {gameHash && <GamePlay/>}
                            {isLoggedIn &&
                                <Box position="absolute" top="0" right="0" display="flex" justifyContent="center" alignItems="center">
                                    <Box mt={3} sx={{ margin: 'auto' }}>
                                        <Button size="small" variant="outlined" color="inherit" sx={{ margin: '10px' }} onClick={logout}>
                                            Logout
                                        </Button>
                                    </Box>
                                </Box>
                            }
                        </div>


                        <div>
                            {!isLoggedIn && (
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
                    </Grid>
                </Grid>
            </div>
        </gameHashContext.Provider>
    );
}

export default App;
