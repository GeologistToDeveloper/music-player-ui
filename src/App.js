import { Fragment, useContext } from "react";
import NowPlaying from "./components/NowPlaying";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import SongContextProvider from "./store/SongContext";
import MyPlayLists from "./components/MyPlayLists";
import PlaylistsContextProvider from "./store/PlaylistsContext";
import { Redirect } from "react-router-dom";
import  {
  LoggedInContext,
} from "./store/LoggedInContext";
import Login from "./components/Login";

function App() {
  const loggedInCtx = useContext(LoggedInContext);
  console.log(loggedInCtx.isLoggedIn);

  return (
    <Fragment>
      
        <SongContextProvider>
          <PlaylistsContextProvider>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/now-playing/:songId" exact>
              <NowPlaying />
            </Route>
            <Route path="/now-playing/" exact>
              <Redirect to="/now-playing/0" exact />
            </Route>
            {!loggedInCtx.isLoggedIn && (
              <Route path="/login" exact>
                <Login/>
              </Route>
            )}
            {loggedInCtx.isLoggedIn && (
              <Route path="/my-playlists" exact>
                <MyPlayLists />
              </Route>
            )}
          </PlaylistsContextProvider>
        </SongContextProvider>
      
    </Fragment>
  );
}

export default App;
