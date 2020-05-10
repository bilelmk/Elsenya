import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from "./containers/home/Home";
import Admin from "./containers/admin/Admin";
import "./App.css";
import jwt from "jsonwebtoken";


function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes}/>
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
        path: "/admin",
        component: Admin
    }
];

function App() {
    let user = jwt.decode(localStorage.getItem('jwToken'));
    return (

            <Router>
                <Switch>
                    <Redirect exact from="/" to="/home"/>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </Router>

    );
}

export default App;
