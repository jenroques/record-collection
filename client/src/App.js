import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Artists from "./Artists/Artists";
import Collections from "./Collections/Collections";
import Records from './Records/Records';
import UserProfile from './User/UserProfile';
import SignUp from './User/SignUp';
import Login from './User/Login';
import Logout from './User/Logout';
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

  function LoginPage({ isLoggedIn }) {
    const history = useHistory();

    useEffect(() => {
      if (isLoggedIn) {
        history.push("/");
      }
    }, [isLoggedIn, history]);

    return <Login />;
  }

  function SignUpPage({ isLoggedIn }) {
    const history = useHistory();

    useEffect(() => {
      if (isLoggedIn) {
        history.push("/");
      }
    }, [isLoggedIn, history]);

    return <SignUp />;
  }

  return (
    <BrowserRouter>
      {isLoggedIn && <Nav />}
      <Switch>
        <Route path="/welcome" component={Home} />
        <Route path="/artists" component={Artists} />
        <Route path="/collections" component={Collections} />
        <Route path="/records" component={Records} />
        <Route path="/me" component={UserProfile} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" render={() => <Login isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" render={() => <SignUp isLoggedIn={isLoggedIn} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
