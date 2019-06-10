import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button,Spin} from 'antd';
import * as Actions from '../actions';
import {Carousel} from 'react-responsive-carousel';
import {withRouter} from 'react-router-dom';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

const carouselStyle = {
    margin: "1%"
};
const imgStyle = {width:"100%"};

class carousel extends React.Component {

    constructor(props) {
        super(props);
        this.props.onFetchHomeCarousel();
        this.onClickImg = this.onClickImg.bind(this);
        // 回到页面顶部
        window.scrollTo(0, 0);
    }

    // 点击图片 传入类型和id
    onClickImg(index) {
        const info = this.props.homeInfo[index];
        this.props.history.push("/"+info.type+"/"+info.id);
    }

    render() {
        const {homeInfo, isLoading} = this.props;
        return (
            <div style={carouselStyle}>
                <Spin spinning={isLoading}>
                    <Card
                        bodyStyle={{padding: 0}}
                        loading={isLoading}
                    >
                        <Carousel
                            emulateTouch
                            infiniteLoop
                            autoPlay
                            onClickItem={this.onClickImg}
                            showThumbs={false}
                        >
                            {
                                homeInfo.map(function (item) {
                                    return (
                                        <div key={item.picId}>
                                            <img src={item.url}
                                                 style={imgStyle}
                                            />
                                        </div>
                                    )
                                })
                            }

                        </Carousel>
                    </Card>
                </Spin>
            </div>

        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const home = state.home;
    return {
        homeInfo: home.carousel.homeInfo,
        isLoading: home.carousel.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchHomeCarousel: () => {
            dispatch(Actions.Fetching());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(carousel));