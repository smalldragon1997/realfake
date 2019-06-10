import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Tooltip, List, Spin, Pagination, Tabs, Divider, Icon} from 'antd';
import * as Actions from '../actions';
import {Link} from 'react-router-dom'
import LikeToggle from '../../../common/likeToggle';
import * as CommodityActions from '../../../searchComponent/searchCommodityArea/actions';
import {getUniteList} from '../selector';

const TabPane = Tabs.TabPane;

const {Meta} = Card;

class usualCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brandId: undefined
        }
    }

// 初始化获取和持续获取，两个阶段
    componentDidMount() {

        if (this.props.uniteId !== undefined) {
            this.props.onInit(this.props.uniteId);
        }
    }

    render() {
        const {
            uniteId,
            brandList,
            isLogin,
            commList,
            isLoading,
            onLikeNewCommodity,
            onDislikeNewCommodity,
            showLoadMore,
            scrollId,
            uniteInfo,
            onFetchCommodities
        } = this.props;
        const {
            brandId
        } = this.state;
        const loadMore = !isLoading ? (
            showLoadMore ? (
                <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px', marginBottom: 20}}>
                    <Button onClick={() => {
                        onFetchCommodities(uniteId, scrollId)
                    }}>加载更多</Button>
                </div>
            ) : (
                <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px', marginBottom: 20}}>
                    已经加载全部
                </div>
            )
        ) : (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px', marginBottom: 20}}>
                <Spin/>
            </div>
        );
        return (

            <Tabs defaultActiveKey={brandList[0] === undefined ? 1 : brandList[0].brandId} onChange={(e) => {
                this.setState({brandId: e})
            }}>
                {
                    brandList === undefined ? undefined :
                        brandList.map(function (item) {
                            return (
                                <TabPane tab={<div style={{fontSize: 15}}>{item.brandName}</div>} key={item.brandId}>
                                    <div>
                                        {/*{   // 显示结果个数*/}
                                        {/*<Row type="flex" justify="space-between"*/}
                                        {/*style={{margin: "1.5%", marginTop: 0, marginBottom: 0, fontSize: 8}}>*/}
                                        {/*<Col span={6} style={{lineHeight: 3}}>*/}
                                        {/*{getUniteList(list, item.id).length}个结果*/}
                                        {/*</Col>*/}
                                        {/*</Row>*/}
                                        {/*}*/}
                                        <Divider style={{padding: "1%", margin: 0, fontSize: 20}}>{item.brandName + " "}
                                            联名 {uniteInfo !== undefined ? uniteInfo.uniteName : undefined} 专区</Divider>

                                        <Row>
                                            {
                                                // 遍历显示当前页面 商品数据
                                                commList
                                                    .filter((item1, index) => (
                                                        item1.brandId === item.brandId
                                                    ))
                                                    .map(function (item) {
                                                        return (
                                                            <Card // 商品卡片
                                                                key={item.commId}
                                                                bordered={false}
                                                                bodyStyle={{padding: 10, textAlign: "left"}}
                                                                hoverable
                                                                style={{
                                                                    width: "32%",
                                                                    textAlign: "center",
                                                                    display: "inline-block",
                                                                    margin: "0.5%",
                                                                    padding: "0.5%"
                                                                }}
                                                                cover={
                                                                    <Link to={"/commodities/" + item.commId}>
                                                                        <img src={item.cover}
                                                                             style={{width: "100%"}}
                                                                        />
                                                                    </Link>
                                                                }
                                                            >
                                                                <Meta //商品信息
                                                                    style={{paddingBottom: 10}}
                                                                    title={<span style={{fontWeight: "bold"}}>
                                                                    <Link to={"/commodities/"+item.commId}
                                                                          style={{fontSize: 20,color:item.isOut?"#ff0006":"#000"}}>
                                        {item.isOut?"等待补货:":""+item.title}
                                    </Link>
                                                    </span>}
                                                                    description={
                                                                        <Link to={"/commodities/" + item.commId}
                                                                              style={{color: "#6c6c6c"}}>
                                                                            <img //从虎扑偷的图
                                                                                src={"//sh1.hoopchina.com.cn/fis_static/trade/static/shihuo/images/t1_index_c492037.png"}/>
                                                                            {/*<Icon type="tags" theme="outlined"/>*/}
                                                                            {"" + item.describe.slice(0, 10) + "..."}
                                                                            <img
                                                                                src={"//sh1.hoopchina.com.cn/fis_static/trade/static/shihuo/images/t2_index_65ddcbc.png"}/>
                                                                        </Link>}
                                                                />
                                                                <Row type="flex" justify="space-between">
                                                                    <Col span={4}>
                                                    <span style={{
                                                        fontWeight: "bold",
                                                        color: "#098aff"
                                                    }}>{"￥" + item.price.reduce((price, next) => (next < price ? next : price), 9999)}</span>
                                                                    </Col>
                                                                    <Col span={10} style={{textAlign: "right"}}>

                                                                        <Icon type="eye" style={{color: "#0082ff"}}/>
                                                                        <span style={{marginRight: "10%"}}>
                                                {" " + item.glance}
                                            </span>

                                                                        <Icon type="heart" theme="filled"
                                                                              style={{fontSize: 15, color: "#0082ff"}}/>

                                                                        <span style={{marginRight: "10%"}}>
                                                {" " + item.like}
                                            </span>
                                                                    </Col>
                                                                </Row>
                                                                {/*<Row style={{fontSize: 8, paddingTop: 5}}>*/}
                                                                {/*{   // 将long整型毫秒数转化为日期格式，之前方便排序*/}
                                                                {/*new Date(item.date).Format("yyyy-MM-dd hh:mm:ss")*/}
                                                                {/*}*/}
                                                                {/*</Row>*/}
                                                            </Card>
                                                        )
                                                    })
                                            }
                                        </Row>

                                        <Row style={{textAlign: "center"}}>
                                            {loadMore}
                                        </Row>
                                    </div>

                                </TabPane>
                            )
                        })
                }
            </Tabs>

        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const header = state.header;
    const commodityArea = state.unite.commodityArea;
    const uniteCarousel = state.unite.uniteCarousel;
    return {
        brandList: header.brandList,
        uniteInfo: uniteCarousel.uniteInfo,
        commList: commodityArea.commList,
        scrollId: commodityArea.scrollId,
        isLoading: commodityArea.isLoading,
        showLoadMore: commodityArea.showLoadMore,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onSeriesClick: (id) => {
            console.log("点击了" + id);
            // dispatch();
        },
        onFetchCommodities: (uniteId, scrollId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching(uniteId, scrollId));
        },
        onInit: (uniteId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Init(uniteId));
        },
        // 收藏
        onLikeNewCommodity: (id, list) => {
            dispatch(CommodityActions.Like(id, list));
        },
        // 取消收藏
        onDislikeNewCommodity: (id, list) => {
            dispatch(CommodityActions.Dislike(id, list));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(usualCard);