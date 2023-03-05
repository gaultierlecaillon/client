import React from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";

export default class GameList extends React.Component {
    state = {
        games: []
    }

    componentDidMount() {
        const cookies = new Cookies();
        const jwtToken = cookies.get('jwt_authorization_pwc');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        };
        axios.get(
            `http://127.0.0.1:8000/api/game/`,
            {headers}
        )
            .then(res => {
                const games = res.data.data.games;
                console.log(games);
                this.setState({games});
            })
    }

    render() {
        return (
            <ul>
                {
                    this.state.games
                        .map(game =>
                            <li key={game.id}>Game id#{game.id}</li>
                        )
                }
            </ul>
        )
    }
}