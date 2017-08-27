import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import {
    news_Enum,
    location_Area_Enum
} from '../../../EnumScript/GeneralEnumScript';
import classnames from 'classnames';
import {
    GetData,
    Get_Sys_Language,
} from './Location_General';


//刪除與檢視共用
class Location_Delete extends Component {

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
        this.Get_Sys_Language();
        this.GetData();
    }


    GetData() {
        const self = this;

        axios({
            url: `/api/Location/GetLocation?id=${this.props.match.params.id}`,
            method: 'GET',
            data: {
            }
        }).then((result) => {
            self.setState({
                viewModel: result.data
            });
        }).catch((error) => {
            console.log(error)
        });

    }


    Title() {
        return this.state.is_Delete ?
            "刪除服務據點" :
            "檢視服務據點";
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
        axios.post(`/api/Location/Delete/${this.state.viewModel.id}`, {
        }).then((result) => {
            if (result.data.success) {
                history.push('/Location');
            }
        }).catch((error) => {
            console.log(error)
        });


        event.preventDefault();
        return false;
    }

    Button_BackUp(event) {
        history.push('/Location');
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


                                    <DropDownList name="languageId"
                                        labelName="語言"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '語言 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].languageId}
                                        readOnly={true}
                                        placeholder="languageId"
                                        disabled={true}
                                        options={
                                            [].concat({
                                                name: sys.name,
                                                value: sys.id,
                                            })
                                        }  />


                                    <TextInput name="name"
                                        labelName="內容"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_name}
                                        required={this.props.required_name}
                                        validMessage={{ required: '內容 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].name}
                                        readOnly={true}
                                        placeholder="name" />

                                    <TextInput name="address"
                                        labelName="內容"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '內容 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].address}
                                        readOnly={true}
                                        placeholder="address" />

                                    <TextInput name="description"
                                        labelName="內容"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '內容 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].description}
                                        readOnly={true}
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
                                            labelName="系統流水號"
                                            className=""
                                            display={this.props.display_id}
                                            required={this.props.required_id}
                                            validMessage={{ required: '系統流水號 is reduired.' }}
                                            value={this.state.viewModel.id}
                                            readOnly={true}
                                            placeholder="id" />



                                        <TextInput name="listImage"
                                            labelName="列表圖片"
                                            className=""
                                            display={this.props.display_listImage}
                                            required={this.props.required_listImage}
                                            validMessage={{ required: '列表圖片 is reduired.' }}
                                            value={this.state.viewModel.listImage}
                                            readOnly={true}
                                            placeholder="listImage" />


                                        <TextInput name="country"
                                            labelName="國家"
                                            className=""
                                            display={this.props.display_country}
                                            required={this.props.required_country}
                                            validMessage={{ required: '國家 is reduired.' }}
                                            value={this.state.viewModel.country}
                                            readOnly={true}
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
                                            disabled={true}
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
                                            value={this.state.viewModel.phone}
                                            readOnly={true}
                                            placeholder="phone" />

                                        <TextInput name="fax"
                                            labelName="傳真"
                                            className=""
                                            display={this.props.display_fax}
                                            required={this.props.required_fax}
                                            validMessage={{ required: '傳真 is reduired.' }}
                                            value={this.state.viewModel.fax}
                                            readOnly={true}
                                            placeholder="fax" />

                                        <TextInput name="mobile"
                                            labelName="手機"
                                            className=""
                                            display={this.props.display_mobile}
                                            required={this.props.required_mobile}
                                            validMessage={{ required: '手機 is reduired.' }}
                                            value={this.state.viewModel.mobile}
                                            readOnly={true}
                                            placeholder="mobile" />

                                        <TextInput name="latitude"
                                            labelName="經度"
                                            className=""
                                            display={this.props.display_latitude}
                                            required={this.props.required_latitude}
                                            validMessage={{ required: '經度 is reduired.' }}
                                            value={this.state.viewModel.latitude}
                                            readOnly={true}
                                            placeholder="latitude" />


                                        <TextInput name="longitude"
                                            labelName="緯度"
                                            className=""
                                            display={this.props.display_longitude}
                                            required={this.props.required_longitude}
                                            validMessage={{ required: '緯度 is reduired.' }}
                                            value={this.state.viewModel.longitude}
                                            readOnly={true}
                                            placeholder="longitude" />

                                        <TextInput name="priority"
                                            labelName="列表排序"
                                            className=""
                                            display={this.props.display_priority}
                                            required={this.props.required_priority}
                                            validMessage={{ required: '列表排序 is reduired.' }}
                                            value={this.state.viewModel.priority}
                                            readOnly={true}
                                            placeholder="priority" />


                                        <DropDownList name="status"
                                            labelName="status"
                                            display={this.props.display_status}
                                            required={this.props.required_status}
                                            validMessage={{ required: 'status is reduired.' }}
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
                                                    },
                                                    {
                                                        name: news_Enum.DELETE.name,
                                                        value: news_Enum.DELETE.value
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


export default EasyForm(Location_Delete, 2);

Location_Delete.defaultProps = {

    display_id: false,

    display_listImage: true,
    display_country: true,
    display_area: true,
    display_phone: true,
    display_fax: true,
    display_mobile: true,
    display_latitude: true,
    display_longitude: true,
    display_priority: true,


    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_updateDate: true,
    display_updateUser: true,

    /* */
    required_id: true,

    required_listImage: true,
    required_country: true,
    required_area: true,
    required_phone: true,
    required_fax: true,
    required_mobile: true,
    required_latitude: true,
    required_longitude: true,
    required_priority: true,


    required_status: true,
    required_createDate: true,
    required_createUser: true,
    required_updateDate: true,
    required_updateUser: true,
}