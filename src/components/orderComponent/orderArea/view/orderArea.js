import React from 'react';
import {connect} from 'react-redux';
import {
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
    Tag,Badge
} from 'antd';
import * as Actions from '../actions';
import {actions as PrivacyActions} from '../../../privacyComponent/privacyArea';
import * as AfterSaleActions from '../../afterSaleArea/actions';
import {Link, withRouter} from 'react-router-dom'
import {message} from 'antd';
import * as Constants from '../../../../constants';
import OrderList from './orderList';
import AfterSaleList from './afterSaleList';
import {getOrderByState} from '../selector';
import user from "../../../shareComponent/user/view/user";

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;


class orderArea extends React.Component {

    constructor(props) {
        super(props);
        // 回到页面顶部
        window.scrollTo(0, 0);

        this.goPay = this.goPay.bind(this);
        this.goDeliver = this.goDeliver.bind(this);
        this.goTake = this.goTake.bind(this);
        this.goEvaluate = this.goEvaluate.bind(this);
        this.goAfterSale = this.goAfterSale.bind(this);
        this.goApplyAfterSale = this.goApplyAfterSale.bind(this);
        this.goDone = this.goDone.bind(this);
    }


    componentDidMount(){
        if(this.props.userInfo!==undefined){
            this.props.onFetchProcessOrderList(this.props.userInfo.userId);
        }
        // 保持二维码的干净
        this.props.onPayStateInit();
    }

    // 防止刷新页面 未完成订单列表没有自动获取
    componentWillReceiveProps(nextProps) {
        if (nextProps.userInfo !== this.props.userInfo&&nextProps.userInfo!==undefined) {
            this.props.onFetchProcessOrderList(nextProps.userInfo.userId);
        }
    }

    // 去已完成页面
    goDone(userId,orderId) {
        this.props.history.push({
            pathname: '/orders/done', state: {
                userId:userId,
                orderId: orderId
            }
        });
    }
    // 去支付页面
    goPay(userId,orderId) {
        this.props.history.push({
            pathname: '/orders/pay', state: {
                userId:userId,
                orderId: orderId
            }
        });
    }
    // 去待发货页面
    goDeliver(userId,orderId) {
        this.props.history.push({
            pathname: '/orders/deliver', state: {
                userId:userId,
                orderId: orderId
            }
        });
    }
    // 去收货页面
    goTake(userId,orderId) {
        this.props.history.push({
            pathname: '/orders/take', state: {
                userId:userId,
                orderId: orderId
            }
        });
    }
    // 去评价页面
    goEvaluate(userId,orderId) {
        this.props.history.push({
            pathname: '/orders/evaluate', state: {
                userId:userId,
                orderId: orderId
            }
        });
    }

    // 去申请售后页面
    goApplyAfterSale(orderInfo,commId) {
        this.props.history.push({
            pathname: '/orders/applyAfterSale', state: {
                orderInfo:orderInfo,
                commId:commId
            }
        });
    }

    //
    goAfterSale(userId,aftId) {
        this.props.history.push({
            pathname: '/orders/afterSale', state: {
                userId:userId,
                aftId: aftId
            }
        });
    }

    render() {
        const {
            processOrderList,
            doneOrderList,
            userInfo, // 用户
            afterSaleList, // 售后订单
            isLoading, // 加载中
            onCancelOrder, // 取消订单
            onCancelAfterSale, // 取消售后
            onCommit,
            onPay,
            onConfirm,
            onEvaluate,
            onApplyAfterSale,
            onUpdateAfterSale,
            onDeleteOrder,
            onConfirmOrder,

            onFetchDoneOrderList,
            onFetchProcessOrderList,
            onFetchAfterSaleList,
        } = this.props;

        return (
            <Spin spinning={isLoading}>
                <div style={{padding: "1%", margin: "2%", backgroundColor: "#fff"}}>
                    <Divider style={{padding: "2%", margin: 0, fontWeight: "bold", fontSize: 18}}>我的订单</Divider>
                    {
                        userInfo!==undefined ? (
                            <Tabs defaultActiveKey="1" style={{textAlign:"center"}} onChange={(key)=>{
                                if(key==="0"){
                                    onFetchDoneOrderList(userInfo.userId);
                                }else if(key==="5"){
                                    onFetchAfterSaleList(userInfo.userId);
                                }
                            }}>
                                <TabPane tab={<Row type={"flex"} align={"middle"} style={{fontWeight: "bold"}}>待付款订单<Badge count={processOrderList.filter(item=>item.state===1).length} style={{marginLeft:3}}/></Row>} key="1">
                                    <OrderList list={processOrderList.filter(item=>item.state===1)} actions={{
                                        cancelOrder:onCancelOrder,
                                        cancelOrderConfirm:cancelOrderConfirm,
                                        goPay:this.goPay
                                    }} userId={userInfo.userId}/>
                                </TabPane>
                                <TabPane tab={<Row type={"flex"} align={"middle"} style={{fontWeight: "bold"}}>待发货订单<Badge count={processOrderList.filter(item=>item.state===2).length} style={{marginLeft:3}}/></Row>} key="2">
                                    <OrderList list={processOrderList.filter(item=>item.state===2)} actions={{
                                        goDeliver:this.goDeliver,
                                        goApplyAfterSale:this.goApplyAfterSale,
                                    }} userId={userInfo.userId}/>
                                </TabPane>
                                <TabPane tab={<Row type={"flex"} align={"middle"} style={{fontWeight: "bold"}}>待收货订单<Badge count={processOrderList.filter(item=>item.state===3).length} style={{marginLeft:3}}/></Row>} key="3">
                                    <OrderList list={processOrderList.filter(item=>item.state===3)} actions={{
                                        goEvaluate:this.goEvaluate,
                                        goApplyAfterSale:this.goApplyAfterSale,
                                        onConfirmOrder:onConfirmOrder,
                                        goTake:this.goTake,
                                    }} userId={userInfo.userId}/>
                                </TabPane>
                                <TabPane tab={<Row type={"flex"} align={"middle"} style={{fontWeight: "bold"}}>待评价订单<Badge count={processOrderList.filter(item=>item.state===4).length} style={{marginLeft:3}}/></Row>} key="4">
                                    <OrderList list={processOrderList.filter(item=>item.state===4)} actions={{
                                        goEvaluate:this.goEvaluate,
                                        goApplyAfterSale:this.goApplyAfterSale,
                                    }} userId={userInfo.userId}/>
                                </TabPane>
                                <TabPane tab={<Row type={"flex"} align={"middle"} style={{fontWeight: "bold"}}>售后&退款</Row>} key="5">
                                    <AfterSaleList list={afterSaleList} actions={{
                                        goAfterSale:this.goAfterSale,
                                        cancelAfterSale:onCancelAfterSale,
                                        cancelAfterSaleConfirm:cancelAfterSaleConfirm
                                    }} userId={userInfo.userId}/>
                                </TabPane>
                                <TabPane tab={<Row type={"flex"} align={"middle"} style={{fontWeight: "bold"}}>已完成订单</Row>} key="0">
                                    <OrderList list={doneOrderList} actions={{
                                        deleteOrder:onDeleteOrder,
                                        deleteOrderConfirm:deleteOrderConfirm,
                                        goDone:this.goDone,
                                    }} userId={userInfo.userId}/>
                                </TabPane>
                            </Tabs>
                        ) : (
                            <Divider
                                style={{padding: "2%", margin: 0, fontWeight: "bold", fontSize: 18}}>登录后查看我的订单</Divider>
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
        afterSaleList: privacy.afterSaleList,
        processOrderList: privacy.processOrderList,
        doneOrderList: privacy.doneOrderList,
        isLoading: privacy.isLoading,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {

        onCommit: (info) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.CommitOrder(info,localStorage.getItem("RealFakeJwt")));
        },
        onPay: (info) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.PayOrder(info,localStorage.getItem("RealFakeJwt")));
        },
        onConfirm: (info) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.ConfirmOrder(info,localStorage.getItem("RealFakeJwt")));
        },
        onEvaluate: (info) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.Evaluate(info,localStorage.getItem("RealFakeJwt")));
        },
        onCancelOrder: (userId,orderId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.DeleteOrder(userId,orderId,localStorage.getItem("RealFakeJwt")));
            setTimeout(()=>{
                dispatch(PrivacyActions.FetchProcessOrderList(userId,localStorage.getItem("RealFakeJwt")));
            },Constants.reFetchTimeOut)
        },
        onCancelAfterSale: (info) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.CancelAfterSale(info,localStorage.getItem("RealFakeJwt")));
            setTimeout(()=>{
                dispatch(PrivacyActions.FetchAfterSaleList(info.userId,localStorage.getItem("RealFakeJwt")));
                dispatch(PrivacyActions.FetchProcessOrderList(info.userId, localStorage.getItem("RealFakeJwt")));
            },Constants.reFetchTimeOut)
        },
        onApplyAfterSale: (info) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.ApplyAfterSale(info,localStorage.getItem("RealFakeJwt")));
        },
        onUpdateAfterSale: (info) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.UpdateAfterSale(info,localStorage.getItem("RealFakeJwt")));
        },
        onDeleteOrder: (userId,orderId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.DeleteOrder(userId,orderId,localStorage.getItem("RealFakeJwt")));
            setTimeout(()=>{
                dispatch(PrivacyActions.FetchDoneOrderList(userId,localStorage.getItem("RealFakeJwt")));
            },Constants.reFetchTimeOut)
        },
        onFetchProcessOrderList: (userId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchProcessOrderList(userId, localStorage.getItem("RealFakeJwt")));
        },
        onFetchDoneOrderList: (userId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchDoneOrderList(userId, localStorage.getItem("RealFakeJwt")));
        },
        onFetchAfterSaleList: (userId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchAfterSaleList(userId, localStorage.getItem("RealFakeJwt")));
        },
        onPayStateInit: () => {
            dispatch(PrivacyActions.PayStateInit());
        },
        onConfirmOrder: (info) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.ConfirmOrder(info,localStorage.getItem("RealFakeJwt")));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(orderArea));


// 需要重新获取订单列表
// 删除订单操作
function deleteOrderConfirm(userId,orderId,onDeleteOrder) {
    confirm({
        cancelText:"点错了",
        okText:"删除订单",
        title: '删除订单',
        okType:"dashed",
        content: '确认删除订单？',
        onOk() {
            onDeleteOrder(userId,orderId);
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch((e) => console.log(e));
        },
        onCancel() {},
    });
}

// 取消订单操作
function cancelAfterSaleConfirm(info,onCancelAfterSale) {
    confirm({
        cancelText:"点错了",
        okText:"取消售后",
        title: '撤回售后申请',
        okType:"dashed",
        content: '确认撤回售后？有问题可用咨询客服微信：1059172012',
        onOk() {
            onCancelAfterSale(info);

            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch((e) => console.log(e));
        },
        onCancel() {},
    });
}

// 取消订单操作
function cancelOrderConfirm(userId,orderId,onCancelOrder) {
    confirm({
        cancelText:"点错了",
        okText:"取消订单",
        title: '取消订单',
        okType:"dashed",
        content: '取消订单后将删除此未付款订单',
        onOk() {
            onCancelOrder(userId,orderId);
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch((e) => console.log(e));
        },
        onCancel() {},
    });
}

// 将订单按时间靠前顺序排序
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

