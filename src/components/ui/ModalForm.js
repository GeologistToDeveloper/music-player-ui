import { useContext, useState } from "react";
import { PlaylistsContext } from "../../store/PlaylistsContext";
import styles from "./ModalForm.module.css";

const ModalForm = (props) => {
  const playlistsCtx = useContext(PlaylistsContext);
  const [isCreateNewPlaylistOn, setIsCreateNewPlaylistOn] = useState(false);
  //const [flashMessage, setFlashMessage] = useState(false);

  const addToExistingPlaylistsHandler = (evt) => {
    
    if(playlistsCtx.playlists[evt.currentTarget.id].list.has(props.songId)){
      alert('Song Already in Playlist!');
    }
  
    else{
    playlistsCtx.dispatch({
      type: "ADD TO EXISTING PLAYLIST",
      payload: { index: evt.currentTarget.id, songId: props.songId },
    });
    alert('Added to Playlist');
  }
    // setIsCreateNewPlaylistOn(false);
    props.setIsPlaylistOverlayOn(false);
  };

  const createNewPlaylistButtonHandler = () => {
    setIsCreateNewPlaylistOn(true);
  };

  const createNewPlaylistInputHandler = (evt) => {
    let y = new Set();
    for( let x of playlistsCtx.playlists) {
      y.add(x.name);
    }
    if (evt.key === "Enter") {
      if(y.has(evt.currentTarget.value)){
        alert('Playlist with this name already exists!')
      }
      else{playlistsCtx.dispatch({
        type: "ADD TO NEW PLAYLIST",
        payload: { name: evt.currentTarget.value, list: new Set([props.songId]) },
      });
    }
      // setIsCreateNewPlaylistOn(false);
      props.setIsPlaylistOverlayOn(false);
      alert(`Added To Playlist ${evt.currentTarget.value}`);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Add To Playlist</h1>
      {playlistsCtx.playlists.map((playlist, i) => {
        return (
          <button key={i} id={i} onClick={addToExistingPlaylistsHandler}>
            {playlist.name}
          </button>
        );
      })}
      <hr color="black" style={{ width: "100%" }} />
      {isCreateNewPlaylistOn ? (
        <input
          placeholder="  Press Enter after typing"
          onKeyUp={createNewPlaylistInputHandler}
          type="text"
        ></input>
      ) : (
        <button onClick={createNewPlaylistButtonHandler}>
          + Create a New Playlist
        </button>
      )}
      {/* {flashMessage && <div>Added to Playlist</div>} */} 
    </div>
  );
};

export default ModalForm;
