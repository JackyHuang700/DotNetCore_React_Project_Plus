import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import { news_Enum } from '../../../EnumScript/GeneralEnumScript.js';



//刪除與檢視共用
class News_Delete extends Component {

  constructor(props) {
    super(props);
    this.state = {
        is_Delete: this.props.match.params.delete.toLocaleLowerCase() === "true" ? true : false,

      News: {},
    };

    this.GetData = this.GetData.bind(this);
    this.Button_Submit = this.Button_Submit.bind(this);

      //
      this.Title = this.Title.bind(this);
      this.Button_Text = this.Button_Text.bind(this);
      this.Button_Click = this.Button_Click.bind(this);
  }


  componentDidMount() {
    this.GetData();
  }


  GetData() {
    const self = this;

    axios({
      url: `/api/News/Get_News?id=${this.props.match.params.id}`,
      method: 'GET',
      data: {
      }
    }).then((result) => {
      self.setState({
        News: result.data
      });
    }).catch((error) => {
      console.log(error)
    });

  }


  Title() {
    return this.state.is_Delete ?
      "刪除最新消息" :
      "檢視最新消息";
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



  Button_Submit(event) {
    axios.post(`/api/News/Delete/${this.state.News.id}`, {
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

  Button_BackUp(event) {
    history.push('/News');
  }

  render() {
    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              {this.Title()}
            </div>
            <div className="card-block">
              <form action="" method="post">
                <input type="hidden" id="id" name="id" value={this.state.News.id} />

                  <TextInput name="listImage"
                  labelName="列表圖片"
                  className=""
                  display={this.props.display_listImage}
                  required={this.props.required_listImage}
                  validMessage={{ required: '列表圖片 is reduired.' }}
                  value={this.state.News.listImage}
                             readOnly={true}
                  placeholder="listImage" />



                <TextInput name="category"
                  labelName="類別"
                  className=""
                  display={this.props.display_category}
                  required={this.props.required_category}
                  validMessage={{ required: '類別 is reduired.' }}
                  value={this.state.News.category}
                             readOnly={true}
                  placeholder="category" />



                <TextInput name="priority"
                  labelName="列表排序"
                  className=""
                  display={this.props.display_priority}
                  required={this.props.required_priority}
                  validMessage={{ required: '列表排序 is reduired.' }}
                  value={this.state.News.priority}
                             readOnly={true}
                  placeholder="priority" />


                <TextInput name="startDate"
                  labelName="上架時間"
                  className=""
                  display={this.props.display_startDate}
                  required={this.props.required_startDate}
                  validMessage={{ required: 'Admin is reduired.' }}
                  value={this.state.News.startDate}
                             readOnly={true}
                  placeholder="startDate" />


                <TextInput name="endDate"
                  labelName="下架時間"
                  className=""
                  display={this.props.display_endDate}
                  required={this.props.required_endDate}
                  validMessage={{ required: '下架時間 is reduired.' }}
                  value={this.state.News.endDate}
                             readOnly={true}
                  placeholder="endDate" />


                <DropDownList name="status"
                  labelName="status"
                  display={this.props.display_status}
                  required={this.props.required_status}
                  validMessage={{ required: 'status is reduired.' }}
                  value={this.state.News.status}
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
                  value={this.state.News.createDate}
                  readOnly={true}
                  placeholder="createDate"/>

                <TextInput name="createUser"
                  labelName="建立者"
                  className=""
                  display={this.props.display_createUser}
                  required={this.props.required_createUser}
                  validMessage={{ required: '建立者 is reduired.' }}
                  value={this.state.News.createUser}
                  readOnly={true}
                  placeholder="createUser"/>

                <TextInput name="updateDate"
                  labelName="更新時間"
                  className=""
                  display={this.props.display_updateDate}
                  required={this.props.required_updateDate}
                  validMessage={{ required: '更新時間 is reduired.' }}
                  value={this.state.News.updateDate}
                  readOnly={true}
                  placeholder="updateDate"/>

                <TextInput name="updateUser"
                  labelName="更新者"
                  className=""
                  display={this.props.display_updateUser}
                  required={this.props.required_updateUser}
                  validMessage={{ required: '更新者 is reduired.' }}
                  value={this.state.News.updateUser}
                  readOnly={true}
                  placeholder="updateUser"/>



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


export default EasyForm(News_Delete, 2);

News_Delete.defaultProps = {
  display_listImage: true,
  display_category: true,
  display_priority: true,
  display_startDate: true,
  display_endDate: true,
  display_status: true,
  display_createDate: true,
  display_createUser: true,
  display_updateDate: true,
  display_updateUser: true,

/* */
  required_listImage:true,
  required_category:true,
  required_priority:true,
  required_startDate:true,
  required_endDate:true,
  required_status:true,
  required_createDate:true,
  required_createUser:true,
  required_updateDate:true,
  required_updateUser:true,
}