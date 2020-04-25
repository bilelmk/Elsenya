import React from "react";

import { Route, Switch ,Redirect} from "react-router-dom";

import "./Home.css";

import Library from "../library/Library";
import HomeMap from "../home-map/HomeMap";
import Information from "../information/Information";
<<<<<<< HEAD
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
=======
import Register from "../register/Register";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


>>>>>>> 9d560020fbfb743ad87c519118a38bfc6108ffe1

function Home() {
  return (
<<<<<<< HEAD
    <div className="container">
      <div className="content">
        <Header />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" exact component={HomeMap} />
          <Route path="/home/library" exact component={Library} />
          <Route path="/home/information" exact component={Information} />
        </Switch>
      </div>

      <SideBar />
=======
    <div  className="container">

        <div className="content">
              <div className={classes.root}>
                  <AppBar position="static">
                      <Toolbar>
                          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                              <MenuIcon />
                          </IconButton>
                          <Typography variant="h6" className={classes.title}>
                              News
                          </Typography>
                          <Button color="inherit">Login</Button>
                      </Toolbar>
                  </AppBar>
              </div>
            <Route path="/home" exact component={HomeMap} />
            <Route path="/home/library" exact  component={Library} />
            <Route path="/home/information" exact component={Information} />
        </div>

        <div className="large-vertical-menu">

        </div>

        <div className="vertical-menu">
            <NavLink className="NavLink" to="/home" exact  >
                <Button className="vertical-menu-btn">
                    الخريطة
                </Button>
            </NavLink>
            <NavLink className="NavLink" to="/home/information">
                <Button className="vertical-menu-btn">
                    المعلومات
                </Button>
            </NavLink>
            <NavLink className="NavLink" to="/home/library">
                <Button className="vertical-menu-btn">
                    المكتبة
                </Button>
            </NavLink>
            <Register/>
        </div>
>>>>>>> 9d560020fbfb743ad87c519118a38bfc6108ffe1
    </div>
  );
}
export default Home;
