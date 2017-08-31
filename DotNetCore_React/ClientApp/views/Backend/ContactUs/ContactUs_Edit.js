
import React, { Component } from 'react';
import { ButtonToolbar, FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import CKEditor from '../../Components/Forms/CKEditor';

import { contactUs_Enum } from '../../../EnumScript/GeneralEnumScript';
import classnames from 'classnames';
import {
    GetData,
    HandleInputChange,
} from './ContactUs_General';

class ContactUs_Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewModel: {
            },

            //是否繼續為繼續下一筆
            next_Button: false,
        };

        this.Submit = this.Submit.bind(this);

        //Import
        this.GetData = GetData.bind(this);
        this.HandleInputChange = HandleInputChange.bind(this);
        this.HandleInputChange_Status = this.HandleInputChange_Status.bind(this);
    }

    componentDidMount() {
        this.GetData();
    }


    Submit(event) {
        const self = this;
        axios({
            url: '/api/ContactUs/Edit',
            method: 'post',
            data: this.state.viewModel
        }).then((result) => {
            if (result.data.success) {
                if (self.state.next_Button) {
                    window.location.reload()
                } else {
                    history.push('/ContactUs');
                }
            }
        }).catch((error) => {
            console.log(error)
        });

        event.preventDefault();
        return false;
    }


    //特規
    HandleInputChange_Status(event){
        const target = event.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        var new_News = Object.assign(this.state.viewModel);
        new_News[name] = contactUs_Enum.NOTREPLY.value;
    
        this.setState({
            viewModel: new_News,
        });
    }

    //繼續新增下一筆
    Next_Button(event) {
        this.setState({
            next_Button: true,
        });

        document.getElementById('btn').click();
    }


    render() {
        const { params } = this.props.params;
        const { $invalid } = this.props.easyform.$invalid;


        return (
            <div className="animated fadeIn row justify-content-center">
                <div className="col-xl-10">
                    <div className="card">
                        <div className="card-header">編輯聯絡我們</div>
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
                                            readOnly={true}
                                            options={this.state.viewModel.id}
                                        />



                                        <TextInput name="title"
                                            labelName="標題"
                                            display={this.props.display_title}
                                            required={this.props.required_title}
                                            validMessage={{ required: '標題 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.title}
                                            readOnly={true}
                                            options={this.state.viewModel.title}
                                        />

                                        <TextInput name="categoryId"
                                            labelName="類別"
                                            display={this.props.display_categoryId}
                                            required={this.props.required_categoryId}
                                            validMessage={{ required: '類別 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.categoryId}
                                            readOnly={true}
                                            options={this.state.viewModel.categoryList}
                                        />

                                        <TextInput name="customerName"
                                            labelName="客戶姓名"
                                            display={this.props.display_customerName}
                                            required={this.props.required_customerName}
                                            validMessage={{ required: '客戶姓名 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.customerName}
                                            readOnly={true}
                                            options={this.state.viewModel.customerName}
                                        />

                                        <TextInput name="customerEmail"
                                            labelName="客戶Email"
                                            display={this.props.display_customerEmail}
                                            required={this.props.required_customerEmail}
                                            validMessage={{ required: '客戶Email is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.customerEmail}
                                            readOnly={true}
                                            options={this.state.viewModel.customerEmail}
                                        />

                                        <TextInput name="content"
                                            labelName="內容"
                                            display={this.props.display_content}
                                            required={this.props.required_content}
                                            validMessage={{ required: '內容 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.content}
                                            readOnly={true}
                                            options={this.state.viewModel.content}
                                        />

                                        <DropDownList name="status"
                                            labelName="狀態"
                                            display={this.props.display_status}
                                            required={this.props.required_status}
                                            validMessage={{ required: '狀態 is reduired.' }}
                                            onChange={this.HandleInputChange_Status}
                                            value={this.state.viewModel.status}
                                            options={
                                                [
                                                    {
                                                        name: contactUs_Enum.NOTREPLY.name,
                                                        value: contactUs_Enum.NOTREPLY.value
                                                    },
                                                    {
                                                        name: contactUs_Enum.REPLY.name,
                                                        value: contactUs_Enum.REPLY.value
                                                    },
                                                    {
                                                        name: contactUs_Enum.UNREPLY.name,
                                                        value: contactUs_Enum.UNREPLY.value
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

                                        <TextInput name="reply"
                                            labelName="回覆內容"
                                            display={this.props.display_reply}
                                            required={this.props.required_reply}
                                            validMessage={{ required: '回覆內容 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.reply}
                                            options={this.state.viewModel.reply}
                                        />

                                    </tbody>
                                </table>

                                <div className="form-group form-actions">
                                    <ButtonToolbar>
                                        <Button color="primary" id="btn" disabled={$invalid ? 'disabled' : false}>確認</Button>
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

export default EasyForm(ContactUs_Edit, 2);

ContactUs_Edit.defaultProps = {



    display_id: true,
    display_title: true,
    display_categoryId: true,
    display_customerName: true,
    display_customerEmail: true,
    display_content: true,
    display_mobile: true,
    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_reply: true,



    /* */
    required_id: true,
    required_title: true,
    required_categoryId: true,
    required_customerName: true,
    required_customerEmail: true,
    required_content: true,
    required_mobile: true,
    required_status: true,
    required_createDate: true,
    required_createUser: true,
    required_reply: true,
}

