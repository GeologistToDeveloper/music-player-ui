import React, { useState } from "react";

export const LoggedInContext = React.createContext(false);

const LoggedInContextProvider = (props) => {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const loggedInContext = {
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn
    }

     return (
         <LoggedInContext.Provider value={loggedInContext}>
             {props.children}
         </LoggedInContext.Provider>
     );
}

export default LoggedInContextProvider;