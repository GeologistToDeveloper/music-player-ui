import ReactDOM from "react-dom";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import styles from "./NowPlaying.module.css";
import { Fragment, useContext, useReducer, useState } from "react";
import NavBar from "./NavBar";
import songs from "../assets/index.js";
// import { SongContext } from "../store/SongContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import { PlaylistsContext } from "../store/PlaylistsContext";
import Overlay from "./ui/Overlay";
import ModalForm from "./ui/ModalForm";
import { LoggedInContext } from "../store/LoggedInContext";


const songReducer = (currentSong, action) => {
  switch (action.type) {
    case "PREVIOUS SONG":
      return {
        index: action.payload - 1,
        image: songs[action.payload - 1].image,
        audio: songs[action.payload - 1].audio,
        audioTitle: songs[action.payload - 1].audioTitle,
        audioArtist: songs[action.payload - 1].audioArtist,
      };
    case "PREVIOUS SONG AT 0":
      return {
        index: 11,
        image: songs[11].image,
        audio: songs[11].audio,
        audioTitle: songs[11].audioTitle,
        audioArtist: songs[11].audioArtist,
      };
    case "NEXT SONG":
      return {
        index: action.payload + 1,
        image: songs[action.payload + 1].image,
        audio: songs[action.payload + 1].audio,
        audioTitle: songs[action.payload + 1].audioTitle,
        audioArtist: songs[action.payload + 1].audioArtist,
      };
    case "NEXT SONG AT 11":
      return {
        index: 0,
        image: songs[0].image,
        audio: songs[0].audio,
        audioTitle: songs[0].audioTitle,
        audioArtist: songs[0].audioArtist,
      };
    default:
      return {
        index: 0,
        image: songs[0].image,
        audio: songs[0].audio,
        audioTitle: songs[0].audioTitle,
        audioArtist: songs[0].audioArtist,
      };
  }
};

const NowPlaying = () => {

  const loggedInCtx = useContext(LoggedInContext);

  const { songId } = useParams();
  // const playlistsCtx = useContext(PlaylistsContext);
  const [isPlaylistOverlayOn, setIsPlaylistOverlayOn] = useState(false);
  // const songCtx = useContext(SongContext);

  // const [currentSong, dispatch] = useReducer(songReducer, {
  //   index: songCtx.index,
  //   image: songs[songCtx.index].image,
  //   audio: songs[songCtx.index].audio,
  //   audioTitle: songs[songCtx.index].audioTitle,
  //   audioArtist: songs[songCtx.index].audioArtist,
  // });

  const [currentSong, dispatch] = useReducer(songReducer, {
    index: +songId || 0,
    image: songs[+songId || 0].image,
    audio: songs[+songId || 0].audio,
    audioTitle: songs[+songId || 0].audioTitle,
    audioArtist: songs[+songId || 0].audioArtist,
  });

  const prevClickHandler = () => {
    if (currentSong.index > 0) {
      dispatch({ type: "PREVIOUS SONG", payload: currentSong.index });
    } else {
      dispatch({ type: "PREVIOUS SONG AT 0", payload: currentSong.index });
    }
  };

  const nextClickHandler = () => {
    if (currentSong.index < 11) {
      dispatch({ type: "NEXT SONG", payload: currentSong.index });
    } else {
      dispatch({ type: "NEXT SONG AT 11", payload: currentSong.index });
    }
  };

  const playlistOverlayHandler = () => {
    setIsPlaylistOverlayOn(true);
  };

  const iconStyle = { height: "6rem", width: "6rem" };
  return (
    <Fragment>
      <NavBar />
      <div className={styles.art}>
        <Link
          to={
            currentSong.index > 0
              ? `/now-playing/${currentSong.index - 1}`
              : "/now-playing/11"
          }
        >
          <button onClick={prevClickHandler} className={styles.span1}>
            <BsFillArrowLeftSquareFill style={iconStyle} />
          </button>
        </Link>
        <img src={currentSong.image} alt="Album Art" />
        <Link
          to={
            currentSong.index < 11
              ? `/now-playing/${currentSong.index + 1}`
              : "/now-playing/0"
          }
        >
          <button onClick={nextClickHandler} className={styles.span2}>
            <BsFillArrowRightSquareFill style={iconStyle} />
          </button>
        </Link>
      </div>
      <div className={styles.songDetails}>
        <span>{currentSong.audioTitle}</span>|
        <span>{currentSong.audioArtist}</span>
        {loggedInCtx.isLoggedIn && <span>
          <button onClick={playlistOverlayHandler}>
            <MdPlaylistAdd style={{ display: "inline", paddingLeft: '0px' }} />
          </button>
        </span>}
      </div>
      <audio
        className={styles.player}
        src={currentSong.audio}
        onEnded={nextClickHandler}
        controls
        autoPlay
      />
      {isPlaylistOverlayOn &&
        ReactDOM.createPortal(
          <Fragment>
          <Overlay setOverlayOn={setIsPlaylistOverlayOn}>
         
          </Overlay>
             <ModalForm
             songId={songId}
             setIsPlaylistOverlayOn={setIsPlaylistOverlayOn}
           />
          </Fragment>
        ,
          document.getElementById("overlays")
          
        )}
    </Fragment>
  );
};

export default NowPlaying;
