import React, {useState} from 'react' ;
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import axios from 'axios'
import baseURL from "../../../../../utils/baseURL";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import MyBackdrop from "../../../../../components/backdrop/MyBackdrop";
import Snachbar from "../../../../../components/snackbar/Snackbar";
import Upload from "../../../upload/Upload";


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 9999,
        color: '#fff',
    },
}));

function AdminUpdateLibraryResource(props) {
    const classes = useStyles();
    const [description, setDescription] = useState(null);

    const [title, setTitle] = useState(null);
    const [type, setType] = useState(null);
    const [content, setContent] = useState(null);


    // alert state
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('success');

    // backdrop state
    const [openbackdrop, setOpenbackdrop] = useState(false);

    const handleSnackbarClose = () => {
        setOpen(false);
    };
    const handleUpdate = () => {
        const ressource = new FormData();
        ressource.append('id', props.data ? props.data.id : 0);

        ressource.append('title', title !== null ? title : props.data ? props.data.title : '');
        ressource.append('content', content !== null ? content : props.data ? props.data.content : '');
        ressource.append('type', type == null ? props.data.type : type);
        ressource.append('libraryId', props.data.libraryId)
        setOpenbackdrop(true);
        const resource = {
            id: props.data.id,
            title: title == null ? props.data.title : title,
            type: type == null ? props.data.type : type,
            content: content == null ? props.data.content : content

        }
        axios.put(baseURL + "library-resources", ressource)
            .then(res => {
                props.updateTable("update", resource);
                props.close();
                setOpen(true);
                setMessage("Modification effectué avec succès");
                setStatus("success");
                setOpenbackdrop(false);
            })
            .catch(err => {
                console.log(err);
                setOpen(true);
                setMessage("Erreur lors de la modification");
                setStatus("error");
                setOpenbackdrop(false);
            })
    };
    const handleInput = (type, file, valid) => {
        if (valid) {
            setContent(file);
            setType(type)
        }
    };


    return <div>
        <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Library information</DialogTitle>
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
                                value={title !== null ? title : props.data ? props.data.title : ''}
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
                                value={type !== null ? type : props.data ? props.data.type : ''}
                                onChange={e => setDescription(e.target.value)}
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
                <Button color="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
        <MyBackdrop open={openbackdrop}/>
        <Snachbar message={message} open={open} status={status} close={handleSnackbarClose}/>

    </div>

}

export default AdminUpdateLibraryResource;
