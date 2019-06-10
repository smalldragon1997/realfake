import React from 'react';
import {connect} from 'react-redux';
import {
    Steps,
    Modal,
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
    Table,
    Tag, Select, Input
} from 'antd';
import * as Actions from '../actions';
import {Link, withRouter} from 'react-router-dom'
import * as PrivacyActions from '../../../../components/privacyComponent/privacyArea/actions';
import {message} from 'antd';

const Option = Select.Option;

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Step = Steps.Step;
const RadioGroup = Radio.Group;

class deliverArea extends React.Component {

    constructor(props) {
        super(props);
        // 回到页面顶部
        window.scrollTo(0, 0);
        // 如果直接访问 返回主页
        if (this.props.location.state === undefined) {
            message.success("操作失效,返回主页");
            this.props.history.push("/");
        } else {
            message.success("正在加载订单信息");
            const info = this.props.location.state;
            // 获取订单信息，由订单页面传来的用户id，订单id
            this.props.onFetchOrderInfo(info.userId, info.orderId);

        }
        this.goApplyAfterSale = this.goApplyAfterSale.bind(this);
        this.goAfterSale = this.goAfterSale.bind(this);
    }

    // 去申请售后页面
    goApplyAfterSale(orderInfo, commId) {
        this.props.history.push({
            pathname: '/orders/applyAfterSale', state: {
                orderInfo: orderInfo,
                commId: commId
            }
        });
    }

    // 去售后页面
    goAfterSale(userId, orderId) {
        this.props.history.push({
            pathname: '/orders/afterSale', state: {
                userId: userId,
                orderId: orderId
            }
        });
    }

    render() {
        const {
            userInfo, // 用户信息
            isLoading, // 加载中
            orderInfo, // 订单信息
        } = this.props;


        return (
            <Spin spinning={isLoading}>
                <Steps style={{padding: "2%", paddingBottom: 0}}>
                    <Step status="finish" title="确认订单" icon={<Icon type="solution"/>}/>
                    <Step status="finish" title="支付订单" icon={<div><Icon type="wechat"/>&<Icon type="alipay"/></div>}/>
                    <Step status="process" title="等待发货" icon={<Icon type="rocket"/>}/>
                    <Step status="wait" title="确认收货" icon={<Icon type="smile-o"/>}/>
                    <Step status="wait" title="评价订单" icon={<Icon type="like"/>}/>
                </Steps>
                <div style={{padding: "1%", margin: "2%", backgroundColor: "#fff"}}>
                    {
                        orderInfo !== undefined ? (
                            <div>
                                <Divider style={{padding: "2%", margin: 0, fontSize: 18}}>订单信息</Divider>
                                <Row type={"flex"} justify={"space-around"} align={"middle"}
                                     style={{textAlign: "center"}}>
                                    <Col span={10}>
                                        <Row>
                                            订单号：{orderInfo.orderId}
                                        </Row>
                                        <Row>
                                            交易号：{orderInfo.payId}
                                        </Row>
                                    </Col>
                                    <Col span={7}>
                                        创建时间：{new Date(orderInfo.date).Format("yyyy-MM-dd hh:mm:ss")}
                                    </Col>
                                    <Col span={7}>
                                        支付时间：{new Date(orderInfo.payDate).Format("yyyy-MM-dd hh:mm:ss")}
                                    </Col>
                                </Row>
                                <Row
                                    style={{textAlign: "center", backgroundColor: "#f5f5f5", padding: 1, margin: "1%"}}>
                                    <Col>
                                        <Row style={{padding: "1%"}}>
                                            <Col span={8}>
                                                商品信息
                                            </Col>
                                            <Col span={4}>
                                                配送方式
                                            </Col>
                                            <Col span={4}>
                                                优惠方式
                                            </Col>
                                            <Col span={4}>
                                                实付款
                                            </Col>
                                            <Col span={3}>
                                                操作
                                            </Col>
                                        </Row>
                                        {
                                            orderInfo !== undefined ? (
                                                <Row style={{padding: "1%", backgroundColor: "#fff"}} type={"flex"}
                                                     align={"middle"}>
                                                    <Col span={8}>
                                                        {
                                                            orderInfo.commOrderList.map(function (item, index) {
                                                                return (
                                                                    <Row key={index} style={{
                                                                        marginTop: "2%",
                                                                        marginBottom: "2%"
                                                                    }}
                                                                         type={"flex"} align={"middle"}
                                                                    >
                                                                        <Col span={24}>
                                                                            <Row>
                                                                                <Col span={10}>
                                                                                    <Link
                                                                                        to={"/commodities/" + item.commodity.commId}>
                                                                                        <Avatar src={item.cover}
                                                                                                size={90}
                                                                                                shape={"square"}/>
                                                                                    </Link>
                                                                                </Col>
                                                                                <Col span={14}
                                                                                     style={{textAlign: "left"}}>
                                                                                    <Row>
                                                                                        <Link style={{color: "#000"}}
                                                                                              to={"/commodities/" + item.commodity.commId}>
                                                                                            {item.title}
                                                                                        </Link>
                                                                                    </Row>
                                                                                    <Row>
                                                                                        码数：{item.size}
                                                                                    </Row>
                                                                                    <Row>
                                                                                        品质：{item.qualName}
                                                                                    </Row>
                                                                                    <Row>
                                                                                        价格：￥{item.price}
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                )
                                                            })
                                                        }
                                                    </Col>
                                                    <Col span={4}>
                                                        {orderInfo.express.expName}：
                                                        {orderInfo.express.price === 0 ? (
                                                            "包邮"
                                                        ) : (orderInfo.express.price + "元")}
                                                    </Col>
                                                    <Col span={4}>
                                                        {
                                                            orderInfo.discount === null ? ("无优惠") : (
                                                                <span>
                                                                    {orderInfo.discount.disName}：
                                                                    {orderInfo.discount.price + "元"}
                                                                </span>
                                                            )
                                                        }
                                                    </Col>
                                                    <Col span={4} style={{color: "#00a9ff"}}>
                                                        ￥{orderInfo.total}
                                                    </Col>
                                                    <Col span={3} style={{color: "#00a9ff", textAlign: "center"}}>
                                                        {
                                                            orderInfo.commOrderList.map((item, index) => (
                                                                item.state === 0 ? (
                                                                    <Button type={"danger"} style={{width: "100%"}}
                                                                            onClick={() => {
                                                                                message.success("申请跳转中...");
                                                                                this.goApplyAfterSale(orderInfo, item.commodity.commId);
                                                                            }}>申请退款</Button>
                                                                ) : (
                                                                    item.state === 3 ? (
                                                                        <Tag color="blue">售后处理成功</Tag>
                                                                    ) : (
                                                                        item.state === 4 ? (
                                                                            <Tag color="red">售后处理成功</Tag>
                                                                        ) : (
                                                                            <Tag color="red">售后处理中</Tag>
                                                                        )
                                                                    )
                                                                )
                                                            ))
                                                        }
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <Divider
                                                    style={{padding: "2%", margin: 0, fontSize: 18}}>订单参数错误</Divider>
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row style={{padding: "1%", backgroundColor: "#fff"}}>
                                    <Col span={24}
                                         style={{textAlign: "right", fontSize: 15}}>
                                        买家留言：{orderInfo.message === null ? ("无") : (orderInfo.message)}
                                    </Col>
                                </Row>
                                <Row style={{padding: "1%", backgroundColor: "#fff"}}>
                                    <Col span={24}
                                         style={{textAlign: "right", fontSize: 18}}>
                                        收货地址：{orderInfo.address.area + " " + orderInfo.address.detail + " "
                                    + orderInfo.address.name + "收 " + orderInfo.address.tel}
                                    </Col>
                                </Row>
                                <Row style={{padding: "1%", backgroundColor: "#fff"}}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={{span: 8, offset: 16}}
                                         xxl={{span: 8, offset: 16}}
                                         style={{backgroundColor: "#00a9ff"}}>
                                        <Button type={"primary"} style={{width: "100%"}}
                                                onClick={() => {
                                                    message.success("快马加鞭中...");
                                                }}>催小哥发货</Button>
                                    </Col>
                                </Row>
                                <Row style={{padding: "1%", backgroundColor: "#fff"}}>
                                    <Col span={24}
                                         style={{textAlign: "right", fontSize: 15, color: "red"}}>
                                        如有紧急事项可添加客服微信 1059172012
                                    </Col> <Col span={24}
                                                style={{textAlign: "right", fontSize: 15, color: "red"}}>
                                    提供订单号说明问题
                                </Col>
                                </Row>
                            </div>
                        ) : (
                            <Divider
                                style={{
                                    padding: "2%",
                                    margin: 0,
                                    fontWeight: "bold",
                                    fontSize: 18
                                }}>若加载时间过长请刷新</Divider>
                        )
                    }
                </div>
            </Spin>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const privacy = state.privacy.privacy;
    const header = state.header;
    return {
        userInfo: header.userInfo,
        isLoading: privacy.isLoading,
        orderInfo: privacy.orderInfo,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrderInfo: (userId, orderId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchOrderInfo(userId, orderId, localStorage.getItem("RealFakeJwt")));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(deliverArea));

