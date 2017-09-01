
import React, { Component } from 'react';
import { ButtonToolbar, FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import CKEditor from '../../Components/Forms/CKEditor';
import FileUpload from '../../Components/Forms/FileUpload';
import ImgThumbnail from '../../Components/Forms/ImgThumbnail';

import { news_Enum } from '../../../EnumScript/GeneralEnumScript';
import classnames from 'classnames';
import { Get_Sys_Language } from '../Sys_Language/Sys_Language_General.js';
import {
    GetData,
    HandleInputChange,
    HandleInputChange_By_LanList,
    Add_ImageList,
    Del_ImageList
} from './Product_General';

class Product_Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewModel: {
                lanList: [],
                categoryList: [],
                categoryId: "",
                status: news_Enum.NORMAL.value,

            },
            Sys_Language_List: [],
            imageList: [],
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
        this.HandleInputChange_By_LanList = HandleInputChange_By_LanList.bind(this);
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
      //轉換imageList
      let data = this.state.viewModel;
      data.listImage = this.state.imageList;
        axios({
            url: '/api/Product/Edit',
            method: 'post',
            data: data
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
                        <div className="card-header">編輯產品</div>
                        <div className="card-block">
                            <form className="" onSubmit={this.Submit}>

                                <table className="table table-striped table-bordered">
                                    <tbody>
{/* 
                                        <TextInput name="listImage"
                                            labelName="列表圖片"
                                            className=""
                                            display={this.props.display_listImage}
                                            required={this.props.required_listImage}
                                            validMessage={{ required: '列表圖片 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.listImage}
                                            placeholder="listImage" /> */}


                                        <tr>
                                            <td className="col-xs-4 text-right">
                                                <label className="text-right" style={{ color: this.props.required_listImage && 'red' }}> 列表圖片 {this.props.required_listImage && '*'} </label>

                                            </td>
                                            <td className="col-xs-8" >
                                            {
                                              this.state.imageList &&
                                                this.state.imageList.map(c => {
                                                 return(<ImgThumbnail 
                                                    src={c.image}
                                                    alt={c.description} 
                                                    className="img-preview img-thumbnail" 
                                                    delImageEvent={Del_ImageList.bind(this)} />)
                                                })
                                            }
                                          </td>
                                        </tr>
                    
                                        <FileUpload
                                          Add_ImageList={Add_ImageList.bind(this)}
                                          postUrl={"/api/News/Upload_Pic/"}
                                        />
                    



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


                                        <TextInput name="createDate"
                                            labelName="建立時間"
                                            className=""
                                            display={this.props.display_createDate}
                                            required={this.props.required_createDate}
                                            validMessage={{ required: '建立時間 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.createDate}
                                            readOnly={true}
                                            placeholder="createDate" />

                                        <TextInput name="createUser"
                                            labelName="建立者"
                                            className=""
                                            display={this.props.display_createUser}
                                            required={this.props.required_createUser}
                                            validMessage={{ required: '建立者 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.createUser}
                                            readOnly={true}
                                            placeholder="createUser" />

                                        <TextInput name="updateDate"
                                            labelName="更新時間"
                                            className=""
                                            display={this.props.display_updateDate}
                                            required={this.props.required_updateDate}
                                            validMessage={{ required: '更新時間 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.updateDate}
                                            readOnly={true}
                                            placeholder="updateDate" />

                                        <TextInput name="updateUser"
                                            labelName="更新者"
                                            className=""
                                            display={this.props.display_updateUser}
                                            required={this.props.required_updateUser}
                                            validMessage={{ required: '更新者 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.updateUser}
                                            readOnly={true}
                                            placeholder="updateUser" />





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

export default EasyForm(Product_Edit, 2);

Product_Edit.defaultProps = {

    display_listImage: false,
    display_priority: true,
    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_updateDate: false,
    display_updateUser: false,


    /* */
    required_listImage: false,
    required_priority: true,
    required_status: true,
    required_createDate: false,
    required_createUser: false,
    required_updateDate: false,
    required_updateUser: false,
}
