import React ,  { Component } from 'react'
import { Map , Marker , Popup , TileLayer} from "react-leaflet";
import axios from 'axios' ;
import baseURL from "../../utils/baseURL";
import "./HomeMap.scss"
import Paper from "@material-ui/core/Paper/Paper";

class HomeMap extends Component {

    componentDidMount() {
        axios.get(baseURL + "users")
            .then(res =>this.setState( {users : res.data}))
            .catch(err => console.log(err));
        axios.get(baseURL + "users/stat")
            .then(res => {
                this.setState({stat : res.data.stats, userNumber : res.data.number})
            })
            .catch(err => console.log(err))
    }

    state = {
        users : [] ,
        activeUser : null ,
        stat : [] ,
        userNumber : null
    };

    render (){
        return  <div className={"map-container"}>
                    <Map className={"map"} center={[33.979809 , 9.435263]} zoom={7}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {this.state.users.map(user => (
                                <Marker
                                    key={user.id}
                                    position={[user.latitude , user.longitude  ]}
                                    onClick={() => {
                                        this.setState({activeUser : user});
                                    }}
                                />
                            )
                        )}
                        {this.state.activeUser && (
                            <Popup
                                position={[
                                    this.state.activeUser.latitude,
                                    this.state.activeUser.longitude
                                ]}
                                onClose={() => {
                                    this.setState({activeUser : null});
                                }}
                            >
                                <div className={"popup"}>
                                    <h1>{this.state.activeUser.firstname}</h1>
                                    <h2 className={"message"}>{this.state.activeUser.comment} </h2>
                                    <h2>{this.state.activeUser.governorate} {this.state.activeUser.place}</h2>
                                    <h2>الزراعات : {this.state.activeUser.agriculture} </h2>
                                </div>
                            </Popup>
                        )}
                    </Map>
                    <div >
                        <Paper className={"stat"} elevation={3}>
                            <img src="/assets/logo.png" alt="no image"/>
                            <div>
                                <p className={"question"}>قداش من تونسي يحب يرد لبلاد الكل سانية ؟</p>
                                {this.state.stat.map(stat => (
                                        <p className={"governorate"} >{stat.governorate} : {stat.number}</p>
                                    )
                                )}
                            </div>
                            <div className={"number"}>
                                <div >

                                </div>
                                <div >
                                    <p> : عدد المشاركين </p>
                                    <p>{this.state.userNumber}</p>
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
    }
}

export default HomeMap ;
