import React, {useState} from 'react' ;
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";

import Upload from "../../../upload/Upload";
import axios from 'axios'
import baseURL from "../../../../../utils/baseURL";
import MyBackdrop from "../../../../../components/backdrop/MyBackdrop";
import Snachbar from "../../../../../components/snackbar/Snackbar";

function AdminAddLibraryInformationRessource(props) {

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [content, setContent] = useState('');


    // backdrop state
    const [openbackdrop, setOpenbackdrop] = useState(false);

    // alert state
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('success');


    const handleSnackbarClose = () => {
        setOpen(false);
    };

    const handleInput = (type, file, valid) => {
        if (valid) {
            setContent(file);
            setType(type)
        }
    };

    const handleAdd = () => {
        const ressource = new FormData();
        ressource.append('title', title);
        ressource.append('content', content);
        ressource.append('type', type);
        ressource.append('libraryId', props.data)
        axios.post(baseURL + "library-resources", ressource)
            .then(res => {
                props.close();
                setOpen(true);
                setMessage("Ajout effectué avec succès");
                setStatus("success");
                setOpenbackdrop(false);
            })
            .catch(err => {
                setOpen(true);
                setMessage("Erreur lors de l'ajout");
                setStatus("error");
                setOpenbackdrop(false);
            })
    };

    return(
    <div>
        <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Ressource</DialogTitle>
            <DialogContent>
                <form noValidate>
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
                            <Upload onInput={handleInput} type="video"/>
                            <Upload onInput={handleInput} type="image"/>
                            <Upload onInput={handleInput} type="pdf"/>
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
        <MyBackdrop open={openbackdrop}/>
        <Snachbar message={message} open={open} status={status} close={handleSnackbarClose}/>
    </div>)
}

export default AdminAddLibraryInformationRessource;
