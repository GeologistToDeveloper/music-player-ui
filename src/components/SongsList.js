import { Fragment, useContext, useState } from "react";
import songs from "../assets/index.js";
import styles from "./SongsList.module.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { SongContext } from "../store/SongContext.js";
import { Link } from "react-router-dom";
import { BiInfoCircle } from "react-icons/bi";
import Overlay from "./ui/Overlay.js";
import ReactDOM from "react-dom";
import InfoModal from "./ui/InfoModal.js";

const SongsList = () => {
  const mainIndex = Math.floor(Math.random() * 12);

  const [isInfoOverlayOn, setIsInfoOverlayOn] = useState(false);

  const songCtx = useContext(SongContext);

  const mainBtnHandler = (evt) => {
    songCtx.changeIndex(mainIndex);
  };

  const btnHandler = (evt) => {
    songCtx.changeIndex(evt.currentTarget.id);
  };

  const infoHandler = (evt) => {
    songCtx.changeIndex(evt.currentTarget.id);
    setIsInfoOverlayOn(true);
    
    //console.log(evt.currentTarget.id);
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
      <div className={styles.songsList}>
        {songs.map((song, i) => {
          if (i !== mainIndex) {
            return (
              <Fragment key={Math.random()}>
                <div className={styles.cards}>
                  <button
                    id={i}
                    onClick={infoHandler}
                    className={styles.infoBtn}
                    style={{ visibility: "hidden", borderRadius: "50%" }}
                  >
                    <BiInfoCircle style={{ height: "2rem", width: "2rem" }} />
                  </button>
                  <Link to={`/now-playing/${i}`}>
                    <button
                      id={i}
                      onClick={btnHandler}
                      className={styles.btn}
                      style={{ visibility: "hidden", borderRadius: "50%" }}
                    >
                      <BsPlayCircleFill
                        style={{ height: "5rem", width: "5rem" }}
                      ></BsPlayCircleFill>
                    </button>
                  </Link>
                  <img
                    className={styles.cardImage}
                    src={song.image}
                    alt="Album Art"
                  ></img>
                  <p>{song.audioTitle}</p>
                </div>
              </Fragment>
            );
          }
          return "";
        })}
      </div>
      {isInfoOverlayOn &&
        ReactDOM.createPortal(
          <Fragment>
          <Overlay setOverlayOn={setIsInfoOverlayOn}>
            
          </Overlay>
          <InfoModal setOverlayOn={setIsInfoOverlayOn}/>
          </Fragment>,
          document.getElementById("overlays")
        )}
    </Fragment>
  );
};

export default SongsList;
