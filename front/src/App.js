import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import  Home  from "./containers/home/Home";
import  Information  from "./containers/information/Information";
import  Article  from "./containers/article/Article";

import './App.css';



// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/information",
    component: Information,
    routes: [
      {
        path: "/information/article",
        component: Article
      }
    ]
  }
];
function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Redirect exact from="/" to="/home" />
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  </Router>
  );
}

export default App;
