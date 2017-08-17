import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';

import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import history from '../../../history'

//編輯與檢視共用
class Role_Delete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Role: {},
    };

    this.GetData = this.GetData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

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



  Button_Submit(event) {
    event.preventDefault();
    axios.post(`/api/Role/Delete/${this.state.Role.id}`, {
    }).then((result) => {
        if (result.data.success) {
          history.push('/Role');
        }
      }).catch((error) => {
        console.log(error)
      });
    return false;
  }


  render() {
    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              刪除角色
            </div>
            <div className="card-block">
              <form action="" method="post">
                <input type="hidden" id="id" name="id" value={this.state.Role.id} />


                <TextInput name="sysId"
                  labelName="系統識別碼"
                  className=""
                  display={this.props.display_sysId}
                  required={this.props.required_sysId}
                  validMessage={{ required: '系統識別碼 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.Role.sysId}
                  placeholder="sysId"
                  readOnly={true} />


                <TextInput name="name"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_name}
                  required={this.props.required_name}
                  validMessage={{ required: '角色名稱 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.Role.name}
                  placeholder="name"
                  readOnly={true} />

                <TextInput name="priority"
                  labelName="權重"
                  className=""
                  display={this.props.display_priority}
                  required={this.props.required_priority}
                  validMessage={{ required: '權重 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.Role.priority}
                  placeholder="priority"
                  readOnly={true} />




                <TextInput name="status"
                  labelName="狀態"
                  className=""
                  display={this.props.display_status}
                  required={this.props.required_status}
                  validMessage={{ required: '狀態 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.Role.status}
                  placeholder="status"
                  readOnly={true} />


                <TextInput name="createDate"
                  labelName="建立日期"
                  className=""
                  display={this.props.display_createDate}
                  required={this.props.required_createDate}
                  validMessage={{ required: '建立日期 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.Role.createDate}
                  placeholder="createDate"
                  readOnly={true} />

                <TextInput name="createUser"
                  labelName="建立者"
                  className=""
                  display={this.props.display_createUser}
                  required={this.props.required_createUser}
                  validMessage={{ required: '建立者 is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.Role.createUser}
                  placeholder="createUser"
                  readOnly={true} />


                <div className="form-group form-actions">
                  <button type="botton" className="btn btn-sm btn-danger" onClick={this.Button_Submit}>確認刪除</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default EasyForm(Role_Delete, 2);

Role_Delete.defaultProps = {
  display_sysId: true,
  display_name: true,
  display_priority: true,
  display_status: true,
  display_createDate: true,
  display_createUser: true,

  required_sysId: true,
  required_name: true,
  required_priority: true,
  required_status: true,
  required_createDate: true,
  required_createUser: true,
}