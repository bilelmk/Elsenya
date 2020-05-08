import React, {useState} from 'react' ;
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import baseURL from "../../../../utils/baseURL";
import MyBackdrop from "../../../../components/backdrop/MyBackdrop";
import Snachbar from "../../../../components/snackbar/Snackbar";


function AdminDeleteInformation(props) {

    // backdrop state
    const [openbackdrop, setOpenbackdrop] = useState(false);

    // alert state
    const [open , setOpen] = useState(false) ;
    const [message , setMessage] = useState('') ;
    const [status , setStatus] = useState('success')

    const handleSnackbarClose = () => {
        setOpen(false) ;
    } ;

    const handleDelete= () => {
        setOpenbackdrop(true);
        axios.delete(baseURL +"informations/" + props.data)
            .then(res => {
                props.updateTable("delete" , props.data)
                props.close();
                setOpen(true) ;
                setMessage( "Suppression effectué avec succès") ;
                setStatus("success");
                setOpenbackdrop(false);
            })
            .catch(err => {
                console.log(err);
                setOpen(true) ;
                setMessage( "Erreur lors de la suppression") ;
                setStatus("error");
                setOpenbackdrop(false);
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
                <MyBackdrop open={openbackdrop} />
                <Snachbar message={message}  open={open} status={status} close={handleSnackbarClose}/>
            </div>

}

export default AdminDeleteInformation ;
