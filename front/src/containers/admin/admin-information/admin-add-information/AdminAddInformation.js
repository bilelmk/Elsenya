import React, {useEffect, useState} from 'react' ;
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
import "../AdminInformation.scss"

function AdminAddInformation(props) {

    // information state
    const [title, setTitle] = useState('' );
    const [description, setDescription] = useState('');

    // backdrop state
    const [openbackdrop, setOpenbackdrop] = useState(false);

    // alert state
    const [open , setOpen] = useState(false) ;
    const [message , setMessage] = useState('') ;
    const [status , setStatus] = useState('success') ;

    useEffect(() => {
        setTitle( '') ;
        setDescription( '' ) ;
    } , [props]);

    const handleSnackbarClose = () => {
        setOpen(false) ;
    } ;

    const handleAdd = () => {
        setOpenbackdrop(true);
        let information = {
            title : title ,
            description : description
        };
        axios.post(baseURL +"informations" , information)
            .then(res => {
                props.updateTable("add" , res.data);
                props.close();
                setOpen(true) ;
                setMessage( "تم الإضافة بنجاح") ;
                setStatus("success");
                setOpenbackdrop(false);
            })
            .catch(err => {
                setOpen(true) ;
                setMessage( "خطأ في الإضافة") ;
                setStatus("error");
                setOpenbackdrop(false);
        })

    };

    return  <div >
                <Dialog open={props.open} onClose={props.close}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" className={"title"}>اضافة معلومات</DialogTitle>
                    <DialogContent className={"margin-top"}>
                        <form  noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        dir="rtl"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="title"
                                        label="العنوان"
                                        name="title"
                                        autoComplete="title"
                                        autoFocus
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        dir="rtl"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="description"
                                        label="الوصف"
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
                        <Button onClick={props.close} className={"popup-btn"}>
                            الغاء
                        </Button>
                        <Button onClick={handleAdd}  className={["popup-btn" , "margin-right"]}>
                            اضافة
                        </Button>
                    </DialogActions>
                </Dialog>
                <MyBackdrop open={openbackdrop} />
                <Snachbar message={message}  open={open} status={status} close={handleSnackbarClose}/>
    </div>
}

export default AdminAddInformation ;
