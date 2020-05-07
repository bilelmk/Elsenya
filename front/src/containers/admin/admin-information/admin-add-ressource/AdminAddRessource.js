import React, {useState} from 'react' ;
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";

import Upload from "../../upload/Upload";
import axios from 'axios'
import baseURL from "../../../../utils/baseURL";

function AdminAddRessource(props) {

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [content, setContent] = useState('');

    const handleInput = (type ,file , valid) => {
        if(valid){
            setContent(file);
            setType(type)
        }
    };

    const handleAdd = () => {
        const ressource = new FormData() ;
        ressource.append('title' , title) ;
        ressource.append('content' , content) ;
        ressource.append('type' , type) ;
        ressource.append('informationId' , props.data)
        axios.post(baseURL + "resources" , ressource)
            .then(res => {
                console.log(res);
                props.close()
            })
            .catch(err => console.log(err))
    };

    return <Dialog open={props.open} onClose={props.close}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Ressource</DialogTitle>
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
                        <Upload onInput={handleInput} type="video" />
                        <Upload onInput={handleInput} type="image" />
                        <Upload onInput={handleInput} type="pdf" />
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
}

export default AdminAddRessource ;