import React from 'react';
import axios from 'axios';
import {Button} from "@mui/material";


export default class GameNew extends React.Component {

    handleClick = event => {
        const access_token = '32|WHBO5QADUu861H07ksCykloA6LB4pddS0wZEkIX3';

        let config = {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }

        axios.get(
            'http://127.0.0.1:8000/api/game/new', //TODO
            config
        ).then(response => {
            console.log("Success:", response.data);
        }).catch(error => {
            console.log("Error:", error);
        })
    }

    render() {
        return (
            <div>
                <Button color="primary" variant="contained" onClick={this.handleClick}>
                    New game
                </Button>
            </div>
        )
    }
}