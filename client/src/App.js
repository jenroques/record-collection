import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Artists from "./Artists/Artists";
import Collections from "./Collections/Collections";
import Records from './Records/Records';
import UserProfile from './User/UserProfile';
import SignUp from './User/SignUp';
import Login from './User/Login';
import Home from './Utils/Home';
import Nav from './Utils/Nav';
import { authenticate } from "./Action/actions";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.session.isLoggedIn);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      dispatch(authenticate())
        .then(() => {
          console.log("Successfully authenticated");
        })
        .catch((error) => {
          console.log("Authentication failed:", error.message);
        });
    }
    const handleBeforeUnload = () => {
      if (!isLoggedIn) {
        localStorage.removeItem("sessionId");
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch, isLoggedIn]);

  return (
    <BrowserRouter>
      {isLoggedIn && <Nav />}
      <Switch>
        {isLoggedIn ? (
          <Redirect exact from="/" to="/welcome" />
        ) : (
          <Route exact path="/" component={Login} />
        )}
        {isLoggedIn ? (
          <Redirect exact from="/login" to="/welcome" />
        ) : (
          <Route path="/login" component={Login} />
        )}
        {isLoggedIn ? (
          <Redirect exact from="/signup" to="/welcome" />
        ) : (
          <Route path="/signup" component={SignUp} />
        )}
        {isLoggedIn ? (
          <>
            <Route path="/artists" component={Artists} />
            <Route path="/collections" component={Collections} />
            <Route path="/records" component={Records} />
            <Route path="/me" component={UserProfile} />
            <Route path="/welcome" component={Home} />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
