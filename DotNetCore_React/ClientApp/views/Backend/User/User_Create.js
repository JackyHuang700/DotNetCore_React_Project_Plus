import React, { Component } from 'react';
import { ButtonToolbar, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import {email_pattern} from './User_General';
import { user_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import history from '../../../history'


class User_Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      User: {},
      RoleList: [],
      //是否繼續為繼續下一筆
      next_Button: false,
    };

    this.Submit = this.Submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.GetData = this.GetData.bind(this);
    
  }


  componentDidMount() {
    this.GetData();
  }

GetData(){
  //抓取角色權限
  axios({
    url: `/api/Role/Role_View`,
    method: 'GET',
    data: {
    }
  }).then((result) => {
    var a = [];
    result.data.map((c) => {
      a.push({
        name: c.name,
        value: c.id
      });
    });

    this.setState({ RoleList: a });
  }).catch((error) => {
    console.log(error)
  });
}

  Submit(event) {
const self = this;

    axios({
      url: '/api/User/Create',
      method: 'post',
      data: this.state.User,
    }).then((result) => {
        if (result.data.success) {
          if (self.state.next_Button) {
            window.location.reload()
          }else{
            history.push('/User');
          }
        }
      alert(result.data.message);
    }).catch((error) => {
      console.log(error)
    });
    event.preventDefault();
    return false;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var new_User = Object.assign(this.state.User);
    new_User[name] = value;


    this.setState({
      User: new_User,
    });
  }


  //繼續新增下一筆
  Next_Button(event){
    this.setState({
      next_Button: true,
    });

    document.getElementById('btn').click();
  }


  render() {
    // 经过EasyForm包装的组件，props里会有一个params属性，包含所有的表单项值
    const { params } = this.props.params;
    /*
     * props里的easyform对象，包含了一组验证结果，
     * 其中$invalid/$valid 可以用来判断表单项是够已经正确填写
     */
    const { $invalid } = this.props.easyform.$invalid;

    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              新增帳號
              </div>
            <div className="card-block">
              <form className="" onSubmit={this.Submit}>

                <TextInput name="userName"
                  labelName="帳號"
                  className=""
                  display={this.props.display_userName}
                  required={this.props.required_userName}
                  validMessage={{ required: '帳號 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.userName}                
                  placeholder="userName" />


                  <TextInput name="password"
                  labelName="密碼"
                  className=""
                  display={this.props.display_password}
                  required={this.props.required_password}
                  validMessage={{ required: '密碼 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.password}                
                  placeholder="password" />


                  <TextInput name="email"
                  labelName="email"
                  className=""
                  display={this.props.display_email}
                  pattern={email_pattern}
                  required={this.props.required_email}
                  validMessage={{ required: 'email is reduired.', pattern: 'email格式錯誤' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.email}
                  placeholder="email" />
                  

                  <DropDownList name="roleId"
                  labelName="群組名稱"
                  display={this.props.display_roleId}
                  required={this.props.required_roleId}
                  validMessage={{ required: '群組名稱 is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.User.roleId}
                  options={this.state.RoleList}
                />


                <TextInput name="firstName"
                  labelName="姓"
                  className=""
                  display={this.props.display_firstName}
                  required={this.props.required_firstName}
                  validMessage={{ required: '姓 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.firstName}
                  placeholder="firstName" />

                <TextInput name="lastName"
                  labelName="名"
                  className=""
                  display={this.props.display_lastName}
                  required={this.props.required_lastName}
                  validMessage={{ required: '名 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.lastName}
                  placeholder="lastName" />



                  <DropDownList name="status"
                  labelName="狀態"
                  display={this.props.display_status}
                  required={this.props.required_status}
                  validMessage={{ required: '狀態 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.status}
                  options={
                    [
                      {
                        name: user_Enum.STOP.name,
                        value: user_Enum.STOP.value
                      },
                      {
                        name: user_Enum.NORMAL.name,
                        value: user_Enum.NORMAL.value
                      },
                      {
                        name: user_Enum.EMAIL_NO_VAILD.name,
                        value: user_Enum.EMAIL_NO_VAILD.value
                      },
                      {
                        name: user_Enum.FIRST_PASSWORD_UNCHANGE.name,
                        value: user_Enum.FIRST_PASSWORD_UNCHANGE.value
                      },
                      {
                        name: user_Enum.ERROR_COUNT.name,
                        value: user_Enum.ERROR_COUNT.value
                      }
                    ]}
                />



                {/* <TextInput name="createDate"
                  labelName="建立時間"
                  className=""
                  display={this.props.createDate}
                  required={this.props.createDate}
                  validMessage={{ required: '建立時間 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.createDate}
                  readOnly={true}
                  placeholder="createDate" />


                <TextInput name="createUser"
                  labelName="建立者"
                  className=""
                  display={this.props.createUser}
                  required={this.props.createUser}
                  validMessage={{ required: '建立者 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.createUser}
                  readOnly={true}                  
                  placeholder="createUser" />



                <TextInput name="updateDate"
                  labelName="更新時間"
                  className=""
                  display={this.props.updateDate}
                  required={this.props.updateDate}
                  validMessage={{ required: '更新時間 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.updateDate}
                  placeholder="updateDate" />


                <TextInput name="updateUser"
                  labelName="更新者"
                  className=""
                  display={this.props.updateUser}
                  required={this.props.updateUser}
                  validMessage={{ required: '更新者 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.updateUser}
                  placeholder="updateUser" />

                <TextInput name="failedCount"
                  labelName="已錯誤次數"
                  className=""
                  display={this.props.failedCount}
                  required={this.props.failedCount}
                  validMessage={{ required: '已錯誤次數 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.User.failedCount}
                  placeholder="failedCount" /> */}


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

export default EasyForm(User_Create, 2);

User_Create.defaultProps = {
  display_userName: true,
  display_password: true,
  display_email: true,
  display_roleId: true,
  display_firstName: true,
  display_lastName: true,
  display_status     : true,
  


  // display_emailComfirmed: true,
  // display_createDate: true,
  // display_createUser: true,
  // display_updateDate: true,
  // display_updateUser: true,
  // display_failedCount: true,


  required_userName: true,
  required_password: true,
  required_email: true,
  required_roleId: true,
  required_firstName: false,
  required_lastName: false,
  required_status     : true,
  


  // required_emailComfirmed: true,
  // required_createDate: true,
  // required_createUser: true,
  // required_updateDate: true,
  // required_updateUser: true,
  // required_failedCount: true,
}

