import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Tooltip, Icon, message, Spin, Pagination, Radio, BackTop} from 'antd';
import * as Actions from '../actions';
import {Link} from 'react-router-dom'
import {Carousel} from 'react-responsive-carousel';

const {Meta} = Card;

const imgStyle = {width: "100%"};

class carousel extends React.Component {

    constructor(props) {
        super(props);

        // 回到页面顶部
        window.scrollTo(0, 0);
    }

    componentDidMount() {

        // 当brand为空时说明有可能是地址访问或者没有点击按钮就进入页面
        // 将路径的参数初始化为关键字即可 如果是关键字为undefined则saga获取数据前判断为获取全部数据
        if (this.props.brandId !== undefined) {
            this.props.onFetchBrandCarousel(this.props.brandId);
        }
    }

    render() {
        const {
            isLoading,
            brandInfo, // 轮播图数据列表
        } = this.props;
        return (
            <Spin tip="获取中..." spinning={isLoading} size={"large"}>
                <Card
                    bodyStyle={{padding: 0}}
                    loading={isLoading}
                >
                    <Carousel
                        emulateTouch
                        infiniteLoop
                        autoPlay
                        showThumbs={false}
                    >
                        {
                            brandInfo === undefined ? undefined :
                                brandInfo.brandPicList.map(function (item) {
                                    return (
                                        <Link to={"/" + item.type + "/" + item.id} key={item.id}>
                                            <div key={item.id}>
                                                <img src={item.url}
                                                     style={imgStyle}
                                                     key={item.id}
                                                />
                                                {/*<p className="legend">{item.title}</p>*/}
                                            </div>
                                        </Link>
                                    )
                                })
                        }

                    </Carousel>
                </Card>
            </Spin>
        )
    }
}

// props绑定state
const mapStateToProps = (state) => {
    const brandCarousel = state.brands.brandCarousel;
    return {
        isLoading: brandCarousel.isLoading,
        brandInfo: brandCarousel.brandInfo,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchBrandCarousel(brandId) {
            dispatch(Actions.Fetching(brandId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(carousel);

