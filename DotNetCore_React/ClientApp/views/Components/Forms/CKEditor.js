import React, { Component } from 'react';
import { Input, FormGroup } from 'reactstrap';
import EasyForm, { Field, FieldGroup } from 'react-easyform';

export default class CKEditor extends Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const self = this;
        let configuration = {
          toolbar: "Basic",
          width: '100%',
          height: 750,
        };
        CKEDITOR.replace(self.props.name, configuration);
        CKEDITOR.instances[self.props.name].on('change', function (event) {
          let data = CKEDITOR.instances[self.props.name].getData();
        //   debugger;
          this.props.onInput({
              value: data,
              name: CKEDITOR.instances[self.props.name].name,
              index: CKEDITOR.instances[self.props.name].element.getAttribute('data-index'),
          });
        }.bind(this));
      }


    render() {
        const myProps = Object.assign({},this.props);
        delete myProps.labelName;

        let baseField = <Field {...myProps} />
        baseField = React.cloneElement(baseField,{
            id:this.props.name
        });

        if (!this.props.display) {
            return (<div></div>)
        }

        return ( 
       <tr>
{/* <FormGroup> */}
 <td className="col-xs-4 text-right">
<label style = {{ color: this.props.required && 'red' }} > { this.props.labelName } { this.props.required && '*' } </label> 

 </td>
 <td className="col-xs-8">
 { baseField } 
 </td>
 {/* </FormGroup> */}
            </tr>
        )
    }
}

CKEditor.defaultProps = {
    display: true,
    type: 'textarea',
    className: '',
    validMessage: null
}



