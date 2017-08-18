import React, { Component } from 'react';
import { Input, FormGroup } from 'reactstrap';
import EasyForm, { Field, FieldGroup } from 'react-easyform';

export default class TextInput extends Component {

    constructor(props) {
        super(props);
        this.Td1_Style = this.Td1_Style.bind(this);
        this.Td2_Style = this.Td2_Style.bind(this);
    }


    Td1_Style() {
        let style = {};
        style.borderLeft = "hidden";
        return style;
    }

    Td2_Style() {
        let style = {};
        style.borderRight = "hidden";
        return style;
    }


    render() {
        const myProps = Object.assign({}, this.props);
        delete myProps.labelName;
        delete myProps.labelCustom;
        delete myProps.divClassName;
        let baseField = <Field {...myProps} />
        baseField = React.cloneElement(baseField, {
            id: this.props.name
        });

        if (!this.props.display) {
            return (<div></div>)
        }


        return (
            <tr>
                {/* <FormGroup className={this.props.divClassName}> */}
                <td className="col-xs-4 text-right" style={this.Td1_Style()}>
                    {this.props.labelName && <label className="text-right" style={{ color: this.props.required && 'red' }}> {this.props.labelName} {this.props.required && '*'} </label>}
                    {this.props.labelCustom}
                </td>
                <td className="col-xs-8" style={this.Td2_Style()}>
                    {baseField}
                </td>
                {/*  </FormGroup>*/}
            </tr>
        )
    }
}

TextInput.defaultProps = {
    display: true,
    type: 'text',
    className: '',
    validMessage: null,
    tableStriped: false,
}

