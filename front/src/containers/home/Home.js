import React from "react";
import { Route, Switch ,Redirect} from "react-router-dom";
import "./Home.scss";

import Library from "../library/Library";
import HomeMap from "../home-map/HomeMap";
import Information from "../information/Information";
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import Resources from "../resources/resources";


function Home() {
    return (
        <div className="container">
            <div className="content">
                <Header />
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route path="/home" exact component={HomeMap} />
                    <Route path="/home/library" exact component={Library} />
                    <Route path="/home/information" exact component={Information} />
                    <Route path="/home/resources/:id" exact component={Resources} />
                </Switch>
            </div>
            <SideBar />
        </div>
    );
}
export default Home;
