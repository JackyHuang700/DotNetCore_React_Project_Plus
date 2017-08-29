import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import { news_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import classnames from 'classnames';
import {Get_Sys_Language} from '../Sys_Language/Sys_Language_General.js'; 
import {
    GetData,
} from './Product_Category_General';


//刪除與檢視共用
class Product_Category_Delete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_Delete: this.props.match.params.delete.toLocaleLowerCase() === "true" ? true : false,

            viewModel: {
                lanList: [],
            },
            Sys_Language_List: [],
            activeTab: '0',
        };

        this.GetData = GetData.bind(this);
        this.Button_Submit = this.Button_Submit.bind(this);

        //
        this.toggle = this.toggle.bind(this);        
        this.Get_Sys_Language = Get_Sys_Language.bind(this);
        this.Title = this.Title.bind(this);
        this.Button_Text = this.Button_Text.bind(this);
        this.Button_Click = this.Button_Click.bind(this);
        this.Component_Nav = this.Component_Nav.bind(this);
    }


    componentDidMount() {
        this.GetData();
    }


    Title() {
        return this.state.is_Delete ?
            "刪除產品類別" :
            "檢視產品類別";
    }


    //觸發事件
    Button_Text() {
        return this.state.is_Delete ?
            "確認刪除" :
            "返回";
    }

    //��觸發事件
    Button_Click(event) {
        if (this.state.is_Delete) {
            this.Button_Submit(event);
        }
        else {
            this.Button_BackUp(event);
        }
        event.preventDefault();
        return false;
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    Button_Submit(event) {
        axios.post(`/api/Product_Category/Delete/${this.state.viewModel.id}`, {
        }).then((result) => {
            if (result.data.success) {
                history.push('/Product_Category');
            }
        }).catch((error) => {
            console.log(error)
        });


        event.preventDefault();
        return false;
    }

    Button_BackUp(event) {
        history.push('/Product_Category');
    }


    //語系元件
    Component_Nav() {

        return (
            <td colSpan="2">
                <Nav tabs>
                    {
                        this.state.Sys_Language_List.map((sys, index) => {
                            return (
                                <NavItem>

                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === `${index}` })}
                                        onClick={() => { this.toggle(`${index}`); }}>
                                        <i className="icon-calculator"></i> {sys.name}
                                    </NavLink>
                                </NavItem>

                            );
                        })
                    }
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    {
                        this.state.Sys_Language_List.map((sys, index) => {


                            return (
                                <TabPane tabId={`${index}`}>


                                    <TextInput name="languageId"
                                        labelName="內容"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '內容 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].languageId}
                                        readOnly={true}
                                        placeholder="languageId" />


                                    <TextInput name="name"
                                        labelName="名稱"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_name}
                                        required={this.props.required_name}
                                        validMessage={{ required: '名稱 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].name}
                                        readOnly={true}
                                        placeholder="name" />



                                </TabPane>
                            )
                        })
                    }
                </TabContent>
            </td>
        );


    }


    render() {
        return (
            <div className="animated fadeIn row justify-content-center">
                <div className="col-xs-10">
                    <div className="card">
                        <div className="card-header">
                            {this.Title()}
                        </div>
                        <div className="card-block">
                            <form action="" method="post">

                                <table className="table table-striped table-bordered">
                                    <tbody>


                                        <TextInput name="id"
                                            labelName="id"
                                            display={this.props.display_id}
                                            required={this.props.required_id}
                                            validMessage={{ required: 'id is reduired.' }}
                                            readOnly={true}
                                            value={this.state.viewModel.id}
                                        />


                                        <TextInput name="priority"
                                            labelName="priority"
                                            display={this.props.display_priority}
                                            required={this.props.required_priority}
                                            validMessage={{ required: 'priority is reduired.' }}
                                            value={this.state.viewModel.priority}
                                            readOnly={true}
                                        />


                                        <TextInput name="status"
                                            labelName="status"
                                            display={this.props.display_status}
                                            required={this.props.required_status}
                                            validMessage={{ required: 'status is reduired.' }}
                                            value={this.state.viewModel.status}
                                            readOnly={true}
                                        />



                                        <TextInput name="createDate"
                                            labelName="建立時間"
                                            className=""
                                            display={this.props.display_createDate}
                                            required={this.props.required_createDate}
                                            validMessage={{ required: '建立時間 is reduired.' }}
                                            value={this.state.viewModel.createDate}
                                            readOnly={true}
                                            placeholder="createDate" />

                                        <TextInput name="createUser"
                                            labelName="建立者"
                                            className=""
                                            display={this.props.display_createUser}
                                            required={this.props.required_createUser}
                                            validMessage={{ required: '建立者 is reduired.' }}
                                            value={this.state.viewModel.createUser}
                                            readOnly={true}
                                            placeholder="createUser" />

                                        <TextInput name="updateDate"
                                            labelName="更新時間"
                                            className=""
                                            display={this.props.display_updateDate}
                                            required={this.props.required_updateDate}
                                            validMessage={{ required: '更新時間 is reduired.' }}
                                            value={this.state.viewModel.updateDate}
                                            readOnly={true}
                                            placeholder="updateDate" />

                                        <TextInput name="updateUser"
                                            labelName="更新者"
                                            className=""
                                            display={this.props.display_updateUser}
                                            required={this.props.required_updateUser}
                                            validMessage={{ required: '更新者 is reduired.' }}
                                            value={this.state.viewModel.updateUser}
                                            readOnly={true}
                                            placeholder="updateUser" />

                                        {this.Component_Nav()}


                                    </tbody>
                                </table>

                                <div className="form-group form-actions">
                                    <button type="botton" className="btn btn-sm btn-danger" onClick={this.Button_Click}>{this.Button_Text()}</button>
                                    {'\u00A0'}
                                    <Button color="warning" onClick={() => history.goBack()}>返回</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default EasyForm(Product_Category_Delete, 2);

Product_Category_Delete.defaultProps = {
    display_id: false,
    display_priority: true,
    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_updateDate: false,
    display_updateUser: false,

    /* */
    required_id: false,
    required_priority: false,
    required_status: false,
    required_createDate: false,
    required_createUser: false,
    required_updateDate: false,
    required_updateUser: false,
    
}


// id
// priority
// status


