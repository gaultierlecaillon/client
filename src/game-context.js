import React from "react";

// set the defaults
const gameHashContext = React.createContext({
    gameHash: "test",
    setGameHash: () => {}
});


export default gameHashContext;
