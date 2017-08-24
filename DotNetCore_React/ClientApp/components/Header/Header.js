import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import {Auth} from '../../helpers/auth'
import history from '../../history'


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  componentDidMount() {

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  logout(e){
    Auth.signout();
  }

  changePwd(e){
    history.push('/changePwd?userName='+Auth.getUserName());
  }

  profile(e){
    history.push('/User/Personal_Edit/userName='+Auth.getUserName());
  }

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" onClick={this.mobileSidebarToggle}>&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
          </li>
          {/* <li className="nav-item px-3">
            <a className="nav-link" href="#">Dashboard</a>
          </li> */}
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={'/img/avatars/avatar2.png'} className="img-avatar" alt={Auth.getUserName()}/>
                <span className="d-md-down-none">{Auth.getNickName()}</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center"><strong>Account</strong></DropdownItem>
                <DropdownItem onClick={this.profile}><i className="fa fa-user"></i> Profile</DropdownItem>
                <DropdownItem onClick={this.changePwd}><i className="fa fa-shield"></i> Change Password</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i> Logout</DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header;
