
import React, { Component } from 'react';
import { ButtonToolbar, FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import CKEditor from '../../Components/Forms/CKEditor';
import Dropzone from 'react-dropzone';
import FileUpload2 from '../../Components/Forms/FileUpload3';

import { news_Enum } from '../../../EnumScript/GeneralEnumScript';
import classnames from 'classnames';
import { Get_Sys_Language } from '../Sys_Language/Sys_Language_General.js';
import {
    HandleInputChange,
    HandleInputChange_By_LanList,
    Add_ImageList,
} from './Product_General';

class Product_Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewModel: {
                lanList: [],
                imageList: [],
              
                priority: "1",
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
        this.Get_Sys_Language = Get_Sys_Language.bind(this);
        this.HandleInputChange = HandleInputChange.bind(this);
        this.HandleInputChange_By_LanList = HandleInputChange_By_LanList.bind(this);
        this.Component_Nav = this.Component_Nav.bind(this);
    }

    componentDidMount() {
        this.Get_Sys_Language();
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
            url: '/api/Product/Create',
            method: 'post',
            data: this.state.viewModel
        }).then((result) => {
            if (result.data.success) {
                if (self.state.next_Button) {
                    window.location.reload()
                } else {
                    history.push('/Product');
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
                                         onInput={this.HandleInputChange_By_LanList}
                                        value={this.state.viewModel.lanList[`${index}`].languageId}
                                        placeholder="languageId" />


                                    <TextInput name="title"
                                        labelName="標題"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_title}
                                        required={this.props.required_title}
                                        validMessage={{ required: '標題 is reduired.' }}
                                         onInput={this.HandleInputChange_By_LanList}
                                        value={this.state.viewModel.lanList[`${index}`].title}
                                        placeholder="title" />


                                    <TextInput name="subTitle"
                                        labelName="副標題"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_subTitle}
                                        required={this.props.required_subTitle}
                                        validMessage={{ required: '副標題 is reduired.' }}
                                         onInput={this.HandleInputChange_By_LanList}
                                        value={this.state.viewModel.lanList[`${index}`].subTitle}
                                        placeholder="subTitle" />




                                    <TextInput name="name"
                                        labelName="名稱"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_name}
                                        required={this.props.required_name}
                                        validMessage={{ required: '名稱 is reduired.' }}
                                         onInput={this.HandleInputChange_By_LanList}
                                        value={this.state.viewModel.lanList[`${index}`].name}
                                        placeholder="name" />


                                    <TextInput name="content"
                                        labelName="內容"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '內容 is reduired.' }}
                                         onInput={this.HandleInputChange_By_LanList}
                                        value={this.state.viewModel.lanList[`${index}`].content}
                                        placeholder="content" />


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
                        <div className="card-header">建立產品</div>
                        <div className="card-block">
                            <form className="" onSubmit={this.Submit}>

                                <table className="table table-striped table-bordered">
                                    <tbody>

                                        <TextInput name="id"
                                            labelName="系統流水號"
                                            className=""
                                            display={this.props.display_id}
                                            required={this.props.required_id}
                                            validMessage={{ required: '系統流水號 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.id}
                                            placeholder="id" />



                                        <TextInput name="listImage"
                                            labelName="列表圖片"
                                            className=""
                                            display={this.props.display_listImage}
                                            required={this.props.required_listImage}
                                            validMessage={{ required: '列表圖片 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.listImage}
                                            placeholder="listImage" />



                                        <TextInput name="priority"
                                            labelName="列表排序"
                                            className=""
                                            display={this.props.display_priority}
                                            required={this.props.required_priority}
                                            validMessage={{ required: '列表排序 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.priority}
                                            placeholder="priority" />




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




                                        <tr>
                                            <td className="col-xs-4 text-right">
                                                <label className="text-right" style={{ color: this.props.required_listImage && 'red' }}> 上傳圖片 {this.props.required_listImage && '*'} </label>

                                            </td>
                                            <td className="col-xs-8" >
                                                <img src={this.state.viewModel.listImage} className="img-preview img-thumbnail" />
                                            </td>
                                        </tr>

                                        <FileUpload2 HandleInputChange={this.HandleInputChange} Add_ImageList={Add_ImageList.bind(this)} />


                                        {this.Component_Nav()}
                                    </tbody>
                                </table>

                                <div className="form-group form-actions">
                                    <ButtonToolbar>
                                        <Button color="primary" id="btn" disabled={$invalid ? 'disabled' : false}>確認</Button>
                                        {'\u00A0'}
                                        <Button color="primary" onClick={this.Next_Button.bind(this)} disabled={$invalid ? 'disabled' : false}>繼續新增下一筆</Button>
                                        {'\u00A0'}
                                        <Button color="warning" onClick={() => history.goBack()}>返回</Button>                                    </ButtonToolbar>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EasyForm(Product_Create, 2);

Product_Create.defaultProps = {

    display_id: false,
    display_listImage: true,
    display_priority: true,
    display_status: true,

    /* */
    required_id: false,
    required_listImage: false,
    required_priority: true,
    required_status: true,
}

