import React,{useReducer} from "react";
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
import UserContext, {StateProvider} from "./context/UserContext";

import axios from "axios";
import Welcome from "./containers/welcome/Welcome";
import PrivateRoute from "./containers/admin/PrivateRoute";
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
    var token = localStorage.getItem("jwToken");


    if (token)
        axios.defaults.headers.common["Authorization"] = `${token}`;
    else axios.defaults.headers.common["Authorization"] = null;

    const initialState = {
        isAuth: false
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'login':
                return {
                    ...state,
                    isAuth:true
                };

            default:
                return state;
        }
    };

    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/home"/>
                    <Route path="/home"  component={Home} />
                    <PrivateRoute path="/admin"  component={Admin} />

                </Switch>
            </Router>
        </StateProvider>
    );
}

export default App;
