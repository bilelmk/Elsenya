import React from "react";
import { Route, Switch ,Redirect} from "react-router-dom";
import "./Home.scss";

import Library from "../library/Library";
import HomeMap from "../home-map/HomeMap";
import Information from "../information/Information";
import SignUp from "../signUpPage/SignUpPage";
import SideBar from "../sideBar/SideBar";
import Welcome from "../welcome/Welcome";
import SignIn from "../signInPage/SignInPage";


function Home() {
    return (
        <div className="container">
            <div className="content">
                {/*<Header />*/}
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route path="/home/welcome" exact component={Welcome} />
                    <Route path="/home" exact component={HomeMap} />
                    <Route path="/home/library" exact component={Library} />
                    <Route path="/home/information" exact component={Information} />
                    <Route path="/home/signup" exact component={SignUp} />
                    <Route path="/home/signin" exact component={SignIn} />
                    {/*<Route path="/home/resources/:id" exact component={Resources} />*/}
                </Switch>
            </div>
            <SideBar />
        </div>
    );
}
export default Home;
