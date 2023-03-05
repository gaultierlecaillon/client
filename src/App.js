import GameList from './components/GameList';
import LoginForm from './components/LoginForm';
import GameNew from './components/GameNew';
import GamePlay from './components/GamePlay';
import Header from './components/Header';
import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Typography from "@mui/material/Typography";



function App() {
    return (
        <div className="App">
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Header/>
                <Grid item pt={5} xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Typography component="h1" variant="h4" align="center" fontWeight="bold" color="#474747">
                        Guess The Number
                    </Typography>
                    <LoginForm/>
                    <GameNew/>
                    <GamePlay/>
                    <GameList/>
                </Grid>
            </Grid>

        </div>
    );
}

export default App;
