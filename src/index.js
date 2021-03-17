import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import "./styling/main.css"

import SignUp from "./containers/Signup";
import LogIn from "./containers/Login";
import Main from './containers/Main'
import "bootstrap/dist/css/bootstrap.min.css";

import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem("token") },
  },
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path = "/" render ={()=><Redirect to = "/main"/>}></Route>
      <Route path="/signup" component={SignUp} />
      <Route path="/main" component={Main} />
      <Route path='/login' component = {LogIn} />

    </Router>
  </Provider>,
  document.getElementById("root")
);
