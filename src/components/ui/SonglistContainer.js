import styles from './SonglistContainer.module.css';

const SonglistContainer = (props) => {
    return (
        <div className={styles.songsList}>
            {props.children}
        </div>
    );

   
}

export default SonglistContainer;