import React, {useState} from 'react' ;
import axios from "axios";
import baseURL from "../../../../utils/baseURL";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MyBackdrop from "../../../../components/backdrop/MyBackdrop";
import Snachbar from "../../../../components/snackbar/Snackbar";


function AdminDeleteLibrary(props) {
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
        axios.delete(baseURL +"libraries/" + props.data)
            .then(res => {
                props.updateTable("delete" , props.data)
                props.close();
                setOpen(true) ;
                setMessage( "تم الحذف بنجاح") ;
                setStatus("success");
                setOpenbackdrop(false);
            })
            .catch(err => {
                console.error(err);
                setOpen(true) ;
                setMessage( "حدث خطأ أثناء الحذف") ;
                setStatus("error");
                setOpenbackdrop(false);
            })
    };

    return <div>
        <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={"title"}>حذف مكتبة</DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} className={"popup-btn"}>
                    الغاء
                </Button>
                <Button onClick={handleDelete}  className={"popup-btn" }>
                    حذف
                </Button>
            </DialogActions>
        </Dialog>
        <MyBackdrop open={openbackdrop} />
        <Snachbar message={message}  open={open} status={status} close={handleSnackbarClose}/>
    </div>

}

export default AdminDeleteLibrary ;
