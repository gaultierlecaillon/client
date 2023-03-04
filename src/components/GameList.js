import React from 'react';
import axios from 'axios';

export default class GameList extends React.Component {
    state = {
        games: []
    }

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                const games = res.data;
                this.setState({games});
            })
    }

    render() {
        return (
            <ul>
                {
                    this.state.games
                        .map(game =>
                            <li key={game.id}>{game.name}</li>
                        )
                }
            </ul>
        )
    }
}