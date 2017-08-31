
import React, { Component } from 'react';
import { ButtonToolbar, FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import CKEditor from '../../Components/Forms/CKEditor';

import {
    news_Enum,
    location_Area_Enum
} from '../../../EnumScript/GeneralEnumScript';
import classnames from 'classnames';
import {Get_Sys_Language} from '../Sys_Language/Sys_Language_General.js'; 
import {
    HandleInputChange,
    HandleInputChange_By_LanList,
    HandleInputChange_By_LanList_CKEditor,
} from './Location_General';

class Location_Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewModel: {
                priority: "1",
                lanList: [],
                categoryList: [],
                categoryId: "",

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
        this.HandleInputChange_By_LanList_CKEditor = HandleInputChange_By_LanList_CKEditor.bind(this);
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
            url: '/api/Location/Create',
            method: 'post',
            data: this.state.viewModel
        }).then((result) => {
            if (result.data.success) {
                if (self.state.next_Button) {
                    window.location.reload()
                } else {
                    history.push('/Location');
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
        const self = this;
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
                                        labelName="標題"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_name}
                                        required={this.props.required_name}
                                        validMessage={{ required: '標題 is reduired.' }}
                                        onInput={this.HandleInputChange_By_LanList}
                                        value={this.state.viewModel.lanList[`${index}`].name}
                                        placeholder="name" />

                                    <TextInput name="address"
                                        labelName="地址"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '地址 is reduired.' }}
                                        onInput={this.HandleInputChange_By_LanList}
                                        value={this.state.viewModel.lanList[`${index}`].address}
                                        placeholder="address" />

                                    <CKEditor name="description"
                                        labelName="店家描述"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '店家描述 is reduired.' }}
                                        onInput={this.HandleInputChange_By_LanList_CKEditor}
                                        value={this.state.viewModel.lanList[`${index}`].description}
                                        cols="100"
                                        rows="6"
                                        placeholder="description" />

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
                        <div className="card-header">編輯關於我們</div>
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


                                        <TextInput name="country"
                                            labelName="國家"
                                            className=""
                                            display={this.props.display_country}
                                            required={this.props.required_country}
                                            validMessage={{ required: '國家 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.country}
                                            placeholder="country" />


                                        <DropDownList name="area"
                                            labelName="區域"
                                            className=""
                                            display={this.props.display_area}
                                            required={this.props.required_area}
                                            validMessage={{ required: '區域 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.area}
                                            placeholder="area"
                                            options={
                                                [
                                                    {
                                                        name: location_Area_Enum.TAIPEI.name,
                                                        value: location_Area_Enum.TAIPEI.value
                                                    },
                                                    {
                                                        name: location_Area_Enum.TAICHUNG.name,
                                                        value: location_Area_Enum.TAICHUNG.value
                                                    },
                                                    {
                                                        name: location_Area_Enum.TAINAN.name,
                                                        value: location_Area_Enum.TAINAN.value
                                                    }
                                                ]} />


                                        <TextInput name="phone"
                                            labelName="電話"
                                            className=""
                                            display={this.props.display_phone}
                                            required={this.props.required_phone}
                                            validMessage={{ required: '電話 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.phone}
                                            placeholder="phone" />

                                        <TextInput name="fax"
                                            labelName="傳真"
                                            className=""
                                            display={this.props.display_fax}
                                            required={this.props.required_fax}
                                            validMessage={{ required: '傳真 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.fax}
                                            placeholder="fax" />

                                        <TextInput name="mobile"
                                            labelName="手機"
                                            className=""
                                            display={this.props.display_mobile}
                                            required={this.props.required_mobile}
                                            validMessage={{ required: '手機 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.mobile}
                                            placeholder="mobile" />

                                        <TextInput name="latitude"
                                            labelName="經度"
                                            className=""
                                            display={this.props.display_latitude}
                                            required={this.props.required_latitude}
                                            validMessage={{ required: '經度 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.latitude}
                                            placeholder="latitude" />


                                        <TextInput name="longitude"
                                            labelName="緯度"
                                            className=""
                                            display={this.props.display_longitude}
                                            required={this.props.required_longitude}
                                            validMessage={{ required: '緯度 is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.longitude}
                                            placeholder="longitude" />

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
                                                    },
                                                    {
                                                        name: news_Enum.DELETE.name,
                                                        value: news_Enum.DELETE.value
                                                    }
                                                ]}
                                        />




                                        {this.Component_Nav()}
                                    </tbody>
                                </table>

                                <div className="form-group form-actions">
                                    <ButtonToolbar>
                                        <Button color="primary" id="btn" disabled={$invalid ? 'disabled' : false}>確認</Button>
                                        {'\u00A0'}
                                        <Button color="primary" onClick={this.Next_Button.bind(this)} disabled={$invalid ? 'disabled' : false}>繼續新增下一筆</Button>
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

export default EasyForm(Location_Create, 2);

Location_Create.defaultProps = {


    display_id: false,
    display_listImage: false,
    display_country: false,
    display_area: true,
    display_phone: true,
    display_fax: true,
    display_mobile: false,
    display_latitude: true,
    display_longitude: true,
    display_priority: true,
    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_updateDate: true,
    display_updateUser: true,

    /* */
    required_id: false,
    required_listImage: false,
    required_country: false,
    required_area: true,
    required_phone: false,
    required_fax: false,
    required_mobile: false,
    required_latitude: false,
    required_longitude: false,
    required_priority: true,
    required_status: true,
    required_createDate: true,
    required_createUser: true,
    required_updateDate: true,
    required_updateUser: true,
}
