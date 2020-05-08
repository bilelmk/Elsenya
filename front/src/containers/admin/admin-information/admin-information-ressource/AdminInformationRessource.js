import React , { Component } from 'react' ;
import axios from "axios";
import baseURL from "../../../../utils/baseURL";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {makeStyles} from "@material-ui/core/styles";

import AdminInformationUpdateRessource from "./admin-information-update-ressource/AdminInformationUpdateRessource";
import AdminInformationDeleteRessource from "./admin-information-delete-ressource/AdminInformationDeleteRessource";


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





class AdminInformationRessource extends Component {

    state = {
        information_resources : [] ,
        isDataExist: false ,
        daleteData : {
            deleteDialogOpened : false ,
            data : null
        },
        updateData : {
            updateDialogOpened : false ,
            data : null
        },
    };

    openUpdateDialog(information_resource){
        this.setState({updateData : {updateDialogOpened : true , data : information_resource}});
    }

    closeUpdateDialog(){
        this.setState({updateData : {updateDialogOpened : false , data : null}});
    }

    openDeleteDialog(information_resource){
        this.setState({daleteData : {deleteDialogOpened : true , data : information_resource}});
    }

    closeDeleteDialog(){
        this.setState({daleteData : {deleteDialogOpened : false , data : null}});
    }

    componentDidMount() {

        // Get id from route
        let id = this.props.match.params.id ;

        axios.get(baseURL + `information-resources/${id}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    information_resources : res.data,
                    isDataExist: true
                });
            })
            .catch(err => console.log(err));
    }

    render(){
        return <div>
                <AdminInformationUpdateRessource open={this.state.updateData.updateDialogOpened}
                                        close={this.closeUpdateDialog.bind(this)}
                                        data={this.state.updateData.data}
                />

                <AdminInformationDeleteRessource open={this.state.daleteData.deleteDialogOpened}
                                        close={this.closeDeleteDialog.bind(this)}
                                        data={this.state.daleteData.data}
                />

            <TableContainer component={Paper}>
                <Table className={useStyles.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                            <StyledTableCell align="center">content</StyledTableCell>
                            <StyledTableCell align="center">الوصف</StyledTableCell>
                            <StyledTableCell align="center" >العنوان</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.information_resources.map((information_resource) => (
                            <StyledTableRow key={information_resource.id}>
                                <StyledTableCell align="center">
                                    <button onClick={this.openUpdateDialog.bind(this , information_resource)} >update</button>
                                    <button onClick={this.openDeleteDialog.bind(this , information_resource)} >delete</button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {information_resource.content}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {information_resource.type}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {information_resource.title}
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            </div>
    }
}

export default AdminInformationRessource ;
