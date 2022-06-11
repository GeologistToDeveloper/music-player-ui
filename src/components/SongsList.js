import { Fragment, useContext } from "react";
import songs from "../assets/index.js";
import styles from "./SongsList.module.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { SongContext } from "../store/SongContext.js";
import { Link } from "react-router-dom";

import SongCard from "./ui/SongCard.js";
import SonglistContainer from "./ui/SonglistContainer.js";

const SongsList = () => {
  const mainIndex = Math.floor(Math.random() * 12);

  

  const songCtx = useContext(SongContext);

  const mainBtnHandler = (evt) => {
    songCtx.changeIndex(mainIndex);
  };

  return (
    <Fragment>
      <div className={styles.mainSong}>
        <div className={styles.div1}>
          <Link to={`/now-playing/${mainIndex}`}>
            <button
              onClick={mainBtnHandler}
              style={{ visibility: "hidden", borderRadius: "50%" }}
            >
              <BsPlayCircleFill
                style={{ height: "7rem", width: "7rem" }}
              ></BsPlayCircleFill>
            </button>
          </Link>
          <img
            className={styles.mainImage}
            src={songs[mainIndex].image}
            alt="ALbum Art"
          ></img>
        </div>
        <div className={styles.div2}>
          <p>Song: {songs[mainIndex].audioTitle}</p>
          <p>Artist: {songs[mainIndex].audioArtist}</p>
          <p>{songs[mainIndex].description}</p>
        </div>
      </div>
      
      <SonglistContainer>
        {songs.map((song, i) => {
          if (i !== mainIndex) {
            return (
              <SongCard i={i} song={song}/>
            );
          }
          return null;
        })}
      
      </SonglistContainer>
    </Fragment>
  );
};

export default SongsList;
