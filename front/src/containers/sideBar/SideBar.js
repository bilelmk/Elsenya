import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.scss";
import { Menu, Close } from '@material-ui/icons';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

function SideBar() {

    const [open, setOpen] = useState(false);

    const openMenu = () =>{
        setOpen(!open);
    };

    const closeMenu = () =>{
        setOpen(false);
    };

    return (
      <div>
          <div className="vertical-menu">
              <img className="side-image" src="/assets/senia logo 3.png" />

              <button className="menu-btn" onClick={openMenu} >
                  { !open ? <Zoom><Menu /></Zoom> : <Zoom><Close /></Zoom> }
              </button>

              <NavLink className="NavLink" to="/home/signup">
                  <button className="vertical-menu-btn">التسجيل</button>
              </NavLink>

              <NavLink className="NavLink" to="/home/library">
                  <button className="vertical-menu-btn">المكتبة</button>
              </NavLink>

              <NavLink className="NavLink" to="/home/information">
                  <button className="vertical-menu-btn">المعلومات</button>
              </NavLink>

              <NavLink className="NavLink" to="/home" exact>
                  <button className="vertical-menu-btn">الخريطة</button>
              </NavLink>

              <NavLink className="NavLink" to="/home/welcome" exact>
                  <button className="vertical-menu-btn">الإستقبال</button>
              </NavLink>

          </div>

          { open ? <div className={"sm-menu fade-in-top"}>
              <NavLink className={"sm-menu-link"} to="/home/welcome" exact  onClick={closeMenu}>
                  <p>الإستقبال</p>
              </NavLink>

              <NavLink className={"sm-menu-link"} to="/home" exact  onClick={closeMenu}>
                  <p>الخريطة</p>
              </NavLink>

              <NavLink className={"sm-menu-link"} to="/home/information" exact  onClick={closeMenu}>
                  <p>المعلومات</p>
              </NavLink>

              <NavLink className={"sm-menu-link"} to="/home/library" exact  onClick={closeMenu}>
                  <p>المكتبة</p>
              </NavLink>

              <NavLink className={"sm-menu-link"} to="/home/signup" exact onClick={closeMenu}>
                    <p>التسجيل</p>
              </NavLink>
          </div> : '' }
      </div>

  );
}
export default SideBar;
