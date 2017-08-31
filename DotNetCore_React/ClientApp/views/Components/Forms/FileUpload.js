import React, { Component } from 'react';
import { Input, FormGroup,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import Dropzone from 'react-dropzone';

class FileUpload extends Component {

    constructor(props){
        super(props);

        this.state = {
            modal : false,
            uploadedFile: null,
            description:'',
            uploadedFileCloudinaryUrl: ''
        }

        this.toggle = this.toggle.bind(this);
        this.submit = this.submit.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    onImageDrop(files) {
        this.setState({
          uploadedFile: files[0]
        });
    }

    submit(event){  
        this.handleImageUpload(this.state.uploadedFile);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleImageUpload(file) {

        const config = {
            headers: {'content-type': 'multipart/form-data'},
            onUploadProgress : ProgressEvent => console.log(ProgressEvent.loaded)
        }

        let data = new FormData();
        data.append('image',file,file.name);
        data.append('description',this.state.description);

        axios.post(this.props.baseUrl,data,config)
            .then(response => {
                if(response.data.success === true){
                    this.setState({uploadedFileCloudinaryUrl:response.data.listImage});
                }
                else{
                    alert(response.data.message);
                } 
            }).catch(error => {
                console.log(error);
            });
      }
    

    render() {
        return(
            <div>
            <Button color="danger" onClick={this.toggle}>上傳檔案</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>上傳檔案</ModalHeader>
              <ModalBody>
                <Dropzone
                    onDrop={this.onImageDrop.bind(this)}
                    multiple={false}
                    accept={this.props.accept}>
                    { this.state.uploadedFile && <div><img src={this.state.uploadedFile.preview} height="200" /></div> }
                    { !this.state.uploadedFile && <div>Dropping some files here...</div>}
                </Dropzone>

                <input name="description" placeholder="Please write description" onChange={this.handleInputChange.bind(this)}/>

                <div>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                    <div>
                        <p>{this.state.uploadedFile.name}</p>
                        <img src={this.state.uploadedFileCloudinaryUrl} />
                    </div>}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.submit}>上傳</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>取消</Button>
              </ModalFooter>
            </Modal>
          </div>
        )
    }
}

FileUpload.DefaultProps = {
    baseUrl: '',
    accept:'image/jpeg, image/png'
}

export default FileUpload;