import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";


import { Link } from "react-router-dom";

import "../Admin.css";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
}));

function AdminSideBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props.open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/admin" className="link">
            <ListItem button key="Informations">
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="المعلومات" />
            </ListItem>
          </Link>

          <Link to="/admin/admin-library" className="link">
            <ListItem button key="Biblio">
              <ListItemIcon>
                <LibraryBooksOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="المكتبة" />
            </ListItem>
          </Link>
        </List>

        <Divider />

        <List>
          <ListItem button key="Logout">
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="تسجيل خروج" />
          </ListItem>
        </List>
      </Drawer>
  );
}

export default AdminSideBar;
