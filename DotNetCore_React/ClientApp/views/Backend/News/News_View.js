import React, { Component } from 'react';
import { ButtonToolbar, Button, Modal, Container, Row, Col  } from 'reactstrap';

import { BootstrapTable, TableHeaderColumn,ButtonGroup } from 'react-bootstrap-table';

import axios from 'axios';
import history from '../../../history'

import { news_Enum } from '../../../EnumScript/GeneralEnumScript.js';

export default class News_View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            NewsList: [],
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

        axios.get('/api/News/News_View').then((result) => {
            this.setState({ NewsList: result.data });
        }).catch((error) => {
            console.log(error)
        });
    }

    /**
     * ���
     */
    createCustomButtonGroup = props => {
        return (
            <ButtonToolbar className='' sizeClass='btn-group-md'>
                {this.props.dispaly_button_create &&
                <Button color="primary" onClick={this.OnClick_Create}>建立</Button> }
                {'\u00A0'}
                {props.exportCSVBtn}
            </ButtonToolbar>
        );
    }

    buttonFormatter(cell, row) {
        return (
            <ButtonGroup className='' sizeClass='btn-group-md'>
                {this.props.display_button_edit && <Button color="warning" data-id={row.id} onClick={this.OnClick_Edit}><i className="fa fa-pencil" aria-hidden="true"></i></Button> }
                {'\u00A0'}
                {this.props.display_button_del && <Button color="danger" data-id={row.id} onClick={this.OnClick_Delete}><i className="fa fa-trash" aria-hidden="true"></i></Button> }
            </ButtonGroup>
        );
    }

    OnClick_Edit(event) {
        history.push(`/News/Edit/${event.currentTarget.getAttribute('data-id')}`);        
    }

    OnClick_Delete(event) {
        history.push(`/News/Delete/${event.currentTarget.getAttribute('data-id')}/${true}`);
    }

    OnClick_Create(event) {
        history.push('/News/Create');
    }

 
    Formatter_Status(cell, row) {
        let name = "";

        switch (`${row.status}`) {
            case news_Enum.STOP.value:
                name = news_Enum.STOP.name;
                break;
            case news_Enum.NORMAL.value:
                name = news_Enum.NORMAL.name;
                break;
            case news_Enum.DELETE.value:
                name = news_Enum.DELETE.name;
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

                <div className="table-users">
                    <div className="header">最新消息</div>

                    <div className="card">
                        {/* <div className="card-header">最新消息</div> */}
                        <div className="card-block">
                        <BootstrapTable data={this.state.NewsList} 
                        selectRow={selectRow} 
                        options={options} 
                        striped 
                        hover 
                        pagination                 
                        search
                        exportCSV>
            {this.props.display_listImage ? <TableHeaderColumn dataField='listImage'>listImage</TableHeaderColumn> : null}
            {this.props.display_title ? <TableHeaderColumn dataField='title'>title</TableHeaderColumn> : null}
            {this.props.display_category ? <TableHeaderColumn dataField='category'>category</TableHeaderColumn> : null}
            {this.props.display_priority ? <TableHeaderColumn dataField='priority'>priority</TableHeaderColumn> : null}
            {this.props.display_startDate ? <TableHeaderColumn dataField='startDate'>startDate</TableHeaderColumn> : null}
            {this.props.display_endDate ? <TableHeaderColumn dataField='endDate'>endDate</TableHeaderColumn> : null}
            {this.props.display_status ? <TableHeaderColumn dataField='status' dataFormat={this.Formatter_Status}>status</TableHeaderColumn> : null}
            {this.props.display_createDate ? <TableHeaderColumn dataField='createDate'>createDate</TableHeaderColumn> : null}
            {this.props.display_createUser ? <TableHeaderColumn dataField='createUser'>createUser</TableHeaderColumn> : null}
            {this.props.display_updateDate ? <TableHeaderColumn dataField='updateDate'>updateDate</TableHeaderColumn> : null}
            {this.props.display_updateUser ? <TableHeaderColumn dataField='updateUser'>updateUser</TableHeaderColumn> : null}
            <TableHeaderColumn isKey dataField="button" dataFormat={this.buttonFormatter}></TableHeaderColumn>
        </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

News_View.defaultProps = {
    dispaly_button_create:true,
    display_button_edit: true,
    display_button_del: true,

    /* */
    display_name: true,
    display_listImage: true,
    display_title: true,
    display_category: true,
    display_priority: true,
    display_startDate: true,
    display_endDate: true,
    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_updateDate: true,
    display_updateUser: true,

};