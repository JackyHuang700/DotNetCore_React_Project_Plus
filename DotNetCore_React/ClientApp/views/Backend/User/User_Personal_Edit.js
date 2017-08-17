import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import EasyForm, { Field, FieldGroup } from 'react-easyform';
import {email_pattern} from './User_General';
import TextInput from '../../Components/Forms/TextInput';

import axios from 'axios';
import history from '../../../history'


class User_Personal_Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: {},
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
          url: `/api/User/Get_User_By_UserName?${this.props.match.params.userName}`,
          method: 'GET',
          data: {
          }
        }).then((result) => {
          self.setState({
            User: result.data
          });
        }).catch((error) => {
          console.log(error)
        });

    }


  //編輯
  Button_Submit(event) {
    event.preventDefault();
    axios({
      url: '/api/User/Edit_Personal_User',
      method: 'post',
      data: this.state.User
    }).then((result) => {
      if (result.data.success) {
        history.push('/User');
      }
    }).catch((error) => {
      console.log(error)
    });
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

    render() {

        const { params } = this.props.params;
        const { $invalid } = this.props.easyform.$invalid;

        return (
            <div className="animated fadeIn row justify-content-center">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-header">
                            編輯帳號資訊
                        </div>
                        <div className="card-block">
                            <form className="" onSubmit={this.Button_Submit}>
                                <input type="hidden" id="id" name="id" value={this.state.User.id} />

                                <TextInput name="userName"
                                    labelName="系統帳號"
                                    className=""
                                    display={this.props.display_userName}
                                    required={this.props.required_userName}
                                    validMessage={{ required: 'userName is reduired.' }}
                                    onInput={this.handleInputChange}
                                    value={this.state.User.userName}
                                    placeholder="系統帳號"
                                    readOnly={true} />

                                <TextInput name="password"
                                    labelName="登入密碼"
                                    className=""
                                    display={this.props.display_password}
                                    required={this.props.required_password}
                                    validMessage={{ required: 'password is reduired.' }}
                                    onInput={this.handleInputChange}
                                    value={this.state.User.password}
                                    placeholder="登入密碼" />

                                {/* 判斷Email格式 */}
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

                                <TextInput name="firstName"
                                    labelName="姓"
                                    className=""
                                    display={this.props.display_firstName}
                                    required={this.props.required_firstName}
                                    validMessage={{ required: 'firstName is reduired.' }}
                                    onInput={this.handleInputChange}
                                    value={this.state.User.firstName}
                                    placeholder="姓" />

                                <TextInput name="lastName"
                                    labelName="名"
                                    className=""
                                    display={this.props.display_lastName}
                                    required={this.props.required_lastName}
                                    validMessage={{ required: 'lastName is reduired.' }}
                                    onInput={this.handleInputChange}
                                    value={this.state.User.lastName}
                                    placeholder="名" />

                                <div className="form-group form-actions">
                                    <Button color="primary" disabled={$invalid ? 'disabled' : false}>編輯完成</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EasyForm(User_Personal_Edit, 2);


User_Personal_Edit.defaultProps = {
    display_userName: true,
    display_password: true,
    display_email: true,
    display_firstName: false,
    display_lastName: false,


    //..
    required_userName: true,
    required_password: true,
    required_email: true,
    required_firstName: false,
    required_lastName: false,

}

