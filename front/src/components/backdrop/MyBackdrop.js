import React from 'react' ;
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 9999,
        color: '#fff',
    },
}));

function MyBackdrop(props) {

    const classes = useStyles();

    return  <Backdrop className={classes.backdrop} open={props.open} >
                <CircularProgress color="inherit" />
            </Backdrop>
}

export default MyBackdrop ;
