import React, {Component} from 'react' ;
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

import AdminUpdateLibraryResource from './admin-update-library-resource/AdminUpdateLibraryResource';
import AdminDeleteLibraryResource from './admin-delete-library-resource/AdminDeleteLibraryResource';
import AdminAddLibrary from "../admin-add-library/AdminAddLibrary";
import {DeleteOutline, Update} from "@material-ui/icons";

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


class AdminLibraryRessource extends Component {


    state = {
        library_resources: [],
        isDataExist: false,
        daleteData: {
            deleteDialogOpened: false,
            data: null
        },
        updateData: {
            updateDialogOpened: false,
            data: null
        },
    };

    openUpdateDialog(information_resource) {
        this.setState({updateData: {updateDialogOpened: true, data: information_resource}});
    }

    closeUpdateDialog() {
        this.setState({updateData: {updateDialogOpened: false, data: null}});
    }

    openDeleteDialog(information_resource) {
        this.setState({daleteData: {deleteDialogOpened: true, data: information_resource}});
    }

    closeDeleteDialog() {
        this.setState({daleteData: {deleteDialogOpened: false, data: null}});
    }

    componentDidMount() {

        // Get id from route
        let id = this.props.match.params.id;

        axios.get(baseURL + `library-resources/${id}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    library_resources: res.data,
                    isDataExist: true
                });
            })
            .catch(err => console.log(err));
    }

    updateInformationTable(operation, data) {
        console.error(data)

        if (operation === "add") {
            this.state.library_resources.push(data);
        } else if (operation === "update") {
            this.state.library_resources.map(library => {
                if (library.id === data.id) {
                    library.title = data.title;
                    library.type=data.type;
                    if (typeof data.content === 'string' || data.content instanceof String){

                        let list=data.content.split("/")
                        library.content=list[list.length-1]
                    }
                    else library.content=data.content.name

                }
            })
        } else if (operation === "delete") {
            this.state.library_resources.splice(
                this.state.library_resources.findIndex(library => {
                    return library.id === data
                }), 1
            );
        }
    }

    render() {
        return <div>
            <AdminUpdateLibraryResource open={this.state.updateData.updateDialogOpened}
                                        close={this.closeUpdateDialog.bind(this)}
                                        data={this.state.updateData.data}
                                        updateTable={this.updateInformationTable.bind(this)}

            />

            <AdminDeleteLibraryResource open={this.state.daleteData.deleteDialogOpened}
                                        close={this.closeDeleteDialog.bind(this)}
                                        data={this.state.daleteData.data}
                                        updateTable={this.updateInformationTable.bind(this)}

            />

            <TableContainer component={Paper}>
                <Table className={useStyles.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                            <StyledTableCell align="center">content</StyledTableCell>
                            <StyledTableCell align="center">الوصف</StyledTableCell>
                            <StyledTableCell align="center">العنوان</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.library_resources.map((information_resource) => (
                            <StyledTableRow key={information_resource.id}>
                                <StyledTableCell align="center">
                                    <button className="btn" onClick={this.openUpdateDialog.bind(this, information_resource)}>
                                        <Update className="icon"/>

                                    </button>
                                    <button className="btn" onClick={this.openDeleteDialog.bind(this, information_resource)}>
                                        <DeleteOutline className="icon"/>

                                    </button>
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

export default AdminLibraryRessource;
