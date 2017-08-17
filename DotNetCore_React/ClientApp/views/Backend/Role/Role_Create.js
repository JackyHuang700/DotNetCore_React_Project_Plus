import React, { Component } from 'react';
import { ButtonToolbar, FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import DropDownList from '../../Components/Forms/DropDownList';

import { role_Enum } from '../../../EnumScript/GeneralEnumScript.js';
import history from '../../../history'

class Role_Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      SysId: '',
      Name: '',
      Priority: '1',
      Status: 1,

      //是否繼續為繼續下一筆
      next_Button: false,
    };

    this.Submit = this.Submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  Submit(event) {
const self = this;

    axios({
      url: '/api/Role/Create',
      method: 'post',
      data: {
        SysId: this.state.SysId,
        Name: this.state.Name,
        Priority: this.state.Priority,
        Status: this.state.Status,
      }
    }).then((result) => {
      if (result.data.success) {
        if (self.state.next_Button) {
          window.location.reload()
        }else{
          history.push('/Role');
        }
      }
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

    this.setState({
      [name]: value
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
              新增角色
              </div>
            <div className="card-block">
              <form className="" onSubmit={this.Submit}>

                <TextInput name="SysId"
                  labelName="系統識別碼"
                  className=""
                  display={this.props.display_SysId}
                  required={this.props.required_SysId}
                  pattern={/^[\w]{5,10}$/}
                  validMessage={{ required: 'SysId is reduired.', pattern: '不能包含字母数字底線以外的字符' }}
                  onInput={this.handleInputChange}
                  value={this.state.SysId}
                  placeholder="sys123" />

                <TextInput name="Name"
                  labelName="角色名稱"
                  className=""
                  display={this.props.display_Name}
                  required={this.props.required_Name}
                  validMessage={{ required: 'Name is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.Name}
                  placeholder="糖糖" />

                <TextInput name="Priority"
                  labelName="權重"
                  className=""
                  display={this.props.display_Priority}
                  required={this.props.required_Priority}
                  validMessage={{ required: 'Priority is reduired.' }}
                  onInput={this.handleInputChange}
                  value={this.state.Priority}
                  placeholder="1" />

                 <DropDownList name="Status"
                  labelName="狀態"
                  display={this.props.display_Status}
                  required={this.props.required_Status} 
                  validMessage={{required: 'Status is reduired.'}} 
                  onInput={this.handleInputChange} 
                  value={this.state.Status}
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

export default EasyForm(Role_Create, 2);

Role_Create.defaultProps = {
  display_SysId: true,
  display_Name: true,
  display_Priority: true,
  display_Status: true,
  required_SysId: true,
  required_Name: true,
  required_Priority: true,
  required_Status: true,
}