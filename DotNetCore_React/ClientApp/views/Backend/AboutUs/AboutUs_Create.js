
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
import {
    HandleInputChange,
    Get_Sys_Language,
    Get_AboutUs_Category,
    HandleInputChange_By_AboutUs_LanList,
} from './AboutUs_General';


class AboutUs_Create extends Component {

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

            //是否繼續為繼續下一筆
            next_Button: false,
            activeTab: '0',
        };

        this.Submit = this.Submit.bind(this);
        this.toggle = this.toggle.bind(this);

        //Import
        this.Get_Sys_Language = Get_Sys_Language.bind(this);
        this.Get_AboutUs_Category = Get_AboutUs_Category.bind(this);
        this.HandleInputChange = HandleInputChange.bind(this);
        this.HandleInputChange_By_AboutUs_LanList = HandleInputChange_By_AboutUs_LanList.bind(this);
        this.Component_Nav = this.Component_Nav.bind(this);
    }

    componentDidMount() {
        this.Get_Sys_Language();
        this.Get_AboutUs_Category();
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
            url: '/api/AboutUs/Create',
            method: 'post',
            data: this.state.viewModel
        }).then((result) => {
            if (result.data.success) {
                if (self.state.next_Button) {
                    window.location.reload()
                } else {
                    history.push('/AboutUs');
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

                            //填入語系ID
                            { this.state.viewModel.lanList[index].languageId = sys.id }

                            return (
                                <TabPane tabId={`${index}`}>



                                    <TextInput name="content"
                                        labelName="內容"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '內容 is reduired.' }}
                                        onInput={this.HandleInputChange_By_AboutUs_LanList}
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
                <div className="col-xs-10">
                    <div className="card">
                        <div className="card-header">建立關於我們</div>
                        <div className="card-block">
                            <form className="" onSubmit={this.Submit}>

                                <table className="table table-striped table-bordered">
                                    <tbody>

                                        <DropDownList name="categoryId"
                                            labelName="categoryId"
                                            display={this.props.display_categoryId}
                                            required={this.props.required_categoryId}
                                            validMessage={{ required: 'categoryId is reduired.' }}
                                            onInput={this.HandleInputChange}
                                            value={this.state.viewModel.categoryId}
                                            options={this.state.viewModel.categoryList}
                                        />


                                        <DropDownList name="status"
                                            labelName="status"
                                            display={this.props.display_status}
                                            required={this.props.required_status}
                                            validMessage={{ required: 'status is reduired.' }}
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

                                        {this.Component_Nav()}
                                    </tbody>
                                </table>

                                <div className="form-group form-actions">
                                    <ButtonToolbar>
                                        <Button color="primary" id="btn" disabled={$invalid ? 'disabled' : false}>確認</Button>
                                        <Button color="primary" onClick={this.Next_Button.bind(this)} disabled={$invalid ? 'disabled' : false}>繼續新增下一筆</Button>
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

export default EasyForm(AboutUs_Create, 2);

AboutUs_Create.defaultProps = {


    display_categoryId: true,
    display_status: true,

    /* */
    required_categoryId: true,
    required_status: true,
}