import React from "react";

// set the defaults
const gameHashContext = React.createContext({
    gameHash: "",
    setGameHash: () => {}
});

export default gameHashContext;
