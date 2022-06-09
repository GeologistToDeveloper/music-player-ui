import { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LoggedInContext } from "../store/LoggedInContext";
import NavBar from "./NavBar";
import styles from './Login.module.css';

const Login = () => {

    const history = useHistory();
    

    const loggedInCtx = useContext(LoggedInContext);

    const submitHandler = (evt) => {
        evt.preventDefault();
        loggedInCtx.setIsLoggedIn(true);
        history.push('/');
    }

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return (
            () => {document.body.style.overflow = "visible"}
        )
    },[]);

    return (
        <Fragment>
            <NavBar/>
        <div className={styles.formDiv}>
            <form className={styles.loginForm} onSubmit={submitHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type='text'></input>
                <label htmlFor="password">Password</label>
                <input id="password" type='text'></input>
                <button type="submit">Submit</button>
            </form>
        </div>
        </Fragment>
    );
}

export default Login;