import React from 'react' ;
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Snachbar(props) {
    return <Snackbar open={props.open} autoHideDuration={3000} onClose={props.close}>
                <Alert onClose={props.close} severity={props.status}>
                    {props.message}
                </Alert>
            </Snackbar>
}

export default Snachbar ;
