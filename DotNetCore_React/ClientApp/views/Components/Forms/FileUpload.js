import React, { Component } from 'react';
import { ButtonToolbar, FormGroup, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DropzoneComponent from 'react-dropzone-component';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';



//產品 
//服務據點
class FileUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            viewModel: {
                description: ""
            }
        };


        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: this.props.acceptedFiles,
            autoProcessQueue: false
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: this.props.postUrl,
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => {

        }

        this.success = file => {

            let json = JSON.parse(file.xhr.response);

            if (json.success) {

                //添加ImageList列表
                this.props.Add_ImageList({
                    image: json.listImage,
                    description: json.description,
                });

                this.toggleByModal();
            }


        }

        this.sending = (file, xhr, formData) => {
            formData.append("description", this.state.viewModel.description);
        }

        this.initCallback = dropzone => {
            dropzone = dropzone;
        };
        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }

    HandleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var new_News = Object.assign(this.state.viewModel);
        new_News[name] = value;

        this.setState({
            viewModel: new_News,
        });

    }

    toggleByModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handlePost() {
        this.dropzone.processQueue();
    }

    render() {

        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success.bind(this),
            removedfile: this.removedfile,
            initCallback: this.initCallback,
            sending: this.sending
        }
        return (
            <tr>
                <td className="col-xs-4 text-right">
                    <label className="text-right" style={{ color: this.props.required_listImage && 'red' }}> 上傳圖片 {this.props.required_listImage && '*'} </label>

                </td>
                <td className="col-xs-8 ps-re" >
                    <Button color="danger" onClick={this.toggleByModal.bind(this)}>上傳圖片</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleByModal.bind(this)} className={this.props.className}>
                        <ModalHeader toggle={this.toggleByModal.bind(this)}>上傳圖片</ModalHeader>
                        <ModalBody>
                            <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />

                            {/* 摘要 */}
                            <Input
                                name="description"
                                placeholder="Please write description"
                                onChange={this.HandleInputChange.bind(this)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handlePost.bind(this)}>Upload</Button>{' '}
                            <Button color="secondary" onClick={this.toggleByModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </td>
            </tr>
        );
    }



}
export default FileUpload;


FileUpload.propTypes = {
    acceptedFiles: React.PropTypes.string.isRequired,
    postUrl: React.PropTypes.string.isRequired
};


FileUpload.DefaultProps = {
    acceptedFiles: 'image/jpeg, image/png',
    postUrl: ''
}