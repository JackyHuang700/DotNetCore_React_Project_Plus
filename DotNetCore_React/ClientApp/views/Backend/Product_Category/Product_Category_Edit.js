
import React, { Component } from 'react';
import { ButtonToolbar, FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import CKEditor from '../../Components/Forms/CKEditor';
import Dropzone from 'react-dropzone';

import { news_Enum } from '../../../EnumScript/GeneralEnumScript';
import classnames from 'classnames';
import { Get_Sys_Language } from '../Sys_Language/Sys_Language_General.js';
import {
    GetData,
    HandleInputChange,
    HandleInputChange_LanList,
} from './Product_Category_General';

class Product_Category_Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewModel: {
                lanList: [],
                categoryList: [],
                status: news_Enum.NORMAL.value,

            },
            Sys_Language_List: [],

            //是否繼續為繼續下一筆
            next_Button: false,
            activeTab: '0',
        };

        this.Submit = this.Submit.bind(this);
        this.toggle = this.toggle.bind(this);

        //Import
        this.GetData = GetData.bind(this);
        this.Get_Sys_Language = Get_Sys_Language.bind(this);
        this.HandleInputChange = HandleInputChange.bind(this);
        this.HandleInputChange_LanList = HandleInputChange_LanList.bind(this);
        this.Component_Nav = this.Component_Nav.bind(this);
    }

    componentDidMount() {
        this.GetData();
    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    Submit(event) {
        const self = this;
        axios({
            url: '/api/Product_Category/Edit',
            method: 'post',
            data: this.state.viewModel
        }).then((result) => {
            if (result.data.success) {
                if (self.state.next_Button) {
                    window.location.reload()
                } else {
                    history.push('/Product_Category');
                }
            }
        }).catch((error) => {
            console.log(error)
        });

        event.preventDefault();
        return false;
    }

    //繼續新增下一筆
    Next_Button(event) {
        this.setState({
            next_Button: true,
        });

        document.getElementById('btn').click();
    }

    //語系元件
    Component_Nav() {
        var self = this;
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


                                    <DropDownList name="languageId"
                                        labelName="語言"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '語言 is reduired.' }}
                                        onInput={this.HandleInputChange_By_LanList}
                                        value={this.state.viewModel.lanList[`${index}`].languageId}
                                        placeholder="languageId"
                                        options={
                                            [].concat({
                                                name: sys.name,
                                                value: sys.id,
                                            })
                                        } />


                                    <TextInput name="name"
                                        labelName="內容"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_name}
                                        required={this.props.required_name}
                                        validMessage={{ required: '內容 is reduired.' }}
                                        onInput={this.HandleInputChange_LanList}
                                        value={this.state.viewModel.lanList[`${index}`].name}
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
        const { params } = this.props.params;
        const { $invalid } = this.props.easyform.$invalid;


        return (
            <div className="animated fadeIn row justify-content-center">
                <div className="col-xl-10">
                    <div className="card">
                        <div className="card-header">編輯產品類別</div>
                        <div className="card-block">
                            <form className="" onSubmit={this.Submit}>

                                <table className="table table-striped table-bordered">
                                    <tbody>


                                        <TextInput name="id"
                                            labelName="系統流水號"
                                            display={this.props.display_id}
                                            required={this.props.required_id}
                                            validMessage={{ required: '系統流水號 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.id}
                                            options={this.state.viewModel.id}
                                        />


                                        <TextInput name="priority"
                                            labelName="列表排序"
                                            display={this.props.display_priority}
                                            required={this.props.required_priority}
                                            validMessage={{ required: '列表排序 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.priority}
                                            options={this.state.viewModel.priority}
                                        />

                                        <DropDownList name="status"
                                            labelName="狀態"
                                            display={this.props.display_status}
                                            required={this.props.required_status}
                                            validMessage={{ required: '狀態 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.status}
                                            options={
                                                [
                                                    {
                                                        name: news_Enum.STOP.name,
                                                        value: news_Enum.STOP.value
                                                    },
                                                    {
                                                        name: news_Enum.NORMAL.name,
                                                        value: news_Enum.NORMAL.value
                                                    }
                                                ]}
                                        />



                                        <TextInput name="createDate"
                                            labelName="建立時間"
                                            display={this.props.display_createDate}
                                            required={this.props.required_createDate}
                                            validMessage={{ required: '建立時間 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.createDate}
                                            readOnly={true}
                                            options={this.state.viewModel.createDate}
                                        />



                                        <TextInput name="createUser"
                                            labelName="建立者"
                                            display={this.props.display_createUser}
                                            required={this.props.required_createUser}
                                            validMessage={{ required: '建立者 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.createUser}
                                            readOnly={true}
                                            options={this.state.viewModel.createUser}
                                        />



                                        <TextInput name="updateDate"
                                            labelName="更新時間"
                                            display={this.props.display_updateDate}
                                            required={this.props.required_updateDate}
                                            validMessage={{ required: '更新時間 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.updateDate}
                                            readOnly={true}
                                            options={this.state.viewModel.updateDate}
                                        />


                                        <TextInput name="updateUser"
                                            labelName="更新者"
                                            display={this.props.display_updateUser}
                                            required={this.props.required_updateUser}
                                            validMessage={{ required: '更新者 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.updateUser}
                                            readOnly={true}
                                            options={this.state.viewModel.updateUser}
                                        />

                                        {this.Component_Nav()}
                                    </tbody>
                                </table>

                                <div className="form-group form-actions">
                                <ButtonToolbar>
                                    <Button color="primary" disabled={$invalid ? 'disabled' : false} >完成</Button>
                                    {'\u00A0'}
                                    <Button color="warning" onClick={() => history.goBack()}>返回</Button>
                                </ButtonToolbar>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EasyForm(Product_Category_Edit, 2);

Product_Category_Edit.defaultProps = {



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
    required_status: true,
    required_createDate: false,
    required_createUser: false,
    required_updateDate: false,
    required_updateUser: false,

}

