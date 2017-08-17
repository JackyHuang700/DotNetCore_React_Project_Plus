import React, { Component } from 'react';
import { Input, FormGroup } from 'reactstrap';
import EasyForm, { Field, FieldGroup } from 'react-easyform';

export default class DropDownList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const myProps = Object.assign({},this.props);
        delete myProps.labelName;
        delete myProps.options;

        if (!this.props.display) {
            return (<div></div>)
        }

        let options = [];
        this.props.options.map((item,index) => {
            options.push(<option key={index} value={item.value}>{item.name}</option>);
        });

        return ( <FormGroup>
                    <label style = {{ color: this.props.required && 'red' }} > { this.props.labelName } { this.props.required && '*' } </label> 
                    <Field {...myProps}>
                        {options}
                    </Field>
                </FormGroup>)
    }
}

DropDownList.defaultProps = {
    display: true,
    type: 'select',
    className: '',
    validMessage: null,
    options:null,
}