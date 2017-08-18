import React, { Component } from 'react';
import { Button, Modal, Container, Row, Col  } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn,ButtonGroup } from 'react-bootstrap-table';
import axios from 'axios';
import history from '../../../history'
import { user_Enum } from '../../../EnumScript/GeneralEnumScript.js';

class User_View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserList: [],
            //Table變數
            selected: [],
            currPage: 1
        }
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.GetData = this.GetData.bind(this);
    }

    componentDidMount() {
        this.GetData();
    }

    GetData() {
        const self = this;

        axios.get('api/User/User_View').then((result) => {
            this.setState({ UserList: result.data });
        }).catch((error) => {
            console.log(error)
        });
    }
    
    /**
     * 自訂按鈕
     */
    createCustomButtonGroup = props => {
        return (
            <ButtonGroup className='' sizeClass='btn-group-md'>
                {this.props.dispaly_button_create &&
                <Button color="primary" onClick={this.OnClick_Create}>建立</Button> }
                {props.exportCSVBtn}
            </ButtonGroup>
        );
    }

    buttonFormatter(cell, row) {
        return (
            <ButtonGroup className='' sizeClass='btn-group-md'>
                {this.props.display_button_edit && <Button color="warning" data-id={row.id} onClick={this.OnClick_Edit}><i className="fa fa-pencil" aria-hidden="true"></i></Button> }
                {this.props.display_button_del && <Button color="danger" data-id={row.id} onClick={this.OnClick_Delete}><i className="fa fa-trash" aria-hidden="true"></i></Button> }
            </ButtonGroup>
        );
    }

    OnClick_Edit(event) {
        history.push(`/User/Edit/${event.currentTarget.getAttribute('data-id')}/${true}`);
    }

    OnClick_Delete(event) {
        history.push(`/User/Delete/${event.currentTarget.getAttribute('data-id')}`);
    }

    OnClick_Create(event) {
        history.push('/User/Create');
    }

    //將資訊轉換成中文
    Formatter_Status(cell, row) {
        let name = "";

        switch (`${row.status}`) {
            case user_Enum.STOP.value:
                name = user_Enum.STOP.name;
                break;
            case user_Enum.NORMAL.value:
                name = user_Enum.NORMAL.name;
                break;
            case user_Enum.EMAIL_NO_VAILD.value:
                name = user_Enum.EMAIL_NO_VAILD.name;
                break;
            case user_Enum.FIRST_PASSWORD_UNCHANGE.value:
                name = user_Enum.FIRST_PASSWORD_UNCHANGE.name;
                break;
            case user_Enum.ERROR_COUNT.value:
                name = user_Enum.ERROR_COUNT.name;
                break;


        }

        return name;

    }

    renderShowsTotal(start, to, total) {
        return (
          <p style={ { color: 'blue' } }>
            顯示第 { start } 至 { to } 項結果, 共 { total } 項
          </p>
        );
    }

    render() {
        const options = {
            btnGroup: this.createCustomButtonGroup,
            sizePerPageList: [ 5, 10, 15, 20 ],
            sizePerPage: 10,
            page: this.state.currPage,
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom'  // default is bottom, top and both is all available
        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selected
        };

        return (
                <div className="col-xs-12">
                <div className="card">
                <div className="card-header">最新消息</div>
                <div className="card-block">    
            <BootstrapTable data={this.state.UserList} 
                            selectRow={selectRow} 
                            options={options}
                            pagination
                            striped 
                            hover 
                            search
                            exportCSV>
                {this.props.display_userName ? <TableHeaderColumn dataField='userName' dataSort={ true }>userName</TableHeaderColumn> : null}
                {this.props.display_roleId ? <TableHeaderColumn dataField='roleId' dataSort={ true }>roleId</TableHeaderColumn> : null}
                {this.props.display_email ? <TableHeaderColumn dataField='email' dataSort={ true }>email</TableHeaderColumn> : null}
                {this.props.display_emailComfirmed ? <TableHeaderColumn dataField='emailComfirmed' dataSort={ true }>emailComfirmed</TableHeaderColumn> : null}
                {this.props.display_firstName ? <TableHeaderColumn dataField='firstName' dataSort={ true }>firstName</TableHeaderColumn> : null}
                {this.props.display_lastName ? <TableHeaderColumn dataField='lastName' dataSort={ true }>lastName</TableHeaderColumn> : null}
                {this.props.display_status ? <TableHeaderColumn dataField='status' dataSort={ true } dataFormat={this.Formatter_Status}>status</TableHeaderColumn> : null}
                {this.props.display_createDate ? <TableHeaderColumn dataField='createDate' dataSort={ true }>createDate</TableHeaderColumn> : null}
                {this.props.display_createUser ? <TableHeaderColumn dataField='createUser' dataSort={ true }>createUser</TableHeaderColumn> : null}
                {this.props.display_updateDate ? <TableHeaderColumn dataField='updateDate' dataSort={ true }>updateDate</TableHeaderColumn> : null}
                {this.props.display_updateUser ? <TableHeaderColumn dataField='updateUser' dataSort={ true }>updateUser</TableHeaderColumn> : null}
                {this.props.display_failedCount ? <TableHeaderColumn dataField='failedCount' dataSort={ true }>failedCount</TableHeaderColumn> : null}
                <TableHeaderColumn isKey dataField="button" dataFormat={this.buttonFormatter}></TableHeaderColumn>
            </BootstrapTable>
            </div>
            </div>
            </div>
        );
    }
}

User_View.defaultProps = {
    dispaly_button_create:true,
    display_button_edit: true,
    display_button_del: true,

    /**/
    display_userName: true,
    display_roleId: true,
    display_email: true,
    display_emailComfirmed: true,
    display_firstName: true,
    display_lastName: true,
    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_updateDate: true,
    display_updateUser: true,
    display_failedCount: true,

};


export default User_View;