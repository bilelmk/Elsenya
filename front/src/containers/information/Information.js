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
import {
    KeyboardArrowDown,
    ImageOutlined,
    VideocamOutlined,
    PictureAsPdfOutlined,
    KeyboardArrowUp
} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';


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
        isLoading:false
    };


    handleClick = (information_id) => {
        this.state.open.map(open => {
            if (open.id === information_id) {
                open.status = open.status === false;

            }
        });
        this.setState({});
    };

    changeContent(resource) {
        this.setState({
            information_resources: resource,
        })
    }

    isOpen(id) {
        return this.state.open[this.state.open.findIndex(open => {
            return open.id === id
        })].status
    }

    componentDidMount() {
        this.setState({isLoading:true})
        axios
            .get(baseURL + "informations")
            .then(res => {
                let open = [];

                res.data.map((information) => {
                    open.push({
                        id: information.id,
                        status: false
                    })
                });
                this.setState({
                    information_resources: res.data[0] ? res.data[0].InformationResources[0] : null,
                    informations: res.data,
                    isDataExist: true,
                    open: open,
                    isLoading:false
                });

            })
            .catch(err =>         this.setState({isLoading:false})
            );
    }

    // getStatus(id) {
    //     return this.statethis.state.open.findIndex( op =>{
    //             return op.id === id
    //         }
    //
    //     )
    //
    // }

    render() {
        const {classes} = this.props;
        return (
            <div className={"inf-container"}>

                <div className={"content"}>
                    <Resources resource={this.state.information_resources} isLoading={this.state.isLoading}/>
                </div>

                <div className={"liste"}>
                    <Paper style={{height: '92vh', overflow: 'auto', backgroundColor: "#222831"}} elevation={3}>
                        <List className={classes.root}>
                            {this.state.informations.map(information => {
                                return (
                                    <div key={uuid()}>
                                        <div className={"information"}>
                                            <div>
                                                <p className={"inf-title"}>
                                                    {!this.isOpen(information.id) ?
                                                        <Fab onClick={this.handleClick.bind(this, information.id)}
                                                             size="small"
                                                             style={{
                                                                 marginRight: "20px",
                                                                 backgroundColor: "#93deff",
                                                                 color: "#323643"
                                                             }}>
                                                            <KeyboardArrowDown/>
                                                        </Fab> :
                                                        <Fab onClick={this.handleClick.bind(this, information.id)}
                                                             size="small"
                                                             style={{
                                                                 marginRight: "20px",
                                                                 backgroundColor: "#93deff",
                                                                 color: "#323643"
                                                             }}>
                                                            <KeyboardArrowUp/>
                                                        </Fab>
                                                    }
                                                    {information.title}
                                                </p>
                                                <p className={"description"}>{information.description}</p>

                                            </div>
                                            <Collapse className={"information-resource"}
                                                      in={this.isOpen(information.id)} timeout="auto" unmountOnExit>
                                                {information.InformationResources.map((resource) => (
                                                        <div key={uuid()}>
                                                            <p onClick={this.changeContent.bind(this, resource)}>
                                                                <IconButton aria-label="delete" size="medium">
                                                                    {resource.type === "image" ?
                                                                        <ImageOutlined style={{color: "#eee"}}/> :
                                                                        resource.type === "video" ?
                                                                            < VideocamOutlined style={{color: "#eee"}}/> :
                                                                            <PictureAsPdfOutlined style={{color: "#eee"}}/>}
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
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(Information));
