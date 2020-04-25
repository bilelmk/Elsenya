import React ,  { Component } from 'react'
import { Map , Marker , Popup , TileLayer} from "react-leaflet";
import { Icon } from "leaflet" ;
import * as data from '../../utils/data.json' ;

const  HomeMap = () => {
    return (
        <Map center={[33.979809 , 9.435263]} zoom={7}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {data.users.map(user => (
                <Marker key={user.id} position={[  user.longitude , user.latitude]} />
                )
            )}
        </Map>
    )
};

export default HomeMap ;
