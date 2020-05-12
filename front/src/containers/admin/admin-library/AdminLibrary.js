import React, {Component} from 'react'
import axios from 'axios'
import baseURL from "./../../../utils/baseURL";
import AdminAddLibrary from "./admin-add-library/AdminAddLibrary";
import AdminUpdateLibrary from "./admin-update-library/AdminUpdateLibrary";
import AdminDeleteLibrary from "./admin-delete-library/AdminDeleteLibrary";
import {Add, DeleteOutline, Update, VideoCallOutlined, VideocamOutlined} from '@material-ui/icons';
import './AdminLibrary.scss';
import {Link} from "react-router-dom";
import AdminAddLibraryInformationRessource from "./admin-library-ressource/admin-add-library-information-resource/AdminAddLibraryInformationResource";

class AdminLibrary extends Component {

    state = {
        libraries: [],
        addData: {
            addDialogOpened: false
        },
        updateData: {
            updateDialogOpened: false,
            data: null
        },
        daleteData: {
            deleteDialogOpened: false,
            data: null
        },
        addRessourcesData: {
            addRessourcesDialogOpened: false,
            data: null
        }
    };

    openAddDialog() {
        this.setState({addData: {addDialogOpened: true}});
    }

    closeAddDialog() {
        this.setState({addData: {addDialogOpened: false}});
    }

    openUpdateDialog(library) {
        this.setState({updateData: {updateDialogOpened: true, data: library}});
    }

    closeUpdateDialog() {
        this.setState({updateData: {updateDialogOpened: false, data: null}});
    }

    openDeleteDialog(library_id) {
        this.setState({daleteData: {deleteDialogOpened: true, data: library_id}});
    }

    closeDeleteDialog() {
        this.setState({daleteData: {deleteDialogOpened: false, data: null}});
    }

    openAddRessourcesDialog(library_id) {
        this.setState({addRessourcesData: {addRessourcesDialogOpened: true, data: library_id}});
    }

    closeAddRessourcesDialog() {
        this.setState({addRessourcesData: {addRessourcesDialogOpened: false, data: null}});
    }

    componentDidMount() {
        axios.get(baseURL + "libraries")
            .then(res => {
                this.setState({libraries: res.data})
            })
            .catch(err => console.log(err))
    }

    updateInformationTable(operation, data) {
        if (operation === "add") {
            this.state.libraries.push(data);
        } else if (operation === "update") {
            this.state.libraries.map(library => {
                if (library.id === data.id) {
                    library.title = data.title;
                    library.description = data.description
                }
            })
        } else if (operation === "delete") {
            this.state.libraries.splice(
                this.state.libraries.findIndex(library => {
                    return library.id === data
                }), 1
            );
        }
    }

    render() {
        return <div>
            <button className="btn" onClick={this.openAddDialog.bind(this)}><Add className="icon"/></button>

            <AdminAddLibrary open={this.state.addData.addDialogOpened}
                             close={this.closeAddDialog.bind(this)}
                             updateTable={this.updateInformationTable.bind(this)}
            />

            <AdminUpdateLibrary open={this.state.updateData.updateDialogOpened}
                                close={this.closeUpdateDialog.bind(this)}
                                data={this.state.updateData.data}
                                updateTable={this.updateInformationTable.bind(this)}
            />

            <AdminDeleteLibrary open={this.state.daleteData.deleteDialogOpened}
                                close={this.closeDeleteDialog.bind(this)}
                                data={this.state.daleteData.data}
                                updateTable={this.updateInformationTable.bind(this)}
            />

            <AdminAddLibraryInformationRessource open={this.state.addRessourcesData.addRessourcesDialogOpened}
                                                 close={this.closeAddRessourcesDialog.bind(this)}
                                                 data={this.state.addRessourcesData.data}
                                                 updateTable={this.updateInformationTable.bind(this)}
            />



            <table>
                <tr>
                    <th>التغييرات</th>
                    <th>الوصف</th>
                    <th>العنوان</th>
                </tr>
                {this.state.libraries.map((library) => (
                    <tr key={library.id}>
                        <td>
                            <button className="btn" onClick={this.openAddRessourcesDialog.bind(this, library.id)}>
                                <VideoCallOutlined className="icon"/>
                            </button>

                            <button className="btn">
                                <Link className="link" to={`/admin/admin-library/${library.id}`}>
                                    <VideocamOutlined className="icon"/>
                                </Link>
                            </button>

                            <button className="btn" onClick={this.openDeleteDialog.bind(this, library.id)}>
                                <DeleteOutline className="icon"/>
                            </button>

                            <button className="btn" onClick={this.openUpdateDialog.bind(this, library)}>
                                <Update className="icon"/>
                            </button>
                        </td>

                        <td>
                            {library.description}
                        </td>
                        <td>
                            {library.title}
                        </td>
                    </tr>
                ))}
            </table>

        </div>

    }


}

export default AdminLibrary
