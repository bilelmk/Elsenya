import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { withRouter} from 'react-router-dom';
import "./InformationResource.scss"

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

    render() {
        return (
            <div >
                  {this.props.resource ? (
                      this.props.resource.type === "video" ? (
                      <video width="100%"  controls>
                        <source src={this.props.resource.content} type="video/mp4" />
                        <source src={this.props.resource.content} type="video/ogg" />
                        Your browser does not support the video tag
                      </video>
                    ) : this.props.resource.type === "image" ? (
                      <img className={"ressource-img"}  src={this.props.resource.content} alt="no image" />
                    ) : this.props.resource.type === "pdf" ? (
                      <iframe
                        src={this.props.resource.content+"#toolbar=0"}
                        align="middle"
                        width="100%"
                        height="850px"
                      >
                      </iframe>
                      ) : null
                  ) : <p>no data</p>}
                </div>
        );
    }
}

export default withRouter(withStyles(useStyles) (Resources));
