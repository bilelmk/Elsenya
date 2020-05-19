import React from 'react'
import "./Toolbar.scss"
import { Facebook, Instagram, MailOutlined } from "@material-ui/icons";

function Toolbar() {
    return  <p className={"toolbar"} >
                <MailOutlined className={"toolbar-icon"}/>
                <span className={"toolbar-text"}>
                    apeksibetmediouni@gmail.com
                </span>
                <span className={"social-icons"}>
                    <a target="_blank" className={"toolbar-link"} href="https://www.facebook.com/APEKTN"><Facebook className={"toolbar-icon"}/></a>
                    <a target="_blank" className={"toolbar-link"} href="https://www.instagram.com/apektn/?fbclid=IwAR1SnXbskabgTmBEy1vUdSA7Xc0oYpWDoRWk1Ddg6EFt1056vovkh9bTRhc"><Instagram className={"toolbar-icon"}/></a>
                </span>
            </p>
}
export default Toolbar ;
