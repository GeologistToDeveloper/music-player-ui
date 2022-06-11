import { Fragment, useState, useEffect } from "react";
import NavBar from "./NavBar";
import styles from "./Home.module.css";
import SongsList from "./SongsList";
import songs from "../assets/index.js";
import SongCard from "./ui/SongCard";
import SonglistContainer from "./ui/SonglistContainer";

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
        
        <SonglistContainer>
          {searchList.map((song) => {
            return (
              <SongCard i={song.id} song={song}/>
            );
          })}
       
        </SonglistContainer>
      )}
    </Fragment>
  );
};

export default Home;
