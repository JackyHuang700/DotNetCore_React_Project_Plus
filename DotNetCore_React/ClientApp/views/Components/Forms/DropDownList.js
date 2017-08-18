import React, { Component } from 'react';
import { Input, FormGroup } from 'reactstrap';
import EasyForm, { Field, FieldGroup } from 'react-easyform';

export default class DropDownList extends Component {

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
        delete myProps.options;

        if (!this.props.display) {
            return (<div></div>)
        }

        let options = [];
        this.props.options.map((item, index) => {
            options.push(<option key={index} value={item.value}>{item.name}</option>);
        });

        return (
            <tr>
                {/* <FormGroup> */}
                <td className="col-xs-4 text-right" style={this.Td1_Style()}>

                    <label style={{ color: this.props.required && 'red' }} > {this.props.labelName} {this.props.required && '*'} </label>
                </td>
                <td className="col-xs-8" style={this.Td2_Style()}>

                    <Field {...myProps}>
                        {options}
                    </Field>
                </td>
                {/* </FormGroup> */}
            </tr>
        )
    }
}

DropDownList.defaultProps = {
    display: true,
    type: 'select',
    className: '',
    validMessage: null,
    options: null,
}
