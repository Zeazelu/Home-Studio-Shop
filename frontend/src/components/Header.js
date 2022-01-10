import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductCategories } from "../actions/productActions";
import SearchBox from "./SearchBox";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <header className="Header">
      <img src={require("../assets/herb.png")} className="Logo" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">

          <Route
            render={({ history }) => (
              <SearchBox history={history}></SearchBox>
            )}
          ></Route>

          <Link to="/">
            <i class="fa fa-home"></i>
          </Link>

          <Link to="/cartchoice">
            <i className="fa fa-shopping-cart"></i>
          </Link>

          {userInfo ? (

            <Link to="/profilechoice">
              {userInfo.name}{' '}
            </Link>



          ) : (
            <Link to="/signin">Logowanie</Link>
          )}
          {userInfo && userInfo.isAdmin && (

            <Link to="/adminchoice">
              Admin
            </Link>

          )}
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Bars">
        <i className="fa fa-bars"></i>
      </button>
    </header >
  );
}