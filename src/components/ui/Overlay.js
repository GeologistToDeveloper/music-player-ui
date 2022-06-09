import styles from './Overlay.module.css';

const Overlay = (props) => {

    const overlayClickHandler = () => {
        props.setOverlayOn(false);
        // props.setIsInfoOverlayOn(false);
        
    }

    return (
        <div onClick={overlayClickHandler} className={styles.overlay}>
            {props.children}
        </div>
    );
}

export default Overlay;