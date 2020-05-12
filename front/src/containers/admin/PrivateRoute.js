import React, {useEffect, useState} from 'react'
import jwt from 'jsonwebtoken'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {useStateValue} from "../../context/UserContext";

const PrivateRoute = ({component: Component, ...rest}) => {
    const [isAuth, setIsAuth] = useState(null);
    console.log(isAuth)
    useEffect(() => {
        let token = localStorage.getItem("jwToken")
        console.log(token)
        if (token) {
            let tokenExpiration = jwt.decode(token.split(' ')[1]).exp;
            console.log(tokenExpiration)
            let dateNow = new Date();

            if (tokenExpiration < dateNow.getTime() / 1000) {
                setIsAuth(false)
            } else {
                setIsAuth(true)
            }
        } else {
            setIsAuth(false)
        }
    })
    console.log(isAuth)
    if(isAuth === null){
        return <></>
    }
    if (isAuth) return <Route {...rest} component={Component}/>
    else return <Redirect to="/home"/>
}
export default PrivateRoute;