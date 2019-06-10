import React from 'react';
import {connect} from 'react-redux';
import {
    Card,
    Row,
    Col,
    Avatar,
    Button,
    Popover,
    List,
    Spin,
    Pagination,
    Tabs,
    Divider,
    Radio,
    Icon,
    Tooltip
} from 'antd';
import * as Constants from '../../../../constants';
import * as Actions from '../actions';
import * as PrivacyActions from '../../../privacyComponent/privacyArea/actions';
import * as TradeActions from '../../../orderComponent/tradeArea/actions';
import {Link, withRouter} from 'react-router-dom'
import LikeToggle from '../../../common/likeToggle';
import * as CarActions from '../../../shareComponent/drawList/actions';
import {message} from 'antd';
import {getCommentsWithShow} from '../selector';
import Show from './show';
import Size from './size';

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Meta} = Card;

class infoArea extends React.Component {

    constructor(props) {
        super(props);
        // 回到页面顶部
        window.scrollTo(0, 0);
        this.state = {
            sizeId: undefined,
            qualityId: undefined,
            onlyShow: false
        };
        this.goTrade = this.goTrade.bind(this);
    }

    componentDidMount() {
        // 当brand为空时说明有可能是地址访问或者没有点击按钮就进入页面
        // 将路径的参数初始化为关键字即可 如果是关键字为undefined则saga获取数据前判断为获取全部数据
        if (this.props.commId !== undefined) {
            this.props.onFetchCommodity(this.props.commId);
            this.props.onFetchComments(this.props.commId);
        }
    }

    goTrade(commodity, qualId, sizeId) {
        setTimeout(()=>{
            this.props.onTradeInit();
        },1000);
        if (sizeId === undefined || qualId === undefined)
            message.error("请选择尺码和品质");
        else {
            // console.log({commodity,qualId,sizeId})
            this.props.history.push({pathname: '/orders/trade', state: {carList: [{commodity,qualId,sizeId}]}});
        }
    }

    render() {
        const {
            isLogin,
            commodityInfo,
            isLoading,
            onLikeNewCommodity,
            onDislikeNewCommodity,
            commentList,
            onAddCar,
            likeList,
            userInfo,
        } = this.props;

        const {
            onlyShow
        } = this.state;

        return (
            <div>
                {
                    commodityInfo === undefined ? (
                        <div style={{textAlign: "center", padding: "5%"}}>
                            <Spin tip="正在获取商品信息...请稍后"/>
                        </div>
                    ) : (
                        <Spin spinning={isLoading}>
                            <Divider>{commodityInfo.title}</Divider>
                            <div style={{padding: "2%", margin: "1%", backgroundColor: "#fff"}}>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={11} xxl={11}>
                                        {/*<Avatar src={info.cover} size={290} shape={"square"}/>*/}
                                        <Row>
                                            <img src={commodityInfo.cover} style={{width: "95%"}}/>
                                        </Row>
                                        <Row type="flex" align={"middle"} style={{height: 90, width: "95%"}}>
                                            <Col span={12} style={{textAlign: "center"}}>
                                                收藏人数{" "}
                                                <Icon type="heart" theme="filled"
                                                      style={{fontSize: 15, color: "#0082ff"}}/>
                                                <span style={{marginRight: "10%"}}>
                                                {" " + commodityInfo.like}
                                            </span>
                                            </Col>

                                            <Col span={12} style={{textAlign: "center"}}>
                                                浏览量{" "}
                                                <Icon type="eye" style={{color: "#0082ff"}}/>
                                                <span style={{marginRight: "10%"}}>
                                                {" " + commodityInfo.glance}
                                            </span>
                                            </Col>
                                            {/*<Col span={12}>*/}
                                            {/*<Row type="flex" align={"middle"}>*/}
                                            {/*<Col span={12} style={{textAlign: "center"}}>*/}
                                            {/*分享至*/}
                                            {/*</Col>*/}
                                            {/*<Col span={12}>*/}
                                            {/*<Row>*/}
                                            {/*<Icon type="weibo" theme="outlined"/> 微博*/}
                                            {/*</Row>*/}
                                            {/*<Row>*/}
                                            {/*<Icon type="wechat" theme="outlined"/> 微信*/}
                                            {/*</Row>*/}
                                            {/*<Row>*/}
                                            {/*<Icon type="qq" theme="outlined"/> QQ*/}
                                            {/*</Row>*/}
                                            {/*</Col>*/}
                                            {/*</Row>*/}
                                            {/*</Col>*/}
                                        </Row>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={13} xxl={13}>
                                        <Row style={{fontSize: 20}}>
                                            {commodityInfo.title}
                                        </Row>
                                        <Row style={{padding: "2%", marginTop: "2%", backgroundColor: "#eeeeee"}}
                                             type="flex" align={"middle"}>
                                            <Col span={17}>
                                                价格：
                                                <span
                                                    style={{
                                                        color: "#0fa0ff",
                                                        fontSize: 20,
                                                        fontWeight: "bold",
                                                        lineHeight: 3
                                                    }}>
                                        {
                                            this.state.qualityId === undefined ? (
                                                commodityInfo.commQualList.length > 1 ? (
                                                    "￥" + commodityInfo.commQualList.reduce((price, next) => next.price < price ? next.price : price, 99999)
                                                    + " - " + commodityInfo.commQualList.reduce((price, next) => next.price > price ? next.price : price, 0)
                                                ) : (
                                                    "￥" + commodityInfo.commQualList[0].price
                                                )
                                            ) : (
                                                "￥" + commodityInfo.commQualList.filter((item, index) => (
                                                    item.quality.qualId === this.state.qualityId
                                                ))[0].price
                                            )

                                        }
                                    </span>
                                            </Col>
                                            <Col span={7} style={{textAlign: "center"}}>
                                                <Row>
                                                    <Col span={14}>
                                                        <Row>
                                                            <span
                                                                style={{fontWeight: "bold"}}>{commentList.length}</span>
                                                        </Row>
                                                        <Row>
                                                            累计评论
                                                        </Row>
                                                    </Col>
                                                    <Col span={10}>
                                                        <Row>
                                                            <span
                                                                style={{fontWeight: "bold"}}>{commodityInfo.sales}</span>
                                                        </Row>
                                                        <Row>
                                                            成交量
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Divider style={{fontSize: 10}}>尺码 & 品质</Divider>

                                        <Row type="flex" align={"middle"}>
                                            <Col span={20}>
                                                <Row type="flex" align={"middle"}>
                                                    <Col span={4}>
                                                        鞋码：
                                                    </Col>
                                                    <Col span={20}>
                                                        <RadioGroup onChange={(e) => {
                                                            this.setState({sizeId: e.target.value});
                                                        }} buttonStyle={"solid"} size={"small"} style={{width: "100%"}}>
                                                            {
                                                                commodityInfo.sizeList.map(function (item) {
                                                                    return (
                                                                        <RadioButton value={item.sizeId}
                                                                                     key={item.sizeId}
                                                                                     style={{margin: "1%"}}>{item.value}</RadioButton>
                                                                    )
                                                                })
                                                            }
                                                        </RadioGroup>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" align={"middle"}>
                                                    <Col span={4}>
                                                        品质：
                                                    </Col>
                                                    <Col span={20}>
                                                        <RadioGroup onChange={(e) => {
                                                            this.setState({qualityId: e.target.value});
                                                        }} buttonStyle={"solid"} size={"small"} style={{width: "100%"}}>
                                                            {
                                                                commodityInfo.commQualList.map(function (item) {
                                                                    return (
                                                                        <RadioButton value={item.quality.qualId}
                                                                                     key={item.quality.qualName}
                                                                                     style={{margin: "1%"}}>
                                                                            {item.quality.qualName}
                                                                        </RadioButton>
                                                                    )
                                                                })
                                                            }
                                                        </RadioGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={4}
                                                 style={{
                                                     textAlign: "center",
                                                     fontSize: 10,
                                                     color: "red",
                                                     fontWeight: "bold"
                                                 }}>

                                                <Size images={[commodityInfo.brand.sizeTable]}
                                                      info={"本鞋尺码 " + commodityInfo.oversize}/>
                                                {commodityInfo.oversize}
                                            </Col>
                                        </Row>


                                        <Row type="flex" align={"middle"}>
                                            <Button size={"large"} type={"primary"} style={{margin: "2%"}}
                                                    disabled={commodityInfo.isOut}
                                                    onClick={() => {
                                                        this.goTrade(commodityInfo, this.state.qualityId,this.state.sizeId)
                                                    }}>立即购买</Button>
                                            <Button size={"large"} type={"danger"} style={{margin: "2%"}}
                                                    disabled={commodityInfo.isOut}
                                                    onClick={() => {
                                                        if (this.state.qualityId === undefined || this.state.sizeId === undefined) {
                                                            message.error("请先选择尺码和品质");
                                                        } else {
                                                            onAddCar({
                                                                commId: commodityInfo.commId,
                                                                userId: userInfo.userId,
                                                                qualId: this.state.qualityId,
                                                                sizeId: this.state.sizeId
                                                            })
                                                        }
                                                    }}>
                                                加入购物车
                                            </Button>
                                            <Button size={"large"}
                                                    type={likeList.reduce((isLike, next) => (isLike ? true : commodityInfo.commId === next.commodity.commId), false) ? "primary" : "dashed"}
                                                    style={{margin: "2%"}}
                                                    onClick={() => {
                                                        if (likeList.reduce((isLike, next) => (isLike ? true : commodityInfo.commId === next.commodity.commId), false)) {
                                                            onDislikeNewCommodity(userInfo.userId, commodityInfo.commId)
                                                        } else {
                                                            onLikeNewCommodity(userInfo.userId, commodityInfo.commId)
                                                        }
                                                    }}>
                                                {likeList.reduce((isLike, next) => (isLike ? true : commodityInfo.commId === next.commodity.commId), false) ? "取消收藏" : "收藏"}
                                            </Button>
                                        </Row>
                                        <Row type="flex" align={"middle"} style={{marginTop: "3%"}}>
                                            <Col span={3}>
                                                承诺：
                                            </Col>
                                            <Col span={20}>
                                                鞋底干净、鞋盒完好即可退换(不限时间)
                                            </Col>
                                        </Row>
                                        <Row type="flex" align={"middle"} style={{marginTop: "3%"}}>
                                            <Col span={3}>
                                                支付：
                                            </Col>
                                            <Col span={20}>
                                                <Icon type="wechat" theme="outlined"/> 微信 <Icon type="alipay"
                                                                                                theme="outlined"/>
                                                支付宝
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Divider style={{fontSize: 15, marginBottom: 0}}>本店不售卖通货 低版本比价勿扰</Divider>
                            </div>
                            <Tabs defaultActiveKey="1" style={{margin: "1%"}}>
                                <TabPane tab="商品细节" key="1">
                                    <Spin spinning={isLoading}>
                                        <div style={{backgroundColor: "#fff"}}>
                                            <Divider style={{padding: "2%", margin: 0, fontWeight: "bold"}}>材料工艺
                                                文案说明</Divider>
                                            <Row style={{fontSize: 17, padding: "4%", paddingTop: 0, paddingBottom: 0}}>

                                                <img
                                                    src={"//sh1.hoopchina.com.cn/fis_static/trade/static/shihuo/images/t1_index_c492037.png"}/>
                                                {commodityInfo.describe}
                                                <img
                                                    src={"//sh1.hoopchina.com.cn/fis_static/trade/static/shihuo/images/t2_index_65ddcbc.png"}/>

                                            </Row>
                                            <Divider
                                                style={{padding: "2%", margin: 0, fontWeight: "bold"}}>细节鉴赏</Divider>
                                            <Row type="flex" align={"middle"} justify="space-around">
                                                {
                                                    commodityInfo.commPicList.map(function (item, index) {
                                                        return (
                                                            <Col span={20} key={index} style={{marginBottom: "2%"}}>
                                                                <img src={item.url} width={"100%"}/>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </div>
                                    </Spin>
                                </TabPane>
                                <TabPane tab="累计评论" key="2">
                                    <Spin spinning={isLoading}>
                                        {
                                            commentList.length === 0 ? (
                                                <div style={{backgroundColor: "#fff"}}>
                                                    <Divider
                                                        style={{
                                                            padding: "2%",
                                                            margin: 0,
                                                            fontWeight: "bold"
                                                        }}>还没有人评论过哦~</Divider>
                                                </div>
                                            ) : (
                                                <div style={{backgroundColor: "#fff"}}>
                                                    <Row style={{textAlign: "center"}}>
                                                        <RadioGroup onChange={(e) => {
                                                            if (e.target.value === "1")
                                                                this.setState({onlyShow: false});
                                                            else
                                                                this.setState({onlyShow: true});
                                                        }} buttonStyle={"solid"} size={"small"} style={{width: "100%"}}>
                                                            <RadioButton value={"1"} style={{margin: "1%"}} key={1}>
                                                                全部({commentList.length})
                                                            </RadioButton>
                                                            <RadioButton value={"2"} style={{margin: "1%"}} key={2}>
                                                                有图({commentList.filter(item => item.showPicList.length !== 0).length})
                                                            </RadioButton>
                                                        </RadioGroup>
                                                    </Row>
                                                    {
                                                        this.state.onlyShow && commentList.filter(item => item.showPicList.length !== 0).length === 0 ? (
                                                            <div style={{backgroundColor: "#fff"}}>
                                                                <Divider
                                                                    style={{
                                                                        padding: "2%",
                                                                        margin: 0,
                                                                        fontWeight: "bold"
                                                                    }}>买家秀太少了~</Divider>
                                                            </div>
                                                        ) : (
                                                            commentList.map(function (item, index) {
                                                                return (
                                                                    <div key={index}>
                                                                        <Divider style={{margin: "2%"}}/>
                                                                        <Row>
                                                                            <Col span={4} style={{textAlign: "center"}}>
                                                                                <Row>
                                                                                    <Avatar src={item.userInfo.icon}
                                                                                            shape={"square"}
                                                                                            size={60}/>
                                                                                </Row>
                                                                                <Row style={{fontWeight: "bold"}}>
                                                                                    {item.userInfo.nickname}
                                                                                </Row>
                                                                                {/*<Row>*/}
                                                                                {/*买过 {item.buyTimes} 次*/}
                                                                                {/*</Row>*/}
                                                                            </Col>
                                                                            <Col span={19}>
                                                                                <Row style={{marginBottom: "1%"}}>
                                                                                    {item.content}
                                                                                </Row>
                                                                                <Row style={{marginBottom: "1%"}}>
                                                                                    {
                                                                                        item.showPicList.length !== 0 ? (
                                                                                            <Show
                                                                                                images={item.showPicList.reduce((show, next) => (show.concat(next.url)), [])}
                                                                                                comment={item.content}/>
                                                                                        ) : null
                                                                                    }
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col span={6}>
                                                                                        {   // 将long整型毫秒数转化为日期格式，之前方便排序
                                                                                            new Date(item.date).Format("yyyy-MM-dd hh:mm:ss")
                                                                                        }
                                                                                    </Col>
                                                                                    <Col span={6}
                                                                                         style={{textAlign: "center"}}>
                                                                                        尺码：{item.size}
                                                                                    </Col>
                                                                                    <Col span={6}>
                                                                                        品质：{item.qualName}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                        {
                                                                            item.reply === null ? null : (
                                                                                <Row style={{
                                                                                    margin: "2%",
                                                                                    color: "red"
                                                                                }}>
                                                                                    <Col span={4}>

                                                                                    </Col>
                                                                                    <Col span={3}>
                                                                                        小哥回复：
                                                                                    </Col>
                                                                                    <Col span={15}>
                                                                                        {item.reply}
                                                                                    </Col>
                                                                                </Row>
                                                                            )

                                                                        }
                                                                    </div>
                                                                )
                                                            })
                                                        )

                                                    }
                                                    <Divider style={{margin: "2%"}}/>
                                                </div>
                                            )
                                        }
                                    </Spin>
                                </TabPane>
                                <TabPane tab="售后说明" key="3">
                                    <div style={{backgroundColor: "#fff"}}>
                                        <Divider style={{padding: "2%", margin: 0, fontWeight: "bold"}}>鞋底干净</Divider>
                                        <Row type="flex" align={"middle"} justify="space-around">
                                            <Col span={20} style={{marginBottom: "2%"}}>
                                                <img
                                                    src={"https://shose-file.oss-cn-shenzhen.aliyuncs.com/shoseImg/common/type/sport.jpg"}
                                                    width={"100%"}/>
                                            </Col>
                                        </Row>
                                        <Divider style={{padding: "2%", margin: 0, fontWeight: "bold"}}>鞋盒完好</Divider>
                                        <Row type="flex" align={"middle"} justify="space-around">
                                            <Col span={20} style={{marginBottom: "2%"}}>
                                                <img
                                                    src={"https://shose-file.oss-cn-shenzhen.aliyuncs.com/shoseImg/common/type/sport.jpg"}
                                                    width={"100%"}/>
                                            </Col>
                                        </Row>
                                        <Divider style={{padding: "2%", margin: 0, fontWeight: "bold"}}>快递保护鞋盒</Divider>
                                        <Row type="flex" align={"middle"} justify="space-around">
                                            <Col span={20} style={{marginBottom: "2%"}}>
                                                <img
                                                    src={"https://shose-file.oss-cn-shenzhen.aliyuncs.com/shoseImg/common/type/sport.jpg"}
                                                    width={"100%"}/>
                                            </Col>
                                        </Row>
                                        <Divider
                                            style={{padding: "2%", margin: 0, fontWeight: "bold"}}>即可无条件退换</Divider>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Spin>
                    )
                }

            </div>

        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const infoArea = state.commodity.infoArea;
    const privacy = state.privacy.privacy;
    const header = state.header;
    return {
        commodityInfo: infoArea.commodityInfo,
        isLoading: infoArea.isLoading,
        commentList: infoArea.commentList,
        likeList: privacy.likeList,
        userInfo: header.userInfo
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchCommodity: (commId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching(commId));
        },
        onFetchComments: (commId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchComment(commId));
        },
        // 收藏
        onLikeNewCommodity: (userId, commId) => {
            dispatch(PrivacyActions.AddLike(userId, commId, localStorage.getItem("RealFakeJwt")));
            setTimeout(() => {
                dispatch(PrivacyActions.FetchLike(userId, localStorage.getItem("RealFakeJwt")));
            }, Constants.reFetchTimeOut);
        },
        // 取消收藏
        onDislikeNewCommodity: (userId, commId) => {
            dispatch(PrivacyActions.DelLike(userId, commId, localStorage.getItem("RealFakeJwt")));
            setTimeout(() => {
                dispatch(PrivacyActions.FetchLike(userId, localStorage.getItem("RealFakeJwt")));
            }, Constants.reFetchTimeOut);
        },
        // 购物车
        onAddCar: (carInfo) => {
            dispatch(PrivacyActions.AddCar(carInfo, localStorage.getItem("RealFakeJwt")));
            setTimeout(() => {
                dispatch(PrivacyActions.FetchCar(carInfo.userId, localStorage.getItem("RealFakeJwt")));
            }, 3000)
        },
        onTradeInit: () => {
            dispatch(PrivacyActions.TradeInit());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(infoArea));

function getMaxPrice(price) {
    let max = 0;
    for (let key = 0; key < price.length; key++) {
        if (price[key].price > max) {
            max = price[key].price;
        }
    }
    return max;
}


let compareRise = function (prop) {
    return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }
    }
};
