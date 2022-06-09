import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
import  { LoggedInContext} from "../store/LoggedInContext.js";
import { useHistory } from "react-router-dom";

const NavBar = () => {

  const loggedInCtx = useContext(LoggedInContext);

  const history = useHistory();

  const logoutHandler = () => {
    loggedInCtx.setIsLoggedIn(false);
    history.push('/');
  }

  return (
    <ul className={styles.navbar}>
      <li><Link className={styles.link} to="/">Home</Link></li>
      <li><Link className={styles.link} to="/now-playing">Now Playing</Link> </li>
      {loggedInCtx.isLoggedIn && <li><Link className={styles.link} to="/my-playlists">My Playlists</Link></li>}
      {!loggedInCtx.isLoggedIn && <Link style={{textDecoration: 'none'}} to="/login"><button>Login</button></Link>}
      {loggedInCtx.isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
    </ul>
  );
};

export default NavBar;
