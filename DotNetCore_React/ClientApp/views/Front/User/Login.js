import React, { Component } from 'react';
import axios from 'axios';
import {Auth} from '../../../helpers/auth'
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Login extends Component {


  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      rememberMe: true,
    };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.Login = this.Login.bind(this);
      this.forgot = this.forgot.bind(this);
  }

   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  Login(event) {
    const {
      userName,
      password,
      rememberMe
    } = this.state;

    Auth.authenticate(userName,password,rememberMe,() => {
      history.push('/Dashboard');
    });

    event.preventDefault();
  }

  forgot(event){
    history.push('/forgot');
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
                  <form className="col-md-12" onSubmit={this.Login}>
                <div className="card p-4">
                  <div className="card-block">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>

                      
                    <TextInput name="userName"
                        labelCustom={<span className="input-group-addon"><i className="icon-user"></i></span>}
                        divClassName="input-group mb-4"
                        className="form-control"
                        display={this.props.display_userName}
                        required={this.props.required_userName}
                        validMessage={{ required: 'userName is reduired.' }}
                        onInput={this.handleInputChange}
                        value={this.state.userName}
                        placeholder="userName" />
                   
   
                    <TextInput name="password"
                        type="password"
                        labelCustom={<span className="input-group-addon"><i className="icon-lock"></i></span>}
                        divClassName="input-group mb-4"
                        className="form-control"
                        display={this.props.display_password}
                        required={this.props.required_password}
                        validMessage={{ required: 'password is reduired.' }}
                        onInput={this.handleInputChange}
                        value={this.state.password}
                        placeholder="password" />
                   
                    {this.props.display_rememberMe &&
                    <div className="input-group mb-4">
                    <p className="text-muted">Remember Me　</p>
                      <label className="switch switch-text switch-pill switch-primary">
                        <input type="checkbox" className="switch-input" value={this.state.rememberMe} defaultChecked/>
                        <span className="switch-label" data-on="On" data-off="Off"></span>
                        <span className="switch-handle"></span>
                      </label>
                     </div>
                                        }
                    <div className="row">
                      <div className="col-6">
                        <button className="btn btn-primary px-4" disabled={$invalid ? 'disabled' : false}>Login</button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0" onClick={this.forgot}>Forgot password?</button>
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

export default EasyForm(Login, 2);

Login.defaultProps = {
    display_userName: true,
    display_password: true,
    display_rememberMe: true,

    required_userName: true,
    required_password: true,
}