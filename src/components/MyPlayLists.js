import NavBar from "./NavBar";
import { PlaylistsContext } from "../store/PlaylistsContext";
import { Fragment, useContext, useEffect, useState } from "react";
import songs from "../assets/index.js";

import styles from "./MyPlayLists.module.css";
import { MdDeleteOutline } from "react-icons/md";
import SongCard from "./ui/SongCard";
import SonglistContainer from "./ui/SonglistContainer";

const MyPlayLists = () => {
    const [isPlaylistsNull, setIsPlaylistsNull] = useState(false);
  
  const [x, setX] = useState(1);

  useEffect(()=>{
    document.body.style.overflowX = "hidden";
    return (
        () => {document.body.style.overflowX = "visible"}
    )
},[]);

  

  const playlistsCtx = useContext(PlaylistsContext);

  useEffect(()=>{
    if(playlistsCtx.playlists.length===0){
        setIsPlaylistsNull(true);
    }
},[playlistsCtx.playlists.length]);

  

  const deleteHandler = (evt) => {
      playlistsCtx.dispatch({
          type: 'DELETE FROM EXISTING PLAYLIST',
          payload: {songId:evt.currentTarget.id, index:evt.currentTarget.value}
      });
    setX(Math.random());
  }

  const removePlaylistHandler = (evt) => {
    playlistsCtx.dispatch({
        type: 'REMOVE PLAYLIST',
        payload: {index: evt.currentTarget.id}
    });
    setX(Math.random());
  }

  let z = (
    <div>
    {playlistsCtx.playlists.map((playlist, i) => {
      let y = [];
      for (let x of playlist.list) {
        y.push(
          // <div className={styles.cards} key={x}>
          //   <Link to={`/now-playing/${x}`}>
          //     <button
          //       id={i}
          //       onClick={btnHandler}
          //       className={styles.btn}
          //       style={{ visibility: "hidden", borderRadius: "50%" }}
          //     >
          //       <BsPlayCircleFill
          //         style={{ height: "5rem", width: "5rem" }}
          //       ></BsPlayCircleFill>
          //     </button>
          //   </Link>
          //   <img
          //     className={styles.cardImage}
          //     src={songs[x].image}
          //     alt="Album Art"
          //   />
          //   <button
          //       value={i}
          //       id={x}
          //     style={{ visibility: "hidden" }}
          //     className={styles.deleteBtn}
          //     onClick = {deleteHandler}
          //   >
          //     <MdDeleteOutline style={{ height: "1rem", width: "1rem", borderRadius: '1rem' }} />
          //   </button>
          //   <span>{`${songs[x].audioTitle}`}</span>
          // </div>
          <SongCard i={x} song={songs[x]} value={i} isPlaylist={true} deleteHandler={deleteHandler}/>
        );
      }

      return (
        <div key={i}>
          <hr color="black" style={{ width: "100%" }} />
          <div className={styles.playlistName}>
              {playlist.name}
            <button id={i} onClick={removePlaylistHandler}><MdDeleteOutline/></button>
            </div>
            <hr color="black" style={{ width: "100%" }} />
          
          <SonglistContainer>
            {y}
            </SonglistContainer>
            
          
        </div>
      );
    })}
  </div>
  );

  return (
    <Fragment>
      <NavBar />
      {isPlaylistsNull ? <div className={styles.noPlaylists}><span>No Playlists to Show! Try making some.</span></div> : z}
    </Fragment>
  );
};

export default MyPlayLists;
