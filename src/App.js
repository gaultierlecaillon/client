import GameList from './components/GameList';
import LoginForm from './components/LoginForm2';
import GameNew from './components/GameNew';
import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {Alert} from "@mui/material";
import Cookies from "universal-cookie";

const isLogged = () => {
    const cookies = new Cookies();
    return cookies.get('jwt_authorization_pwc') ? true : false;
}

function App() {
    return (
        <div className="App">
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1615469309489-0a464a9925cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2162&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item pt={5} xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Typography component="h1" variant="h4" align="center" fontWeight="bold" color="#474747">
                        Guess The Number
                    </Typography>
                    {!isLogged() && (
                        <LoginForm/>
                    )}
                    <GameNew/>
                    <GameList/>
                </Grid>
            </Grid>

        </div>
    );
}

export default App;
