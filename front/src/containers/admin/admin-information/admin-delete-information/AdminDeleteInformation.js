import React, {useState} from 'react' ;
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import baseURL from "../../../../utils/baseURL";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import MyBackdrop from "../../../../components/backdrop/MyBackdrop";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 9999,
        color: '#fff',
    },
}));

function AdminDeleteInformation(props) {

    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const handleDelete= () => {
        setOpenBackdrop(true);
        axios.delete(baseURL +"informations/" + props.data)
            .then(res => {
                props.updateTable("delete" , props.data)
                props.close()
                setOpenBackdrop(false);
            })
            .catch(err => {
                console.log(err)
                setOpenBackdrop(false);
            })
    };

    return <div>
                <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
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
                <MyBackdrop open={openBackdrop} />
            </div>

}

export default AdminDeleteInformation ;
