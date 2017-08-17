import React, { Component } from 'react';
import { Input, FormGroup } from 'reactstrap';
import EasyForm, { Field, FieldGroup } from 'react-easyform';

export default class TextInput extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const myProps = Object.assign({},this.props);
        delete myProps.labelName;
        delete myProps.labelCustom;
        delete myProps.divClassName;

        let baseField = <Field {...myProps} />
        baseField = React.cloneElement(baseField,{
            id:this.props.name
        });

        if (!this.props.display) {
            return (<div></div>)
        }

        return ( <FormGroup className={this.props.divClassName}>
                {this.props.labelName &&
                <label style = {{ color: this.props.required && 'red' }} > { this.props.labelName } { this.props.required && '*' } </label> 
                }
                {this.props.labelCustom}
                { baseField } 
        </FormGroup>)
    }
}

TextInput.defaultProps = {
    display: true,
    type: 'text',
    className: '',
    validMessage: null
}