import { Fragment, useState, useEffect } from "react";
import NavBar from "./NavBar";
import styles from "./Home.module.css";
import SongsList from "./SongsList";
import songs from "../assets/index.js";

const Home = () => {
  const [isInputNotNull, setIsInputNotNull] = useState(false);
  const [searchList, setSearchList] = useState([]);

  useEffect(()=>{
    document.body.style.overflowX = "hidden";
    return (
        () => {document.body.style.overflowX = "visible"}
    )
},[]);


  const inputChangeHandler = (evt) => {
    
    let input = evt.target.value.trim().toUpperCase();
    if (input !== "") {
      setIsInputNotNull(true);
      let searchListArr = songs.filter(
        song =>
          {
            console.log(input);
            return (song.audioTitle.toUpperCase().includes(input) || song.audioArtist.toUpperCase().includes(input));
          }
      );
      //console.log(searchListArr);
      setSearchList(searchListArr);
    } else {
      setIsInputNotNull(false);
    }
  };

  // useEffect(()=> {
  //   setSearchList(searchListArr);
  // }, [isInputNotNull, input, searchListArr]);

  return (
    <Fragment>
      <NavBar />
      <div className={styles.searchBar}>
        <input
          placeholder="Hi! Search for a song here!"
          type="text"
          onChange={inputChangeHandler}
        ></input>
      </div>
      {!isInputNotNull && <SongsList />}

      {isInputNotNull && (
        <div className={styles.songsList}>
          {searchList.map((song) => {
            return (
              <div key={Math.random()}>
                <img src={song.image} alt="Album Art"></img>
                <p>{`${song.audioTitle}   |   ${song.audioArtist}`}</p>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
