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
} from './AboutUs_General';


//刪除與檢視共用
class AboutUs_Delete extends Component {

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


    GetData() {
        const self = this;

        axios({
            url: `/api/AboutUs/GetAboutUs?id=${this.props.match.params.id}`,
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
            "刪除關於我們" :
            "檢視關於我們";
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
        axios.post(`/api/AboutUs/Delete/${this.state.viewModel.id}`, {
        }).then((result) => {
            if (result.data.success) {
                history.push('/AboutUs');
            }
        }).catch((error) => {
            console.log(error)
        });


        event.preventDefault();
        return false;
    }

    Button_BackUp(event) {
        history.push('/AboutUs');
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


                                    <TextInput name="content"
                                        labelName="內容"
                                        className=""
                                        data-index={index}
                                        display={this.props.display_content}
                                        required={this.props.required_content}
                                        validMessage={{ required: '內容 is reduired.' }}
                                        value={this.state.viewModel.lanList[`${index}`].content}
                                        readOnly={true}
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


                                        <TextInput name="categoryId"
                                            labelName="類別"
                                            display={this.props.display_categoryId}
                                            required={this.props.required_categoryId}
                                            validMessage={{ required: '類別 is reduired.' }}
                                            readOnly={true}
                                            value={this.state.viewModel.categoryId}
                                        />


                                        <TextInput name="status"
                                            labelName="狀態"
                                            display={this.props.display_status}
                                            required={this.props.required_status}
                                            validMessage={{ required: '狀態 is reduired.' }}
                                            value={this.state.viewModel.status}
                                            readOnly={true}
                                        />


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


export default EasyForm(AboutUs_Delete, 2);

AboutUs_Delete.defaultProps = {
    display_categoryId: true,
    display_status: true,

    /* */
    required_categoryId: true,
    required_status: true,
}