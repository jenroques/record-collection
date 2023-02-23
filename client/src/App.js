import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Utils/store";

import Artists from "./Artists/Artists";
import Collections from "./Collections/Collections";
import CollectionDetail from './Collections/CollectionDetail';
import Records from './Records/Records';
import RecordDetail from './Records/RecordDetail';
import UserProfile from './User/UserProfile';
import Login from './User/Login';
import Logout from './User/Logout';
import Home from './Utils/Home';
import Nav from './Utils/Nav';



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/artists" component={Artists} />
          <Route exact path="/collections" component={Collections} />
          <Route exact path={`/collection/${id}`} component={CollectionDetail} />
          <Route exact path="/records" component={Records} />
          <Route exact path={`/records/${id}`} component={RecordDetail} />
          <Route exact path="/me" component={UserProfile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
