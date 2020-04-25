import React from "react";

import Button from "@material-ui/core/Button";

import { NavLink, Route, Switch } from "react-router-dom";

import "./SideBar.css";



function SideBar() {

  return (
    <>
      <div className="large-vertical-menu"></div>

      <div className="vertical-menu">
        <NavLink className="NavLink" to="/home" exact>
          <Button className="vertical-menu-btn">الخريطة</Button>
        </NavLink>
        <NavLink className="NavLink" to="/home/information">
          <Button className="vertical-menu-btn">المعلومات</Button>
        </NavLink>
        <NavLink className="NavLink" to="/home/library">
          <Button className="vertical-menu-btn">المكتبة</Button>
        </NavLink>
      </div>
    </>
  );
}
export default SideBar;
