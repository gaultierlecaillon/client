import React from 'react';
import axios from 'axios';
import {Button, Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import Cookies from "universal-cookie";

export default class GamePlay extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const cookies = new Cookies();
        const jwtToken = cookies.get('jwt_authorization_pwc');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        };
        axios.post(
            'http://127.0.0.1:8000/api/game/play/vy93H73DyXrKcDTR84HTKX2qjaHA3vjXvslSGFvVVm', //TODO
            {
                bet: data.get('bet'),
            },
            {headers}
        ).then(response => {
            console.log("Response:", response.data);
        }).catch(error => {
                console.log("Error:", error);
            }
        )
    };

    render() {
        return (
            <Box sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{mt: 1}}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="bet"
                        label="Input a number (1 - 10000)"
                        type="text"
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                        Check
                    </Button>
                </Box>
            </Box>
        )
    }
}