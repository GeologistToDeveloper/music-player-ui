import { useContext } from 'react';
import { SongContext } from '../../store/SongContext';
import styles from './InfoModal.module.css';
import songs from '../../assets/index';

const InfoModal = (props) => {

    const songCtx = useContext(SongContext);
    console.log(props.songId);

    const okayHandler = () => {
        props.setOverlayOn(false);
    }
    
    return (
        <div className={styles.modal}>
            <h1>Title : {songs[songCtx.index].audioTitle}</h1>
            <h1>Artist : {songs[songCtx.index].audioArtist}</h1>
            <h2>Description : {songs[songCtx.index].description}</h2>
            <button onClick={okayHandler}>Okay!</button>
        </div>
    );
}

export default InfoModal;