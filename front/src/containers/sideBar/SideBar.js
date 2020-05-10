import React from "react";

import Button from "@material-ui/core/Button";

import { NavLink } from "react-router-dom";
import { KeyboardArrowDown , ImageOutlined , VideocamOutlined , PictureAsPdfOutlined } from '@material-ui/icons';

import "./SideBar.css";



function SideBar() {

  return (
      <div className="vertical-menu">
        <NavLink className="NavLink" to="/" exact>
           <Button className="vertical-menu-btn">الإستقبال</Button>
        </NavLink>
        <NavLink className="NavLink" to="/home" exact>
          <Button className="vertical-menu-btn">الخريطة</Button>
        </NavLink>
        <NavLink className="NavLink" to="/home/information">
          <Button className="vertical-menu-btn">المعلومات</Button>
        </NavLink>
        <NavLink className="NavLink" to="/home/library">
          <Button className="vertical-menu-btn">المكتبة</Button>
        </NavLink>
        <NavLink className="NavLink" to="/home/signup">
          <Button className="vertical-menu-btn">التسجيل</Button>
        </NavLink>
      </div>
  );
}
export default SideBar;
