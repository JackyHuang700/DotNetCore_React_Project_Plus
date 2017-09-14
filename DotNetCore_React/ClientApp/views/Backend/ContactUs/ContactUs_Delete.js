import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import { news_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import {
    GetData,
} from './ContactUs_General';

//刪除與檢視共用
class ContactUs_Delete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_Delete: this.props.match.params.delete.toLocaleLowerCase() === "true" ? true : false,

            viewModel: {},
        };

        this.GetData = GetData.bind(this);
        this.Button_Submit = this.Button_Submit.bind(this);

        //
        this.Title = this.Title.bind(this);
        this.Button_Text = this.Button_Text.bind(this);
        this.Button_Click = this.Button_Click.bind(this);
    }


    componentDidMount() {
        this.GetData();
    }

    Title() {
        return this.state.is_Delete ?
            "刪除聯絡我們" :
            "檢視聯絡我們";
    }


    //觸發事件
    Button_Text() {
        return this.state.is_Delete ?
            "確認刪除" :
            "返回";
    }

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



    Button_Submit(event) {
        axios.post(`/api/ContactUs/Delete/${this.state.viewModel.id}`, {
        }).then((result) => {
            if (result.data.success) {
                history.push('/ContactUs');
            }
        }).catch((error) => {
            console.log(error)
        });


        event.preventDefault();
        return false;
    }

    Button_BackUp(event) {
        history.goBack();
    }

    render() {
        return (
            <div className="animated fadeIn row justify-content-center">
                <div className="col-xl-10">
                    <div className="card">
                        <div className="card-header">
                            {this.Title()}
                        </div>
                        <div className="card-block">
                            <form action="" method="post">

                                <table className="table table-striped table-bordered">
                                    <tbody>
                                        <input type="hidden" id="id" name="id" value={this.state.viewModel.id} />

                                        <TextInput name="id"
                                            labelName="系統流水號"
                                            className=""
                                            display={this.props.display_id}
                                            required={this.props.required_id}
                                            validMessage={{ required: '系統流水號 is reduired.' }}
                                            value={this.state.viewModel.id}
                                            readOnly={true}
                                            placeholder="id" />

                                        <TextInput name="title"
                                            labelName="標題"
                                            className=""
                                            display={this.props.display_title}
                                            required={this.props.required_title}
                                            validMessage={{ required: '標題 is reduired.' }}
                                            value={this.state.viewModel.title}
                                            readOnly={true}
                                            placeholder="title" />




                                        <TextInput name="categoryId"
                                            labelName="類別"
                                            className=""
                                            display={this.props.display_categoryId}
                                            required={this.props.required_categoryId}
                                            validMessage={{ required: '類別 is reduired.' }}
                                            value={this.state.viewModel.categoryId}
                                            readOnly={true}
                                            placeholder="categoryId" />




                                        <TextInput name="customerName"
                                            labelName="客戶姓名"
                                            className=""
                                            display={this.props.display_customerName}
                                            required={this.props.required_customerName}
                                            validMessage={{ required: '客戶姓名 is reduired.' }}
                                            value={this.state.viewModel.customerName}
                                            readOnly={true}
                                            placeholder="customerName" />




                                        <TextInput name="customerEmail"
                                            labelName="客戶Email"
                                            className=""
                                            display={this.props.display_customerEmail}
                                            required={this.props.required_customerEmail}
                                            validMessage={{ required: '客戶Email is reduired.' }}
                                            value={this.state.viewModel.customerEmail}
                                            readOnly={true}
                                            placeholder="customerEmail" />



                                        <TextInput name="content"
                                            labelName="內容"
                                            className=""
                                            display={this.props.display_content}
                                            required={this.props.required_content}
                                            validMessage={{ required: '內容 is reduired.' }}
                                            value={this.state.viewModel.content}
                                            readOnly={true}
                                            placeholder="content" />



                                        <TextInput name="mobile"
                                            labelName="客戶手機"
                                            className=""
                                            display={this.props.display_mobile}
                                            required={this.props.required_mobile}
                                            validMessage={{ required: '客戶手機 is reduired.' }}
                                            value={this.state.viewModel.mobile}
                                            readOnly={true}
                                            placeholder="mobile" />



                                        <TextInput name="reply"
                                            labelName="回覆內容"
                                            className=""
                                            display={this.props.display_reply}
                                            required={this.props.required_reply}
                                            validMessage={{ required: '回覆內容 is reduired.' }}
                                            value={this.state.viewModel.reply}
                                            readOnly={true}
                                            placeholder="reply" />



                                        <TextInput name="replyDate"
                                            labelName="回覆時間"
                                            className=""
                                            display={this.props.display_replyDate}
                                            required={this.props.required_replyDate}
                                            validMessage={{ required: '回覆時間 is reduired.' }}
                                            value={this.state.viewModel.replyDate}
                                            readOnly={true}
                                            placeholder="replyDate" />



                                        <TextInput name="replyUser"
                                            labelName="回覆者"
                                            className=""
                                            display={this.props.display_replyUser}
                                            required={this.props.required_replyUser}
                                            validMessage={{ required: '回覆者 is reduired.' }}
                                            value={this.state.viewModel.replyUser}
                                            readOnly={true}
                                            placeholder="replyUser" />


                                        <DropDownList name="status"
                                            labelName="狀態"
                                            display={this.props.display_status}
                                            required={this.props.required_status}
                                            validMessage={{ required: '狀態 is reduired.' }}
                                            value={this.state.viewModel.status}
                                            readOnly={true}
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

                                    </tbody>
                                </table>

                                <div className="form-group form-actions">
                                    <button type="botton" className="btn btn-sm btn-danger" onClick={this.Button_Click}>{this.Button_Text()}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default EasyForm(ContactUs_Delete, 2);

ContactUs_Delete.defaultProps = {

    display_id: false,
    display_title: false,
    display_categoryId: false,
    display_customerName: true,
    display_customerEmail: true,
    display_content: true,
    display_mobile: false,
    display_reply: true,
    display_replyDate: true,
    display_replyUser: true,
    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_updateDate: true,
    display_updateUser: true,

    /* */
    required_id: true,
    required_title: true,
    required_categoryId: true,
    required_customerName: true,
    required_customerEmail: true,
    required_content: true,
    required_mobile: true,
    required_reply: true,
    required_replyDate: true,
    required_replyUser: true,
    required_status: true,
    required_createDate: true,
    required_createUser: true,
    required_updateDate: true,
    required_updateUser: true,
}



// id
// title
// categoryId
// customerName
// customerEmail
// content
// mobile
// reply
// replyDate
// replyUser
// status
// createDate
// createUser
// updateDate
// updateUser
