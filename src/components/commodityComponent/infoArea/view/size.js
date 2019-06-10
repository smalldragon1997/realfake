import React, { Component } from 'react';
import {Avatar,Button} from 'antd';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


export default class show extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    render() {
        const { photoIndex, isOpen } = this.state;

        return (
            <div>
                <Button type={"dashed"} onClick={() => this.setState({ isOpen: true })}>尺码表</Button>
                {isOpen && (
                    <Lightbox
                        imageTitle={this.props.info}
                        imageCaption={this.props.info}
                        mainSrc={this.props.images[photoIndex]}
                        nextSrc={this.props.images[(photoIndex + 1) % this.props.images.length]}
                        prevSrc={this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + this.props.images.length - 1) % this.props.images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % this.props.images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}