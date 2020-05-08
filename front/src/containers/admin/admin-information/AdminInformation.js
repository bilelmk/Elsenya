import React, {Component} from 'react' ;
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
import {Link} from "react-router-dom";
import { Add , DeleteOutline , Update , VideoCallOutlined , VideocamOutlined } from '@material-ui/icons';

import AdminAddInformation from "./admin-add-information/AdminAddInformation";
import AdminUpdateInformation from "./admin-update-information/AdminUpdateInformation";
import AdminDeleteInformation from "./admin-delete-information/AdminDeleteInformation" ;
import AdminAddRessource from "./admin-information-ressource/admin-add-ressource/AdminAddRessource";

import "./AdminInformation.scss"

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#00adb5",
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




class AdminInformation extends Component {

    state = {
        informations : [] ,
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

    openUpdateDialog(information){
        this.setState({updateData : {updateDialogOpened : true , data : information}});
    }

    closeUpdateDialog(){
        this.setState({updateData : {updateDialogOpened : false , data : null}});
    }

    openDeleteDialog(information_id){
        this.setState({daleteData : {deleteDialogOpened : true , data : information_id}});
    }

    closeDeleteDialog(){
        this.setState({daleteData : {deleteDialogOpened : false , data : null}});
    }

    openAddRessourcesDialog(information_id){
        this.setState({addRessourcesData : {addRessourcesDialogOpened : true , data : information_id}});
    }

    closeAddRessourcesDialog(){
        this.setState({addRessourcesData : {addRessourcesDialogOpened : false , data : null}});
    }

    componentDidMount() {
        axios.get(baseURL + "informations")
            .then(res =>{
                this.setState( {informations : res.data})
            })
            .catch(err => console.log(err))
    }

    updateInformationTable(operation , data) {
        if(operation === "add"){
            this.state.informations.push(data) ;
        }

        else if(operation === "update"){
            this.state.informations.map( information => {
                if (information.id === data.id ) {
                    information.title = data.title ;
                    information.description = data.description
                }
            })
        }
        else if(operation === "delete"){
            this.state.informations.splice(
                this.state.informations.findIndex(information => {
                    return  information.id === data
                }),1
            );
        }
    }

    render ()
    {
        return<div>
            <button  className="btn" onClick={this.openAddDialog.bind(this)} >
                <Add className="icon" />
            </button>

            <AdminAddInformation open={this.state.addData.addDialogOpened}
                                 close={this.closeAddDialog.bind(this)}
                                 updateTable={this.updateInformationTable.bind(this)}
            />

            <AdminUpdateInformation open={this.state.updateData.updateDialogOpened}
                                    close={this.closeUpdateDialog.bind(this)}
                                    data={this.state.updateData.data}
                                    updateTable={this.updateInformationTable.bind(this)}
            />

            <AdminDeleteInformation open={this.state.daleteData.deleteDialogOpened}
                                    close={this.closeDeleteDialog.bind(this)}
                                    data={this.state.daleteData.data}
                                    updateTable={this.updateInformationTable.bind(this)}
            />

            <AdminAddRessource open={this.state.addRessourcesData.addRessourcesDialogOpened}
                               close={this.closeAddRessourcesDialog.bind(this)}
                               data={this.state.addRessourcesData.data}
            />




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
                        {this.state.informations.map((information) => (
                            <StyledTableRow key={information.id}>
                                <StyledTableCell align="center">

                                    <button className="btn" onClick={this.openAddRessourcesDialog.bind(this , information.id)} >
                                        <VideoCallOutlined className="icon" />
                                    </button>

                                    <button className="btn">
                                        <Link  className="link" to={`/admin/information/${information.id}`}>
                                            <VideocamOutlined className="icon" />
                                        </Link>
                                    </button>

                                    <button className="btn" onClick={this.openDeleteDialog.bind(this , information.id)} >
                                        <DeleteOutline className="icon" />
                                    </button>

                                    <button className="btn" onClick={this.openUpdateDialog.bind(this , information)} >
                                        <Update className="icon" />
                                    </button>

                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {information.description}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {information.title}
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    }
}

export default AdminInformation
