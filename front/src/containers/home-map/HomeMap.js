import React ,  { Component } from 'react'
import { Map , Marker , Popup , TileLayer} from "react-leaflet";
import axios from 'axios' ;
import baseURL from "../../utils/baseURL";

class HomeMap extends Component {

    componentDidMount() {
        axios.get(baseURL + "users")
            .then(res =>this.setState( {users : res.data}))
            .catch(err => console.log(err))
    }

    state = {
        users : [] ,
        activeUser : null
    };

    render (){
        return <Map center={[33.979809 , 9.435263]} zoom={7}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {this.state.users.map(user => (
                    <Marker
                        key={user.id}
                        position={[ user.longitude ,
                            user.latitude]}
                        onClick={() => {
                            this.setState({activeUser : user});
                        }}
                    />
                )
            )}
            {this.state.activeUser && (
                <Popup
                    position={[
                        this.state.activeUser.longitude,
                        this.state.activeUser.latitude
                    ]}
                    onClose={() => {
                        this.setState({activeUser : null});
                    }}
                >
                    <div>
                        <h2>{this.state.activeUser.firstname}</h2>
                        <p>{this.state.activeUser.comment}</p>
                    </div>
                </Popup>
            )}
        </Map>
    }
}

export default HomeMap ;
