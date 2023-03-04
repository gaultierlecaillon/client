import React from 'react';
import axios from 'axios';

export default class PersonAdd extends React.Component {
    handleChangeUsername = event => {
        this.setState({username: event.target.value});
    }
    handleChangePassword = event => {
        this.setState({password: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        axios.post(
            'http://127.0.0.1:8000/api/login', //TODO
            {
                username: this.state.username,
                password: this.state.password,
            },
            {headers}
        ).then(response => {
            console.log("Success ========>", response.data);
        }).catch(error => {
                console.log("Error ========>", error);
            }
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="name" onChange={this.handleChangeUsername}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" onChange={this.handleChangePassword}/>
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}