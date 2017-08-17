import React, { Component } from 'react';
import axios from 'axios';
import {Auth} from '../../../helpers/auth'
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Forgot extends Component {


  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
    };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.submit = this.submit.bind(this);
  }

   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submit(event) {
    const {
      userName,
      email,
    } = this.state;

    axios({
        url: '/api/WebApi/forgot',
        method: 'post',
        data: {
        userName: userName,
        email: email
        }
    }).then((result) => {
        alert(result.data.message);    
    }).catch((error) => {
        console.log(error)
    });
    event.preventDefault();
    return false;
  }

  back(event){
    history.goBack();
  }

  render() {
    const { params } = this.props.params;
    const { $invalid } = this.props.easyform.$invalid;
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
              <form className="col-md-12" onSubmit={this.submit}>
                <div className="card p-4">
                  <div className="card-block">
                    <h1>Forgot</h1>
                    <p className="text-muted">忘記密碼</p>

                    <TextInput name="userName"
                        labelCustom={<span className="input-group-addon"><i className="icon-user"></i></span>}
                        divClassName="input-group mb-3"
                        className="form-control"
                        display={this.props.display_userName}
                        required={this.props.required_userName}
                        validMessage={{ required: 'userName is reduired.' }}
                        onInput={this.handleInputChange}
                        value={this.state.userName}
                        placeholder="userName" />

                    <TextInput name="email"
                        labelCustom={<span className="input-group-addon"><i className="icon-envelope"></i></span>}
                        divClassName="input-group mb-4"
                        className="form-control"
                        display={this.props.display_email}
                        required={this.props.required_email}
                        pattern={/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/}
                        validMessage={{ required: 'email is reduired.', pattern: '郵件格式錯誤'  }}
                        onInput={this.handleInputChange}
                        value={this.state.email}
                        placeholder="email" />

                    <div className="row">
                      <div className="col-6">
                        <button className="btn btn-primary px-4" disabled={$invalid ? 'disabled' : false}>送出</button>
                      </div>
                      <div className="offset-4 col-2">
                        <button type="button" className="btn btn-warning px-4" onClick={this.back}>返回</button>
                      </div>
                    </div>
                  </div>
                </div>
                </form>        
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EasyForm(Forgot, 2);

Forgot.defaultProps = {
    display_userName: true,
    display_email: true,

    required_userName: true,
    required_email: true,
}