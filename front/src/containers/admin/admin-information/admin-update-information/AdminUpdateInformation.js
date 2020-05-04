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

function AdminUpdateInformation(props) {

    const [title, setTitle] = useState( '' );
    const [description, setDescription] = useState( '');

    const handleUpdate= () => {
        let information = {
            title : title !== '' ? title : props.data.title ,
            description : description !== '' ? description : props.data.description ,
        };
        axios.put(baseURL + "informations/" + props.data.id , information)
            .then(res => {
                props.close()
            })
            .catch(err => console.log(err))
    };

    return <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
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
                            value={title ? title : props.data ? props.data.title : ''}
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
                            value={description ? description : props.data ? props.data.description : ''}
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
}

export default AdminUpdateInformation ;
