import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import { news_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import FileUpload from '../../Components/Forms/FileUpload';
import ImgThumbnail from '../../Components/Forms/ImgThumbnail';
import CKEditor from '../../Components/Forms/CKEditor';
import classnames from 'classnames';
import {
  GetData,
  HandleInputChange,
  Add_ImageList,
  Del_ImageList,
  HandleInputChange_By_New_LanList,
  HandleInputChange_By_New_LanList_CKEditor
} from './News_General';
import { Get_Sys_Language } from '../Sys_Language/Sys_Language_General.js';


import {
  formatDate,
  HandleInputChange_StartDate,
  HandleInputChange_EndDate,
} from '../Helper/Helper';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';

class News_Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewModel: {
        lanList: [],
        startDate: null,
        endDate: null,
      },
      Sys_Language_List: [],
      imageList: [],
      activeTab: '0'
    };
    // console.log(`this.props.match.params)`, this.props.match.params)

    this.GetData = GetData.bind(this);
    this.Button_Submit = this.Button_Submit.bind(this);
    this.HandleInputChange = HandleInputChange.bind(this);

    this.toggle = this.toggle.bind(this);

    //Import
    this.Get_Sys_Language = Get_Sys_Language.bind(this);
    this.HandleInputChange_By_New_LanList_CKEditor = HandleInputChange_By_New_LanList_CKEditor.bind(this);
    this.HandleInputChange_By_New_LanList = HandleInputChange_By_New_LanList.bind(this);
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

  Button_Submit(event) {
      //轉換imageList
      let data = this.state.viewModel;
      data.listImage = this.state.imageList;

      axios({
        url: '/api/News/Edit',
        method: 'post',
        data: data
      }).then((result) => {

        if (result.data.success) {
          history.push('/News');
        }
      }).catch((error) => {
        console.log(error)
      });

    event.preventDefault();
    return false;
  }

  //語系元件
  Component_Nav() {
    var self = this;
    return (
      <td colSpan="2">
        <Nav tabs>
          {
            self.state.Sys_Language_List.map((sys, index) => {

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
            self.state.Sys_Language_List.map((sys, index) => {

              return (
                <TabPane tabId={`${index}`}>

                  <TextInput name="title"
                    labelName="標題"
                    className=""
                    data-index={index}
                    display={this.props.display_title}
                    required={this.props.required_title}
                    validMessage={{ required: '標題 is reduired.' }}
                    onInput={this.HandleInputChange_By_New_LanList}
                    value={this.state.viewModel.lanList[`${index}`].title}
                    placeholder="title" />

                  <TextInput name="subTitle"
                    labelName="副標題"
                    className=""
                    data-index={index}
                    display={this.props.display_subTitle}
                    required={this.props.required_subTitle}
                    validMessage={{ required: '副標題 is reduired.' }}
                    onInput={this.HandleInputChange_By_New_LanList}
                    value={this.state.viewModel.lanList[`${index}`].subTitle}
                    placeholder="subTitle" />

                  <CKEditor name="content"
                    labelName="內容"
                    className=""
                    data-index={index}
                    display={this.props.display_content}
                    required={this.props.required_content}
                    validMessage={{ required: '內容 is reduired.' }}
                    onInput={this.HandleInputChange_By_New_LanList_CKEditor}
                    value={this.state.viewModel.lanList[`${index}`].content}
                    cols="100"
                    rows="6"
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
            <div className="card-header">
              編輯消息
            </div>
            <div className="card-block">
              <form className="" onSubmit={this.Button_Submit}>


                <table className="table table-striped table-bordered">
                  <tbody>
                    <input type="hidden" id="id" name="id" value={this.state.viewModel.id} />

                    {/* <TextInput name="listImage"
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

                    <TextInput name="category"
                      labelName="類別"
                      className=""
                      display={this.props.display_category}
                      required={this.props.required_category}
                      validMessage={{ required: '類別 is reduired.' }}
                      onInput={this.HandleInputChange}
                      value={this.state.viewModel.category}
                      placeholder="category" />

                    <TextInput name="priority"
                      labelName="列表排序"
                      className=""
                      display={this.props.display_priority}
                      required={this.props.required_priority}
                      validMessage={{ required: '列表排序 is reduired.' }}
                      onInput={this.HandleInputChange}
                      value={this.state.viewModel.priority}
                      placeholder="priority" />


                    <tr>
                      <td className="col-xs-4 text-right">
                        <label className="text-right" style={{ color: this.props.required_startDate && 'red' }}> 上架時間 {this.props.required_startDate && '*'} </label>

                      </td>
                      <td className="col-xs-8 ps-re" >
                        <DatePicker
                          dateFormat={formatDate}
                          selected={this.state.viewModel.startDate}
                          onChange={HandleInputChange_StartDate.bind(this)} />
                      </td>
                    </tr>





                    <tr>
                      <td className="col-xs-4 text-right">
                        <label className="text-right" style={{ color: this.props.required_endDate && 'red' }}> 下架時間 {this.props.required_endDate && '*'} </label>

                      </td>
                      <td className="col-xs-8 ps-re" >
                        <DatePicker
                          dateFormat={formatDate}
                          isClearable={true}
                          selected={this.state.viewModel.endDate}
                          onChange={HandleInputChange_EndDate.bind(this)} />
                      </td>
                    </tr>



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
                  <Button color="primary" disabled={$invalid ? 'disabled' : false} >完成</Button>
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


export default EasyForm(News_Edit, 2);


News_Edit.defaultProps = {
  display_listImage: false,
  display_category: false,
  display_priority: true,
  display_startDate: true,
  display_endDate: true,
  display_status: true,
  display_createDate: true,
  display_createUser: true,
  display_updateDate: true,
  display_updateUser: true,

  /* */
  required_listImage: false,
  required_category: true,
  required_priority: true,
  required_startDate: true,
  required_endDate: false,
  required_status: true,
  required_createDate: true,
  required_createUser: true,
  required_updateDate: true,
  required_updateUser: true,
}