import React, { Component } from 'react';
import { Button, Modal, Container, Row, Col  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn,ButtonGroup } from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import axios from 'axios';
import history from '../../../history'

import { role_Enum } from '../../../EnumScript/GeneralEnumScript.js';

class Role_View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RoleList: [],
        }
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.GetData = this.GetData.bind(this);
    }

    componentDidMount() {
        this.GetData();
    }

    GetData() {
        const self = this;

        axios.get('/api/Role/Role_View').then((result) => {
            this.setState({ RoleList: result.data });
        }).catch((error) => {
            console.log(error)
        });
    }

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
                {this.props.display_button_edit ? <Button color="primary" data-id={row.id} onClick={this.OnClick_Edit}>Edit</Button> : null}
                {this.props.display_button_del ? <Button color="danger" data-id={row.id} onClick={this.OnClick_Delete}>Delete</Button> : null}
           </ButtonGroup>
        );
    }


    OnClick_Edit(event) {
        history.push(`/Role/Edit/${event.currentTarget.getAttribute('data-id')}/${true}`);        
    }

    OnClick_Delete(event) {
        history.push(`/Role/Delete/${event.currentTarget.getAttribute('data-id')}`);
    }

    OnClick_Create(event) {
        history.push('/Role/Create');
    }

    //將資訊轉換成中文
    Formatter_Status(cell, row) {
        let name = "";

        switch (`${row.status}`) {
            case role_Enum.STOP.value:
                name = role_Enum.STOP.name;
                break;
            case role_Enum.NORMAL.value:
                name = role_Enum.NORMAL.name;
                break;

        }

        return name;
    }


    render() {
        const options = {
            btnGroup: this.createCustomButtonGroup
        };

        const selectRow = {
            mode: 'checkbox'
        };

        return (
            <Container>
                <Row>
                    <Col sm="12" md={{ size:7,offset:5}}><h1>角色管理</h1></Col>
                </Row>
                <Row>         
                <BootstrapTable data={this.state.RoleList} 
                                selectRow={selectRow} 
                                striped 
                                hover 
                                options={options} 
                                search
                                exportCSV>
                    <TableHeaderColumn isKey dataField="button" dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>
                    {/* {this.props.display_Id ? <TableHeaderColumn dataField='id'>id</TableHeaderColumn> : null} */}
                    {this.props.display_SysId ? <TableHeaderColumn dataField='sysId' dataSort={ true }>sysId</TableHeaderColumn> : null}
                    {this.props.display_name ? <TableHeaderColumn dataField='name' dataSort={ true }>name</TableHeaderColumn> : null}
                    {this.props.display_Priority ? <TableHeaderColumn dataField='priority' dataSort={ true }>priority</TableHeaderColumn> : null}
                    {this.props.display_Status ? <TableHeaderColumn dataField='status' dataSort={ true } dataFormat={this.Formatter_Status}>ststus</TableHeaderColumn> : null}
                    {this.props.display_CreateDate ? <TableHeaderColumn dataField='createDate' dataSort={ true }>createDate</TableHeaderColumn> : null}
                    {this.props.display_CreateUser ? <TableHeaderColumn dataField='createUser' dataSort={ true }>createUser</TableHeaderColumn> : null}
                    {this.props.display_UpdateDate ? <TableHeaderColumn dataField='updateDate' dataSort={ true }>updateDate</TableHeaderColumn> : null}
                    {this.props.display_UpdateUser ? <TableHeaderColumn dataField='updateUser' dataSort={ true }>updateUser</TableHeaderColumn> : null}
                </BootstrapTable>
                </Row>
            </Container>
        );
    }
}

Role_View.defaultProps = {
    
    dispaly_button_create:true,
    display_button_edit: true,
    display_button_del: true,

    /**/
    display_Id: true,
    display_name: true,
    display_SysId: true,
    display_Priority: true,
    display_Status: true,
    display_CreateDate: true,
    display_CreateUser: true,
    display_UpdateDate: true,
    display_UpdateUser: true,
};


export default Role_View;