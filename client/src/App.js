import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Artists from "./Artists/Artists";
import Collections from "./Collections/Collections";
import Records from './Records/Records';
import UserProfile from './User/UserProfile';
import SignUp from './User/SignUp';
import Login from './User/Login';
import Home from './Utils/Home';
import Nav from './Utils/Nav';
import { authenticate } from "./Utils/store";

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
  }, [dispatch]);


  return (
    <BrowserRouter>
      {isLoggedIn && <Nav />}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/welcome" exact component={Home} />
        <Route path="/artists" exact component={Artists} />
        <Route path="/collections" exact component={Collections} />
        <Route path="/records" exact component={Records} />
        <Route path="/me" exact component={UserProfile} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
