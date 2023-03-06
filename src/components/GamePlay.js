import React, {useContext, useState} from 'react';
import axios from 'axios';
import {Button, Box, Alert, TextField} from "@mui/material";
import Cookies from "universal-cookie";
import gameHashContext from "../game-context";
import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti'

export default function GamePlay() {
    const [message, setMessage] = useState();
    const [isFinished, setIsFinished] = useState(false);
    const {gameHash, setGameHash} = useContext(gameHashContext);
    const {width, height} = useWindowSize()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const cookies = new Cookies();
        const jwtToken = cookies.get('jwt_authorization_pwc');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        };

        axios.post(
            `${process.env.REACT_APP_HOST_API}/api/game/play/${gameHash}`,
            {
                bet: data.get('bet'),
            },
            {headers}
        ).then(response => {
            console.log("Response:", response.data);
            if (response?.data?.code < 0) {
                setMessage({value: response.data?.message, type: 'error'});
            } else if (response?.data?.code === 1) {
                setMessage({value: response.data?.message, type: 'success'});
                setIsFinished(true);
            } else {
                setMessage({value: response.data?.message, type: 'warning'});
            }
        }).catch(error => {
                console.log("Error:", error);
            }
        )
    };

    return (
        <Box sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <Box component="form" noValidate onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="bet"
                    label="Input a number (1 - 10000)"
                    type="text"
                />

                {isFinished && (
                    <Confetti width={width} height={height}/>
                )}

                {!isFinished ? (
                    <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 3}}>
                        Check
                    </Button>
                ) : (
                    <Button fullWidth variant="contained" sx={{mt: 3, mb: 3}} onClick={() => setGameHash(null)}>
                        Play Again
                    </Button>
                )}

                {message && (
                    <Alert severity={message.type} sx={{mt: 1}}>
                        {message.value}
                    </Alert>
                )}
            </Box>
        </Box>
    )
}