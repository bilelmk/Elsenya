import React, {Component} from "react";
import axios from "axios";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link, withRouter} from 'react-router-dom';
import baseURL from "../../utils/baseURL";

const useStyles = (theme) => ({
        root: {
            width: '80%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(30),
            fontWeight: theme.typography.fontWeightRegular,
        },
        element: {
            margin: '10px'
        }
    })
;

export class Information extends Component {
    state = {
        informations: [],
        isDataExist: false
    };

    componentDidMount() {
        axios
            .get(baseURL + "informations")
            .then(res => {
                console.log(res.data);
                this.setState({
                    informations: res.data,
                    isDataExist: true
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const {classes} = this.props;
        return (
            // <div>
            //   {this.state.resources.map(resource => (
            //     <div>
            //       <p>{resource.title}</p>
            //       {this.state.isDataExist ? (
            //         resource.type === "video" ? (
            //           <video key={resource.id} width="320" height="240" controls>
            //             <source src={resource.content} type="video/mp4" />
            //             <source src={resource.content} type="video/ogg" />
            //             Your browser does not support the video tag
            //           </video>
            //         ) : resource.type === "image" ? (
            //           <img key={resource.id} src={resource.content} alt="no image" />
            //         ) : resource.type === "pdf" ? (
            //           <iframe
            //             key={resource.id}
            //             src={resource.content + "#toolbar=0"}
            //             width="800"
            //             height="600"
            //             align="middle"
            //           ></iframe>
            //         ) : null
            //       ) : null}
            //     </div>
            //   ))}
            // </div>
            <div className={classes.root}>
                <h1>Les informations</h1>
                {this.state.informations.map(information => (
                    <ExpansionPanel className={classes.element}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{information.title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {this.props.match.params.id}
                                {information.description}
                                <br/>
                                <Link to={`/home/resources/${information.id}`}>Voir ressources</Link>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(Information));
