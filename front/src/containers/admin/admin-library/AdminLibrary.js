import React, {Component} from 'react'
import axios from 'axios'
import baseURL from "./../../../utils/baseURL";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import AdminAddLibrary from "./admin-add-library/AdminAddLibrary";
import AdminUpdateLibrary from "./admin-update-library/AdminUpdateLibrary";
import AdminDeleteLibrary from "./admin-delete-library/AdminDeleteLibrary";



const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});



class AdminLibrary extends Component {

    state = {
        libraries : [] ,
        addData : {
            addDialogOpened : false
        },
        updateData : {
            updateDialogOpened : false ,
            data : null
        },
        daleteData : {
            deleteDialogOpened : false ,
            data : null
        },
        addRessourcesData : {
            addRessourcesDialogOpened : false ,
            data : null
        }
    };

    openAddDialog(){
        this.setState({addData : {addDialogOpened : true }});
    }

    closeAddDialog(){
        this.setState({addData : {addDialogOpened : false }});
    }

    openUpdateDialog(library){
        this.setState({updateData : {updateDialogOpened : true , data : library}});
    }

    closeUpdateDialog(){
        this.setState({updateData : {updateDialogOpened : false , data : null}});
    }

    openDeleteDialog(library_id){
        this.setState({daleteData : {deleteDialogOpened : true , data : library_id}});
    }

    closeDeleteDialog(){
        this.setState({daleteData : {deleteDialogOpened : false , data : null}});
    }

    openAddRessourcesDialog(library_id){
        this.setState({addRessourcesData : {addRessourcesDialogOpened : true , data : library_id}});
    }

    closeAddRessourcesDialog(){
        this.setState({addRessourcesData : {addRessourcesDialogOpened : false , data : null}});
    }

    componentDidMount() {
        axios.get(baseURL + "libraries")
            .then(res =>{
                console.log(res)
                this.setState( {libraries : res.data})
            })
            .catch(err => console.log(err))
    }

    render ()
    {
        return  <div>
            <button onClick={this.openAddDialog.bind(this)} >add</button>

            <AdminAddLibrary open={this.state.addData.addDialogOpened}
                                 close={this.closeAddDialog.bind(this)}
            />

            <AdminUpdateLibrary open={this.state.updateData.updateDialogOpened}
                                    close={this.closeUpdateDialog.bind(this)}
                                    data={this.state.updateData.data}
            />

            <AdminDeleteLibrary open={this.state.daleteData.deleteDialogOpened}
                                    close={this.closeDeleteDialog.bind(this)}
                                    data={this.state.daleteData.data}
            />

            {/*<AdminAddRessource open={this.state.addRessourcesData.addRessourcesDialogOpened}*/}
            {/*                   close={this.closeAddRessourcesDialog.bind(this)}*/}
            {/*                   data={this.state.addRessourcesData.data}*/}
            {/*/>*/}

            <TableContainer component={Paper}>
                <Table className={useStyles.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                            <StyledTableCell align="center">الوصف</StyledTableCell>
                            <StyledTableCell align="center" >العنوان</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.libraries.map((library) => (
                            <StyledTableRow key={library.id}>
                                <StyledTableCell align="center">
                                    {/*<button onClick={this.openAddRessourcesDialog.bind(this , library.id)} >add ressources</button>*/}
                                    <button onClick={this.openUpdateDialog.bind(this , library)} >update</button>
                                    <button onClick={this.openDeleteDialog.bind(this , library.id)} >delete</button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {library.description}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {library.title}
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    }



}

export default AdminLibrary
