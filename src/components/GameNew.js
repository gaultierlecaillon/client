import React from 'react';
import axios from 'axios';
import {Button, Box} from "@mui/material";
import Cookies from "universal-cookie";

export default class GameNew extends React.Component {

    handleClick = event => {
        const cookies = new Cookies();
        const jwtToken = cookies.get('jwt_authorization_pwc');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        };
        axios.get(
            'http://127.0.0.1:8000/api/game/new', //TODO
            {headers}
        ).then(response => {
            console.log("Success:", response.data);
        }).catch(error => {
            console.log("Error:", error);
        })
    }

    render() {
        return (
            <Box sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Button color="primary" variant="contained" onClick={this.handleClick}>
                    New game
                </Button>
            </Box>
        )
    }
}