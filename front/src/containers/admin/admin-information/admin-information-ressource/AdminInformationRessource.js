import React , { Component } from 'react' ;
import axios from "axios";
import baseURL from "../../../../utils/baseURL";
import AdminInformationUpdateRessource from "./admin-information-update-ressource/AdminInformationUpdateRessource";
import AdminInformationDeleteRessource from "./admin-information-delete-ressource/AdminInformationDeleteRessource";
import {DeleteOutline, Update} from "@material-ui/icons";



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

            <table>
                <tr>
                    <th>التغييرات</th>
                    <th>المحتوى</th>
                    <th>نوع المحتوى</th>
                    <th>العنوان</th>
                </tr>
                {this.state.information_resources.map((information_resource) => (
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

export default AdminInformationRessource ;
