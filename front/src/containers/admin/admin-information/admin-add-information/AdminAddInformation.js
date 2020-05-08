import React, {useState} from 'react' ;
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import axios from 'axios'
import baseURL from "../../../../utils/baseURL";
import Snachbar from "../../../../components/snackbar/Snackbar";
import MyBackdrop from "../../../../components/backdrop/MyBackdrop";

function AdminAddInformation(props) {

    // information state
    const [title, setTitle] = useState('' );
    const [description, setDescription] = useState('');

    // backdrop state
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    // alert state
    const [open , setOpen] = React.useState(false) ;
    const [message , setMessage] = React.useState('') ;
    const [status , setStatus] = React.useState('success')

    const handleSnackbarClose = () => {
        setOpen(false) ;
    } ;

    const handleAdd = () => {
        setOpenBackdrop(true);
        let information = {
            title : title ,
            description : description
        };
        axios.post(baseURL +"informations" , information)
            .then(res => {
                props.updateTable("add" , res.data);
                props.close();
                setOpen(true) ;
                setMessage( "Ajout effectué avec succès") ;
                setStatus("success");
                setOpenBackdrop(false);
            })
            .catch(err => {
                console.log(err);
                setOpen(true) ;
                setMessage( "Erreur lors de l'ajout") ;
                setStatus("error");
                setOpenBackdrop(false);
        })

    };

    return  <div>
                <Dialog open={props.open} onClose={props.close}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Information</DialogTitle>
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
                                        value={description}
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
                        <Button onClick={handleAdd} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
                <MyBackdrop open={openBackdrop} />
                <Snachbar message={message}  open={open} status={status} close={handleSnackbarClose}/>
    </div>
}

export default AdminAddInformation ;
