import React from 'react';
import Grid from "@mui/material/Grid";

export default class Header extends React.Component {
    render() {
        return (
            <Grid item xs={false} sm={4} md={7} sx={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1615469309489-0a464a9925cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2162&q=80)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
        )
    }
}