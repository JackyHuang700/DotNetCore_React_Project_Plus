
import React, { Component } from 'react';

class ImgThumbnail extends Component {
    constructor(props){
        super(props);

    }

    handleDelImage(event){

        if(this.props.delImageEvent){
            return this.props.delImageEvent(this.props.src);
        }
    }

    render() {
        return (
            <div className="imgthumb">
                <a onClick={this.handleDelImage.bind(this)}>
                    <img {...this.props} />
                    <span>刪除</span>
                </a>
            </div>
        )
    }
}

export default ImgThumbnail;