import React, {Component} from 'react';
import axios from "axios";
import baseURL from "../../utils/baseURL";
import {Resources} from "../resources/resources";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import uuid from "react-uuid";
import Fab from "@material-ui/core/Fab";
import {
    ImageOutlined,
    KeyboardArrowDown,
    KeyboardArrowUp,
    PictureAsPdfOutlined,
    VideocamOutlined
} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";


import "./Library.scss"
import Zoom from 'react-reveal/Zoom';

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
            <div className={"lib-container"} >

                <div className={"lib-content"} >
                    <Zoom><Resources  resource={this.state.library_resources}/></Zoom>
                </div>
                <Zoom>
                <div  className={"liste"} >
                    <Paper className={"liste-poper"}  elevation={3}>
                        <List className={classes.root}>
                            {this.state.libraries.map(library => {
                                return (
                                    <div key={uuid()}>
                                        <div className={"information"}>
                                            <div >
                                                <p className={"lib-title"}>
                                                    { !this.isOpen(library.id) ?
                                                        <Fab onClick={this.handleClick.bind(this, library.id)} size="small"
                                                             className={"lib-fab"}>
                                                            <KeyboardArrowDown />
                                                        </Fab> :
                                                        <Fab onClick={this.handleClick.bind(this, library.id)} size="small"
                                                             className={"lib-fab"}>
                                                            <KeyboardArrowUp />
                                                        </Fab>
                                                    }
                                                    {library.title}
                                                </p>
                                                <p className={"description"}>{library.description}</p>

                                            </div>
                                            <Collapse className={"lib-resource"} in={this.isOpen(library.id)} timeout="auto" unmountOnExit>
                                                {library.LibraryResources.map((resource) => (
                                                        <div key={uuid()} >
                                                            <p onClick={this.changeContent.bind(this , resource)} >
                                                                <IconButton aria-label="delete"  size="medium">
                                                                    {resource.type === "image" ? <ImageOutlined className={"lib-icon"} /> :
                                                                        resource.type === "video" ? < VideocamOutlined className={"lib-icon"} />  :
                                                                            <PictureAsPdfOutlined className={"lib-icon"} /> }
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
                </Zoom>
            </div>
        );
    }
}
export default withRouter(withStyles(useStyles)(Library));
