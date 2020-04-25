import React  from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import { NavLink} from "react-router-dom";
import { Route } from "react-router-dom" ;

import './Home.css'

import Library from "../library/Library";
import HomeMap from "../home-map/HomeMap";
import Information from "../information/Information";
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



function Home() {

  const classes = useStyles();

  return (
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
    </div>
  );
}
export default Home;
