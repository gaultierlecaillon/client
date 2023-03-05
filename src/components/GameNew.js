import React from 'react';
import { useContext } from "react";
import axios from 'axios';
import {Button, Box} from "@mui/material";
import Cookies from "universal-cookie";
import gameHashContext from "../game-context";

export default function GameNew() {
    const { gameHash, setGameHash } = useContext(gameHashContext);


    const handleClick = event => {
        const cookies = new Cookies();
        const jwtToken = cookies.get('jwt_authorization_pwc');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        };
        axios.get(
            `${process.env.REACT_APP_HOST_API}/api/game/new`,
            {headers}
        ).then(response => {
            console.log("Success:", response.data);
            setGameHash(response.data.hash);
        }).catch(error => {
            console.log("Error:", error);
        })
    }


    return (
        <Box sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Button color="primary" variant="contained" onClick={handleClick}>
                New game
            </Button>
        </Box>
    )
}
