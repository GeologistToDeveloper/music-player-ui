import React, { useReducer} from "react";

export const PlaylistsContext = React.createContext(null);

const reducer = (state, action) => {
    switch(action.type) {
        case('ADD TO NEW PLAYLIST'):
           // alert("New playlist");
            return [...state, action.payload] ;
        case('ADD TO EXISTING PLAYLIST'):
            // if(state[action.payload.index].list.includes(action.payload.songId)){
            //     alert('Song Already in Playlist.')
            //     return state;
            // }
            // else{
                state[action.payload.index].list.add(action.payload.songId);
                return state;
            
        case('DELETE FROM EXISTING PLAYLIST'):
            state[action.payload.index].list.delete(action.payload.songId);
            if(state[action.payload.index].list.size === 0) {
                state.splice(action.payload.index,1);
            }
            return state;
        case('REMOVE PLAYLIST'):
            state.splice(action.payload.index,1);
            return state;
        default:
            return state;
    }
}

const PlaylistsContextProvider = (props) => {

    const [currPlaylists, dispatch] = useReducer(reducer,[]);

    const playlistsContext = {
        playlists: currPlaylists,
        dispatch: dispatch
    }


    return (
        <PlaylistsContext.Provider value={playlistsContext}>
            {props.children}
        </PlaylistsContext.Provider>
    );
}

export default PlaylistsContextProvider;