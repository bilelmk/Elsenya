import React from 'react' ;
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import baseURL from "../../../../utils/baseURL";

function AdminDeleteInformation(props) {

    const handleDelete= () => {
        axios.delete(baseURL +"informations/" + props.data)
            .then(res => {
                props.close()
            })
            .catch(err => console.log(err))
    };

    return <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Information</DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
            <Button onClick={props.close} color="primary">
                Cancel
            </Button>
            <Button onClick={handleDelete} color="primary">
                Delete
            </Button>
        </DialogActions>
    </Dialog>
}

export default AdminDeleteInformation ;
