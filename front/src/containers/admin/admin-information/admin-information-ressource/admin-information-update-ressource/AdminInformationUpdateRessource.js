import React  from 'react' ;
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";


function AdminInformationUpdateRessource(props) {
   return <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Ressource</DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>

            </DialogActions>
         </Dialog>
}

export default AdminInformationUpdateRessource  ;
