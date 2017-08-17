import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import { role_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';
import history from '../../../history'

//編輯與檢視共用
class Role_Edit_Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_Edit: this.props.match.params.edit.toLocaleLowerCase() === "true" ? true : false,
      Role: {},
    };

    this.GetData = this.GetData.bind(this);
    this.Submit = this.Submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    //

    this.Title = this.Title.bind(this);
    this.Bind_handleInputChange = this.Bind_handleInputChange.bind(this);
    this.Button_Submit = this.Button_Submit.bind(this);

  }


  componentDidMount() {
    this.GetData();
  }


  GetData() {
    const self = this;

    axios({
      url: `/api/Role/Get_Role?id=${this.props.match.params.id}`,
      method: 'GET',
      data: {
      }
    }).then((result) => {
      self.setState({
        Role: result.data
      });
    }).catch((error) => {
      console.log(error)
    });

  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var new_Role = Object.assign(this.state.Role);
    new_Role[name] = value;

    this.setState({
      Role: new_Role,
    });
  }


  Title() {
    return this.state.is_Edit ?
      "編輯角色" :
      "檢視角色";
  }


  Bind_handleInputChange(event) {
    return this.state.is_Edit ?
      this.handleInputChange(event) :
      null;
  }


  //按鈕觸發事件
  Button_Text() {
    return this.state.is_Edit ?
      "編輯完成" :
      "返回";
  }

  /**
  * 按鈕觸發事件
  */
  Submit(event) {
    event.preventDefault();
    if (this.state.is_Edit) {

      this.Button_Submit(event);
    }
    else {
      this.Button_BackUp(event);

    }
    return false;
  }

  /**
  * 編輯
  */
  Button_Submit(event) {
    event.preventDefault();
    axios({
      url: '/api/Role/Edit',
      method: 'post',
      data: this.state.Role
    }).then((result) => {
      if (result.data.success) {
        history.push('/Role');
      }
    }).catch((error) => {
      console.log(error)
    });
    return false;
  }

  /*
  * 返回
  */
  Button_BackUp(event) {
    history.push('/Role');
  }

  render() {

    const { params } = this.props.params;
    const { $invalid } = this.props.easyform.$invalid;

    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              {this.Title()}
            </div>
            <div className="card-block">
            <form className="" onSubmit={this.Submit}>
                <input type="hidden" id="id" name="id" value={this.state.Role.id} />

                <TextInput name="sysId"
                  labelName="系統識別碼"
                  className=""
                  display={this.props.display_sysId}
                  required={this.props.required_sysId}
                  validMessage={{ required: '系統識別碼 is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.Role.sysId}
                  placeholder="sysId"
                  readOnly={true} />

                <TextInput name="name"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_name}
                  required={this.props.required_name}
                  validMessage={{ required: 'name is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.Role.name}
                  placeholder="name"
                  readOnly={!this.state.is_Edit} />

                <TextInput name="priority"
                  labelName="權重"
                  className=""
                  display={this.props.display_priority}
                  required={this.props.required_priority}
                  validMessage={{ required: '權重 is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.Role.priority}
                  placeholder="priority"
                  readOnly={!this.state.is_Edit} />

                 <DropDownList name="status"
                  labelName="狀態"
                  display={this.props.display_Status}
                  required={this.props.required_Status} 
                  validMessage={{required: '狀態 is reduired.'}} 
                  onInput={this.handleInputChange} 
                  value={this.state.Role.status}
                  readOnly={!this.state.is_Edit}
                  options={
                    [
                      {
                        name:role_Enum.STOP.name,
                        value:role_Enum.STOP.value
                      },
                      {
                        name:role_Enum.NORMAL.name,
                        value:role_Enum.NORMAL.value
                      }
                    ]}
                  />

                  <TextInput name="createDate"
                  labelName="建立時間"
                  className=""
                  display={this.props.display_createDate}
                  required={this.props.required_createDate}
                  validMessage={{ required: '建立時間 is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.Role.createDate}
                  placeholder="createDate"
                  readOnly={true} />

                  <TextInput name="createUser"
                  labelName="建立帳號"
                  className=""
                  display={this.props.display_createUser}
                  required={this.props.required_createUser}
                  validMessage={{ required: '建立帳號 is reduired.' }}
                  onInput={this.Bind_handleInputChange}
                  value={this.state.Role.createUser}
                  placeholder="createUser"
                  readOnly={true} />

                <div className="form-group form-actions">
                  <Button color="primary" disabled={$invalid ? 'disabled' : false}>{this.Button_Text()}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default EasyForm(Role_Edit_Show, 2);


Role_Edit_Show.defaultProps = {
  display_sysId: true,
  display_name: true,
  display_priority: true,
  display_status     : true,

  required_sysId: true,
  required_name: true,
  required_priority: true,
  required_status     : true,
}