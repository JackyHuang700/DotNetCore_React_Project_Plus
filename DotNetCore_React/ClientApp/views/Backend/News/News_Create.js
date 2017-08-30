
import React, { Component } from 'react';
import { ButtonToolbar, FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import CKEditor from '../../Components/Forms/CKEditor';

import { news_Enum } from '../../../EnumScript/GeneralEnumScript';
import classnames from 'classnames';
import {
  HandleInputChange,
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


import DropzoneComponent from 'react-dropzone-component';


import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';


class News_Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewModel: {
        priority: '1',
        lanList: [],
        startDate: moment(),
        endDate: null,
        status: news_Enum.NORMAL.value,
      },
      modal: false,
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
    this.HandleInputChange_By_New_LanList_CKEditor = HandleInputChange_By_New_LanList_CKEditor.bind(this);
    this.HandleInputChange_By_New_LanList = HandleInputChange_By_New_LanList.bind(this);
    this.Component_Nav = this.Component_Nav.bind(this);



    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif",
      params: {
        files: "I'm a parameter!"
      }
    };

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: '/api/News/Upload_Pic/'
    };

    // If you want to attach multiple callbacks, simply
    // create an array filled with all your callbacks.
    this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

    // Simple callbacks work too, of course
    this.callback = () => {


      console.log('Hello!');
    }

    this.success = file => {
      console.log('uploaded', file);

      //預計將上傳成功後，將檔案名稱寫回viewModel['listImage']內

      // var new_News = Object.assign(this.state.viewModel);
      // new_News["listImage"] = value;

      // this.setState({
      //   News: new_News,
      // });
    }

    this.removedfile = file => console.log('removing...', file);

    this.dropzone = null;
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

  toggleByModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  Submit(event) {
    const self = this;
    axios({
      url: '/api/News/Create',
      method: 'post',
      data: this.state.viewModel
    }).then((result) => {
      if (result.data.success) {
        if (self.state.next_Button) {
          window.location.reload()
        } else {
          history.push('/News');
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



                  {/* refer https://stackoverflow.com/questions/36535234/how-can-ckeditor-be-used-with-react-js-in-a-way-that-allows-react-to-recognize-i */}
                  {/* <CKEditor value={this.props.value} /> */}
                </TabPane>
              )
            })
          }
        </TabContent>
      </td>
    );


  }

  //上傳圖片
  // onImageDrop(files) {
  //   this.setState({
  //     uploadedFile: files
  //   });


  //   var formData = new FormData();
  //   for (var i = 0; i < files.length; i++) {
  //     formData.append('files', files[i]) //用迴圈抓出多少筆再append回來
  //   }

  //   axios.post('/api/News/Upload_Pic/', formData).then((response) => {

  //     if (response.data.success) {
  //       var newNews = Object.assign(this.state.viewModel);
  //       newNews.listImage = response.data.listImage;
  //       this.setState({
  //         viewModel: newNews
  //       });

  //     }
  //     console.log(response);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }


  render() {
    const { params } = this.props.params;
    const { $invalid } = this.props.easyform.$invalid;


    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      drop: this.callbackArray,
      addedfile: this.callback,
      success: this.success,
      removedfile: this.removedfile
    }

    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-xl-10">
          <div className="card">
            <div className="card-header">
              建立最新消息
               </div>
            <div className="card-block">
              <form className="" onSubmit={this.Submit}>

                <table className="table table-striped table-bordered">
                  <tbody>
                    <TextInput name="listImage"
                      labelName="列表圖片"
                      className=""
                      display={this.props.display_listImage}
                      required={this.props.required_listImage}
                      validMessage={{ required: '列表圖片 is reduired.' }}
                      onInput={this.HandleInputChange}
                      value={this.state.viewModel.listImage}
                      placeholder="listImage" />


                    <tr>
                      <td className="col-xs-4 text-right">
                        <label className="text-right" style={{ color: this.props.required_listImage && 'red' }}> 上傳圖片 {this.props.required_listImage && '*'} </label>

                      </td>
                      <td className="col-xs-8 ps-re" >
                        <Button color="danger" onClick={this.toggleByModal.bind(this)}>上傳圖片</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggleByModal.bind(this)} className={this.props.className}>
                          <ModalHeader toggle={this.toggleByModal.bind(this)}>Modal title</ModalHeader>
                          <ModalBody>
                            <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={this.toggleByModal.bind(this)}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.toggleByModal.bind(this)}>Cancel</Button>
                          </ModalFooter>
                        </Modal>
                      </td>
                    </tr>


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

export default EasyForm(News_Create, 2);

News_Create.defaultProps = {

  display_listImage: true,
  display_category: true,
  display_priority: true,
  display_startDate: true,
  display_endDate: true,
  display_status: true,

  /* */
  required_listImage: false,
  required_category: false,
  required_priority: true,
  required_startDate: true,
  required_endDate: false,
  required_status: true,
}


{/* <TextInput name="startDate"
                      labelName="上架時間"
                      className=""
                      display={this.props.display_startDate}
                      required={this.props.required_startDate}
                      validMessage={{ required: '上架時間 is reduired.' }}
                      onInput={this.HandleInputChange}
                      value={this.state.viewModel.startDate}
                      placeholder="startDate" /> */}



{/* <TextInput name="endDate"
                      labelName="下架時間"
                      className=""
                      display={this.props.display_endDate}
                      required={this.props.required_endDate}
                      validMessage={{ required: '下架時間 is reduired.' }}
                      onInput={this.HandleInputChange}
                      value={this.state.viewModel.endDate}
                      placeholder="endDate" /> */}