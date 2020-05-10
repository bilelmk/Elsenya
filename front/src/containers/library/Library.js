import React, {Component} from 'react';
import axios from "axios";
import baseURL from "../../utils/baseURL";
import {Resources} from "../resources/resources";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import uuid from "react-uuid";
import Fab from "@material-ui/core/Fab";
import {ImageOutlined, KeyboardArrowDown, PictureAsPdfOutlined, VideocamOutlined} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";


import "./Library.scss"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "#eeeeee",
    },
}));

class Library extends Component {
    state = {
        libraries: [],
        isDataExist: false ,
        library_resources : null ,
        open : [] ,
    };


    handleClick = (library_id) => {
        this.state.open.map(open => {
            if(open.id === library_id) {
                open.status = open.status === false;

            }
        });
        this.setState({});
    };

    changeContent(resource){
        this.setState({
            library_resources : resource ,
        })
    }

    isOpen(id){
        return this.state.open[this.state.open.findIndex(open => { return open.id === id})].status
    }

    componentDidMount() {
        axios
            .get(baseURL + "libraries")
            .then(res => {
                let open = [] ;
                res.data.map((information) => {
                    open.push({
                        id : information.id ,
                        status : false
                    })
                });
                this.setState({
                    library_resources : res.data[0] ? res.data[0].LibraryResources[0] : null ,
                    libraries: res.data,
                    isDataExist: true ,
                    open : open
                });

            })
            .catch(err => console.log(err));
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={"inf-container"} >

                <div className={"content"} >
                    <Resources  resource={this.state.library_resources}/>
                </div>

                <div  className={"liste"} >
                    <Paper style={{ height:'92vh' , overflow: 'auto' ,backgroundColor: "#222831"}}  elevation={3}>
                        <List className={classes.root}>
                            {this.state.libraries.map(library => {
                                return (
                                    <div key={uuid()}>
                                        <div className={"information"}>
                                            <div >
                                                <p className={"title"}>
                                                    <Fab onClick={this.handleClick.bind(this, library.id)} size="small"
                                                         style={{marginRight : "20px" , backgroundColor :"#00adb5" , color : "#eee"}}>
                                                        <KeyboardArrowDown />
                                                    </Fab>
                                                    {library.title}
                                                </p>
                                                <p className={"description"}>{library.description}</p>

                                            </div>
                                            <Collapse className={"information-resource"} in={this.isOpen(library.id)} timeout="auto" unmountOnExit>
                                                {library.LibraryResources.map((resource) => (
                                                        <div key={uuid()} >
                                                            <p onClick={this.changeContent.bind(this , resource)} >
                                                                <IconButton aria-label="delete"  size="medium">
                                                                    {resource.type === "image" ? <ImageOutlined style={{ color : "#eee"}}/> :
                                                                        resource.type === "video" ? < VideocamOutlined style={{ color : "#eee"}} />  :
                                                                            <PictureAsPdfOutlined style={{ color : "#eee"}} /> }
                                                                </IconButton>
                                                                {resource.title}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </Collapse>
                                        </div>
                                    </div>
                                )})}
                        </List>
                    </Paper>
                </div>
            </div>
        );
    }
}
export default withRouter(withStyles(useStyles)(Library));