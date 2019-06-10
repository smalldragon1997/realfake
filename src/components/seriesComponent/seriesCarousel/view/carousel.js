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
        if (this.props.seriesId !== undefined)
            this.props.onFetchSeriesCarousel(this.props.seriesId);
    }


    render() {
        const {
            isLoading,
            seriesInfo // 轮播图数据列表
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
                            seriesInfo=== undefined ? undefined :
                            seriesInfo.seriesPicList.map(function (item) {
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
    const seriesCarousel = state.series.seriesCarousel;
    return {
        isLoading: seriesCarousel.isLoading,
        seriesInfo: seriesCarousel.seriesInfo,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchSeriesCarousel(seriesId) {
            dispatch(Actions.Fetching(seriesId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(carousel);

