import React, {useState , useEffect } from 'react' ;
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import axios from 'axios'
import baseURL from "../../../../utils/baseURL" ;
import MyBackdrop from "../../../../components/backdrop/MyBackdrop";
import Snachbar from "../../../../components/snackbar/Snackbar";

function AdminUpdateInformation(props) {

    // backdrop state
    const [openbackdrop, setOpenbackdrop] = useState(false);

    // alert state
    const [open , setOpen] = useState(false) ;
    const [message , setMessage] = useState('') ;
    const [status , setStatus] = useState('success');

    // information state
    const [title, setTitle] = useState( '' );
    const [description, setDescription] = useState(  '');

    const handleSnackbarClose = () => {
        setOpen(false) ;
    } ;

    useEffect(() => {
        setTitle(props.data  ? props.data.title : '') ;
        setDescription(props.data ? props.data.description : '' ) ;
    } , [props.data]);

    const handleUpdate= () => {
        setOpenbackdrop(true);
        let information = {
            id : props.data.id ,
            title : title  ,
            description : description ,
        };
        axios.put(baseURL + "informations" , information)
            .then(res => {
                props.updateTable("update" , information);
                props.close();
                setOpen(true) ;
                setMessage( "Modification effectué avec succès") ;
                setStatus("success");
                setOpenbackdrop(false);
            })
            .catch(err => {
                console.log(err);
                setOpen(true) ;
                setMessage( "Erreur lors de la modification") ;
                setStatus("error");
                setOpenbackdrop(false);
            })
    };

    return  <div>
                <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Information</DialogTitle>
                    <DialogContent>
                        <form  noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="title"
                                        label="Title"
                                        name="title"
                                        autoComplete="title"
                                        autoFocus
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="description"
                                        label="Description"
                                        id="description"
                                        autoComplete="description"
                                        value={ description }
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.close} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
                <MyBackdrop open={openbackdrop} />
                <Snachbar message={message}  open={open} status={status} close={handleSnackbarClose}/>

            </div>
}

export default AdminUpdateInformation ;
