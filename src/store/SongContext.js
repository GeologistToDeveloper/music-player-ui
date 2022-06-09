import { useState } from "react";
import React from "react";



export const SongContext = React.createContext(null);

const SongContextProvider = (props) => {


    const [currIndex, setCurrIndex] = useState(0);

    const songContext = {
        index: currIndex,
        changeIndex: setCurrIndex
    }

    return (
        <SongContext.Provider value={songContext}>
            {props.children}
        </SongContext.Provider>
    );
}

export default SongContextProvider;
