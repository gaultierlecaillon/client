import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box} from "@mui/material";
import Cookies from "universal-cookie";

export default function GameList() {
    const [games, setGames] = useState([]);

    const fetchData = () => {
        const cookies = new Cookies();
        const jwtToken = cookies.get('jwt_authorization_pwc');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        };
        axios.get(
            `${process.env.REACT_APP_HOST_API}/api/game`,
            {headers}
        ).then(res => {
            const games = res.data.data.games;
            setGames(games);
        })
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <Box sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <p>Games List</p>
            <ul>
                {
                    games.map(game =>
                        <li key={game.id}>Game id#{game.id}</li>
                    )
                }
            </ul>
        </Box>
    )

}