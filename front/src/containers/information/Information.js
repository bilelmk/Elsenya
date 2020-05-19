import React, {Component} from "react";
import axios from "axios";
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import baseURL from "../../utils/baseURL";
import uuid from 'react-uuid'
import "./Information.scss"
import {Resources} from "../resources/resources";
import Collapse from '@material-ui/core/Collapse';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

import {
    KeyboardArrowDown,
    ImageOutlined,
    VideocamOutlined,
    PictureAsPdfOutlined,
    KeyboardArrowUp
} from '@material-ui/icons';

import Zoom from 'react-reveal/Zoom';
import StaticContent from "./static-content/StaticContent";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "#eeeeee",
    },
}));

class Information extends Component {
    state = {
        informations: [],
        isDataExist: false,
        information_resources: null,
        open: [],
        isLoading:false ,
        static_content : null
    };


    handleClick = (information_id) => {
        this.state.open.map(open => {
            if (open.id === information_id) {
                open.status = open.status === false;
            }
        });
        this.setState({});
    };

    getStaticContent = (information_id) => {
        this.setState({
            static_content : information_id ,
            information_resources: null,
        })
    };

    changeContent(resource) {
        this.setState({
            information_resources: resource,
            static_content : null ,
        })
    }

    isOpen(id) {
        return this.state.open[this.state.open.findIndex(open => {
            return open.id === id
        })].status
    }

    componentDidMount() {
        this.setState({isLoading:true});
        axios
            .get(baseURL + "informations")
            .then(res => {
                console.log(res.data)
                let open = [];

                res.data.map((information) => {
                    open.push({
                        id: information.id,
                        status: false
                    })
                });
                this.setState({
                    information_resources: null,
                    informations: res.data,
                    isDataExist: true,
                    open: open,
                    isLoading:false ,
                    static_content : res.data[0] ? res.data[0].id : null
                });

            })
            .catch(err => this.setState({isLoading:false})
            );
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={"inf-container"}>

                <div className={"inf-content"}>
                    <Zoom ><Resources resource={this.state.information_resources} isLoading={this.state.isLoading}/></Zoom>
                    <StaticContent id={this.state.static_content}/>
                </div>


                <Zoom>
                    <div className={"liste"}>
                        <Paper className={"liste-poper"} elevation={3}>
                            <List className={classes.root}>
                                {this.state.informations.map(information => {
                                    return (
                                        <div key={uuid()}>
                                            <div className={"information"}>
                                                <div>
                                                    <p className={"inf-title"} >
                                                        {!this.isOpen(information.id) ?
                                                            <Fab onClick={this.handleClick.bind(this, information.id)}
                                                                 size="small"
                                                                 className={"inf-fab"}>
                                                                <KeyboardArrowDown/>
                                                            </Fab> :
                                                            <Fab onClick={this.handleClick.bind(this, information.id)}
                                                                 size="small"
                                                                 className={"inf-fab"}>
                                                                <KeyboardArrowUp/>
                                                            </Fab>
                                                        }
                                                        <span className={"pointer"} onClick={this.getStaticContent.bind(this, information.id)} >{information.title}</span>
                                                    </p>
                                                    <p className={"description"}>{information.description}</p>

                                                </div>

                                                    <Collapse className={"information-resource"}
                                                              in={this.isOpen(information.id)} timeout="auto" unmountOnExit>
                                                                {information.InformationResources.map((resource) => (

                                                                    <div  key={uuid()}>
                                                                        <p onClick={this.changeContent.bind(this, resource)}>
                                                                            <IconButton aria-label="delete" size="medium">
                                                                                {resource.type === "image" ?
                                                                                    <ImageOutlined className={"inf-icon"}/> :
                                                                                    resource.type === "video" ?
                                                                                        < VideocamOutlined  className={"inf-icon"}/> :
                                                                                        <PictureAsPdfOutlined  className={"inf-icon"}/>}
                                                                            </IconButton>
                                                                            {resource.title}
                                                                        </p>
                                                                    </div>

                                                            )
                                                        )}
                                                        </Collapse>

                                            </div>
                                        </div>
                                    )
                                })}
                            </List>
                        </Paper>
                    </div>
                </Zoom>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(Information));
