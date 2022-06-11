import styles from "./SongCard.module.css";
import { BiInfoCircle } from "react-icons/bi";
import { BsPlayCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { SongContext } from "../../store/SongContext";
import { Fragment } from "react";
import { MdDeleteOutline } from "react-icons/md";
import React from "react";
import ReactDOM from 'react-dom';
import InfoModal from "./InfoModal";
import Overlay from "./Overlay";


const SongCard = (props) => {
    const [isInfoOverlayOn, setIsInfoOverlayOn] = useState(false);
  const songCtx = useContext(SongContext);

  const btnHandler = (evt) => {
    songCtx.changeIndex(evt.currentTarget.id);
  };

  const infoHandler = (evt) => {
    songCtx.changeIndex(evt.currentTarget.id);
    setIsInfoOverlayOn(true);

    //console.log(evt.currentTarget.id);
  };

  return (
   
    <Fragment key={Math.random()}>
      <div className={styles.cards}>
        <button
          id={props.i}
          onClick={infoHandler}
          className={styles.infoBtn}
          style={{ visibility: "hidden", borderRadius: "50%" }}
        >
          <BiInfoCircle style={{ height: "2rem", width: "2rem" }} />
        </button>
        <Link to={`/now-playing/${props.i}`}>
          <button
            id={props.i}
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
          src={props.song.image}
          alt="Album Art"
        ></img>
        {props.isPlaylist ? (
          <button
            value={props.value}
            id={props.i}
            style={{ visibility: "hidden" }}
            className={styles.deleteBtn}
            onClick={props.deleteHandler}
          >
            <MdDeleteOutline
              style={{ height: "1rem", width: "1rem", borderRadius: "1rem" }}
            />
          </button>
        ) : null}
        <p>{props.song.audioTitle}</p>
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

export default SongCard;
