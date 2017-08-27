import React, { Component } from 'react';
import { ButtonToolbar, Button, Modal, Container, Row, Col } from 'reactstrap';

import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';

import axios from 'axios';
import history from '../../../history'

import { product_Category_Status_Enum } from '../../../EnumScript/GeneralEnumScript.js';

export default class AboutUs_View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewModel: [],
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

        axios.get('/api/Product_Category/Product_Category_View').then((result) => {
            this.setState({ viewModel: result.data });
        }).catch((error) => {
            console.log(error)
        });
    }

  
    createCustomButtonGroup = props => {
        return (
            <ButtonToolbar className='' sizeClass='btn-group-md'>
                {this.props.dispaly_button_create &&
                    <Button color="primary" onClick={this.OnClick_Create}>建立</Button>}
                {'\u00A0'}
                {props.exportCSVBtn}
            </ButtonToolbar>
        );
    }

    buttonFormatter(cell, row) {
        return (
            <ButtonGroup className='' sizeClass='btn-group-md'>
                {this.props.display_button_edit && <Button color="warning" data-id={row.id} onClick={this.OnClick_Edit}><i className="fa fa-pencil" aria-hidden="true"></i></Button>}
                {'\u00A0'}
                {this.props.display_button_del && <Button color="danger" data-id={row.id} onClick={this.OnClick_Delete}><i className="fa fa-trash" aria-hidden="true"></i></Button>}
            </ButtonGroup>
        );
    }

    OnClick_Edit(event) {
        history.push(`/AboutUs/Edit/${event.currentTarget.getAttribute('data-id')}`);
    }

    OnClick_Delete(event) {
        history.push(`/AboutUs/Delete/${event.currentTarget.getAttribute('data-id')}/${true}`);
    }

    OnClick_Create(event) {
        history.push('/AboutUs/Create');
    }


    Formatter_Status(cell, row) {
        let name = "";

        switch (`${row.status}`) {
            case product_Category_Status_Enum.STOP.value:
                name = product_Category_Status_Enum.STOP.name;
                break;
            case product_Category_Status_Enum.NORMAL.value:
                name = product_Category_Status_Enum.NORMAL.name;
                break;

        }

        return name;
    }

    renderShowsTotal(start, to, total) {
        return (
            <p style={{ color: 'blue' }}>
                顯示第 {start} 至 {to} 項結果, 共 {total} 項
          </p>
        );
    }


    render() {
        const options = {
            btnGroup: this.createCustomButtonGroup,
            sizePerPageList: [5, 10, 15, 20],
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

        const StatusType = {
            0 : news_Enum.STOP.name,
            1 : news_Enum.NORMAL.name
        };


        return (
            <div className="col-xs-12">
                <div className="table-users">
                    <div className="header">關於我們</div>

                    <div className="card">
                        <div className="card-block">
                            <BootstrapTable data={this.state.viewModel}
                                selectRow={selectRow}
                                options={options}
                                striped
                                hover
                                version="4"
                                pagination
                                search
                                exportCSV>
                                {this.props.display_id ? <TableHeaderColumn dataField='id' dataSort={true} filter={ { type: 'TextFilter', delay: 1000 } }>系統流水號</TableHeaderColumn> : null}
                                {this.props.display_name ? <TableHeaderColumn dataField='name' dataSort={true} filter={ { type: 'TextFilter', delay: 1000 } }>名稱</TableHeaderColumn> : null}
                                {this.props.display_priority ? <TableHeaderColumn dataField='priority' dataSort={true} filter={ { type: 'TextFilter', delay: 1000 } }>列表排序</TableHeaderColumn> : null}
                                
                                
                                
                                {this.props.display_status ? <TableHeaderColumn dataField='status' dataSort={true} dataFormat={this.Formatter_Status} filter={ { type: 'SelectFilter', options: StatusType } }>狀態</TableHeaderColumn> : null}
                                {this.props.display_createDate ? <TableHeaderColumn dataField='createDate' dataSort={true}>建立時間</TableHeaderColumn> : null}
                                {this.props.display_createUser ? <TableHeaderColumn dataField='createUser' dataSort={true} filter={ { type: 'TextFilter', delay: 1000 } }>建立帳號</TableHeaderColumn> : null}
                                {this.props.display_updateDate ? <TableHeaderColumn dataField='updateDate' dataSort={true}>更新時間</TableHeaderColumn> : null}
                                {this.props.display_updateUser ? <TableHeaderColumn dataField='updateUser' dataSort={true} filter={ { type: 'TextFilter', delay: 1000 } }>更新帳號</TableHeaderColumn> : null}
                                <TableHeaderColumn isKey dataField="button" dataFormat={this.buttonFormatter}></TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AboutUs_View.defaultProps = {
    dispaly_button_create: true,
    display_button_edit: true,
    display_button_del: true,

    /* */
    display_id: false,
    display_name: true,
    display_priority: true,
    display_status: true,
    display_createDate: true,
    display_createUser: false,
    display_updateDate: false,
    display_updateUser: false,

};

