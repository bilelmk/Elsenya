import React, { Component } from "react";
import axios from "axios";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link,withRouter} from 'react-router-dom';
import baseURL from "../../utils/baseURL";

const useStyles = (theme) => ({
    root: {
        width: '80%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

export class Resources extends Component {
    state = {
        resources: [],
        isDataExist: false
    };

    componentDidMount() {
        let id=this.props.match.params.id
        axios
            .get(baseURL + `resources/${id}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    resources: res.data,
                    isDataExist: true
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;
        return (

            <div>
                <h1>Les resources de l'information {this.props.match.params.id}</h1>
              {this.state.resources.map(resource => (
                <div>
                  <p>{resource.title}</p>
                  {this.state.isDataExist ? (
                    resource.type === "video" ? (
                      <video key={resource.id} width="320" height="240" controls>
                        <source src={resource.content} type="video/mp4" />
                        <source src={resource.content} type="video/ogg" />
                        Your browser does not support the video tag
                      </video>
                    ) : resource.type === "image" ? (
                      <img key={resource.id} src={resource.content} alt="no image" />
                    ) : resource.type === "pdf" ? (
                      <iframe
                        key={resource.id}
                        src={resource.content + "#toolbar=0"}
                        width="800"
                        height="600"
                        align="middle"
                      ></iframe>
                    ) : null
                  ) : null}
                </div>
              ))}
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles) (Resources));
