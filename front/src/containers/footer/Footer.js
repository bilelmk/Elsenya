import React from "react";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import {LocationOnOutlined, Phone , MailOutlined} from "@material-ui/icons";

import "./Footer.scss"
import Zoom from 'react-reveal/Zoom';

function Footer() {
    return (
        <div>
            <div className={"footer"}>
                <Zoom>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={8} sm={4} md={2}>
                            <img src="/assets/blanc.png" alt="senia logo"/>
                        </Grid>
                        <Grid item xs={12} sm={8} md={5} >
                            <Grid container alignItems="center" className={"contact"} >
                                <Grid item >
                                    <Fab size="small" className={"footer-fab"}>
                                        <LocationOnOutlined/>
                                    </Fab>
                                </Grid>
                                <Grid item xs={10} >
                                    <span className={"address"}>
                                        Sanctuaire Sidi Abdallah Mediouni, Avenue Habib Bourguiba, Ksibet el Mediouni 5031 - Monastir
                                    </span>
                                </Grid>
                            </Grid>
                            <p className={"contact"}>
                                <Fab size="small" className={"footer-fab"} >
                                    <Phone/>
                                </Fab>
                                28 210 993 | 52 782 294
                            </p>
                            <p className={"contact"}>
                                <Fab size="small" className={"footer-fab"} >
                                    <MailOutlined/>
                                </Fab>
                                apeksibetmediouni@gmail.com
                            </p>
                        </Grid>
                    </Grid>
                </Zoom>
                <Zoom><p>Elsenya ©2020 Tous les droits sont réservés</p></Zoom>
            </div>
        </div>
        )
}


export default Footer ;
