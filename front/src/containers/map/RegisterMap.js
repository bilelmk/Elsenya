import React ,  { Component } from 'react'
import { Map , Marker , Popup , TileLayer} from "react-leaflet";
import { Icon } from "leaflet" ;

export class RegisterMap extends Component {
    render(){
        return <Map center={[45.421532 , -75.697189]} zoom={12}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>

    }
}

export default RegisterMap ;
