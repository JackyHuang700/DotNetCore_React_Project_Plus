import React, { Component } from 'react';
import axios from 'axios';
import {Auth} from '../../../helpers/auth'
import history from '../../../history'
import EasyForm, { Field, FieldGroup } from 'react-easyform';
import TextInput from '../../Components/Forms/TextInput';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import queryString from 'query-string';

class changePwd extends Component {


  constructor(props) {
    super(props);

    this.state = { 
      userName: '',
      password: '',
      repassword:'',
      passwordhash:'',
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

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.setState({
        userName : parsed.userName,
        passwordhash: parsed.passwordhash
    },() =>{
        if(this.state.userName !== Auth.getUserName()){
          history.push('/Login');
        }
        this.checkhash();
    });
  }

  checkhash(){
    if(this.state.passwordhash){
        axios({
            url:'/api/WebApi/forgotConfirm',
            method:'get',
            data:{
                username:this.state.password,
                passwordhash:this.state.passwordhash
            }
        }).then((result)=>{
            if(!result.data.success){
                alert(result.data.message);
                history.push('/');
            }
        }).catch((error) => {
            console.log(error)
        });
    }
  }


  submit(event) {
    const {
      userName,
      password,
      passwordhash
    } = this.state;

    axios({
        url: '/api/WebApi/changePassword',
        method: 'post',
        data: {
            userName: userName,
            password: password,
            passwordhash: passwordhash,
        }
    }).then((result) => {
        alert(result.data.message); 
        if(result.data.success){
            Auth.signout();
            history.push('/login');
        }
    }).catch((error) => {
        console.log(error)
    });
    event.preventDefault();
    return false;
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
                    <h1>Update Password</h1>
                    <p className="text-muted">修改密碼</p>
                    {!this.display_userName &&
                        <div className="input-group mb-3">
                            <span className="input-group-addon"><i className="icon-user"></i></span>
                            <label>{this.state.userName}</label>
                        </div>
                    }
                    <TextInput name="password"
                        labelCustom={<span className="input-group-addon"><i className="icon-key"></i></span>}
                        divClassName="input-group mb-4"
                        className="form-control"
                        display={this.props.display_password}
                        required={this.props.required_password}
                        confirmed={this.refs.repassword} 
                        validMessage={{ required: 'password is reduired.' }}
                        onInput={this.handleInputChange}
                        value={this.state.password}
                        placeholder="password" />

                    <TextInput name="repassword"
                        labelCustom={<span className="input-group-addon"><i className="icon-key"></i></span>}
                        divClassName="input-group mb-4"
                        className="form-control"
                        display={this.props.display_repassword}
                        required={this.props.required_repassword}
                        confirm={this.refs.password}
                        validMessage={{ required: 'repassword is reduired.', confirm: '两次密码不一致' }}
                        onInput={this.handleInputChange}
                        value={this.state.repassword}
                        placeholder="repassword" />

                    <div className="row">
                      <div className="col-6">
                        <button className="btn btn-primary px-4" disabled={$invalid ? 'disabled' : false}>送出</button>
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

export default EasyForm(changePwd, 2);

changePwd.defaultProps = {
    display_userName: true,
    display_password: true,
    display_repassword:true,

    required_password: true,
    required_repassword:true,
}