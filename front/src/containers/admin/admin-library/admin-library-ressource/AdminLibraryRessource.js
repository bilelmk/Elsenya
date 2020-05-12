import React, {Component} from 'react' ;
import axios from "axios";
import baseURL from "../../../../utils/baseURL";
import AdminUpdateLibraryResource from './admin-update-library-resource/AdminUpdateLibraryResource';
import AdminDeleteLibraryResource from './admin-delete-library-resource/AdminDeleteLibraryResource';
import {DeleteOutline, Update} from "@material-ui/icons";

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

            <table>
                <tr>
                    <th>التغييرات</th>
                    <th>المحتوى</th>
                    <th>نوع المحتوى</th>
                    <th>العنوان</th>
                </tr>
                {this.state.library_resources.map((information_resource) => (
                    <tr key={information_resource.id}>
                        <td>
                            <button className="btn" onClick={this.openDeleteDialog.bind(this , information_resource)}>
                                <DeleteOutline className="icon"/>
                            </button>

                            {/*<button className="btn" onClick={this.openDeleteDialog.bind(this , information_resource)}>*/}
                            {/*    <Update className="icon"/>*/}
                            {/*</button>*/}
                        </td>
                        <td>
                            {information_resource.content}
                        </td>
                        <td>
                            {information_resource.type}
                        </td>
                        <td>
                            {information_resource.title}
                        </td>
                    </tr>
                ))}
            </table>

        </div>
    }
}

export default AdminLibraryRessource;
