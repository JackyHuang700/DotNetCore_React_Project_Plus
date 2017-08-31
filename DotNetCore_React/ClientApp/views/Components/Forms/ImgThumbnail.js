
import React, { Component } from 'react';

class ImgThumbnail extends Component {
    constructor(props){
        super(props);

    }

    handleDelImage(event){
        this.props.delImageEvent({
            target: {
                type: "text",
                value: this.props.src,
                name: this.props.handleDelImageName,
            },
        });
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

ImgThumbnail.DefaultProps = {
    handleDelImageName : ''
}

export default ImgThumbnail;