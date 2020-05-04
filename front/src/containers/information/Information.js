import React, { Component } from 'react';
import axios from "axios";
import baseURL from "../../utils/baseURL";

export class Information extends Component {
    state = {
        resources : [] ,
        isDataExist : false ,
    };

    componentDidMount() {
        axios.get(baseURL + "resources/5")
            .then(res =>{
                console.log(res.data)
                this.setState( {
                    resources : res.data ,
                    isDataExist : true
                })
            })
            .catch(err => console.log(err))
    }

    render(){
        return <div>
            {this.state.resources.map((resource) => (
                <div>
                    <p>{resource.title}</p>
                    {this.state.isDataExist ?
                        resource.type === 'video' ?
                            <video key={resource.id} width="320" height="240" controls>
                                <source src={resource.content} type="video/mp4" />
                                <source src={resource.content} type="video/ogg" />
                                Your browser does not support the video tag
                            </video> :
                        resource.type === 'image' ?
                            <img key={resource.id} src={resource.content}   alt="no image" /> :
                        resource.type === 'pdf' ?
                            <iframe key={resource.id} src={resource.content+"#toolbar=0"} width="800" height="600" align="middle"></iframe> : null
                        : null }
                </div>
            ))}
        </div>

    }

}

export default Information;

