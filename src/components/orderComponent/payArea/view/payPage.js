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
import {message} from 'antd';
import * as PrivacyActions from '../../../../components/privacyComponent/privacyArea/actions';
import CountDown from './countDown';
const Option = Select.Option;

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Step = Steps.Step;
const RadioGroup = Radio.Group;

class payArea extends React.Component {

    constructor(props) {
        super(props);
        // 回到页面顶部
        window.scrollTo(0, 0);
        if (this.props.location.state === undefined) {
            message.success("操作失效,返回主页");
            this.props.history.push("/");
        } else {
            message.success("正在生成二维码");
            const orderId = this.props.location.state;
            this.setState({
                orderId:orderId
            })
        }
    }

    render() {
        const {
            userInfo, // 用户信息
            isLoading, // 加载中
            payInfo, // 订单信息
            onFetchPayResult,
            payDone,
            onTestPayDone,
        } = this.props;

        console.log(payInfo)
        if(payDone){
            setTimeout(()=>this.props.history.push("/orders"),2000)

        }
        return (
            <Spin spinning={isLoading}>
                <Steps style={{padding: "2%", paddingBottom: 0}}>
                    <Step status="finish" title="确认订单" icon={<Icon type="solution"/>}/>
                    <Step status="process" title="支付订单" icon={<div><Icon type="wechat"/>&<Icon type="alipay"/></div>}/>
                    <Step status="wait" title="等待发货" icon={<Icon type="rocket"/>}/>
                    <Step status="wait" title="确认收货" icon={<Icon type="smile-o"/>}/>
                    <Step status="wait" title="评价订单" icon={<Icon type="like"/>}/>
                </Steps>
                <div style={{padding: "1%", margin: "2%", backgroundColor: "#fff"}}>
                    {
                        payInfo!==undefined ? (
                            <div>
                                <Divider style={{padding: "2%", margin: 0, fontSize: 20}}>{payInfo.data.istype==="1"?" 支付宝 ":" 微信 "}支付</Divider>
                                <Row type={"flex"} justify={"space-around"} align={"middle"} style={{textAlign:"center"}}>
                                    <Col span={12}>
                                        <Row style={{fontSize:20,color:"#1174dd",padding:"2%",fontWeight:5}}>
                                            请使用{payInfo.data.istype==="1"?" 支付宝 ":" 微信 "}扫码支付
                                        </Row>
                                        <Row style={{fontSize:20,color:"#1174dd",padding:"2%"}}>
                                            ￥{payInfo.data.realprice}
                                        </Row>
                                        <Row>
                                            <img src={"https://www.kuaizhan.com/common/encode-png?large=true&data="+payInfo.data.qrcode}/>
                                        </Row>
                                        <Row style={{fontSize:20,color:"#1174dd",padding:"2%"}}>
                                            请使用另一台手机支付,二维码有效时间为5分钟
                                        </Row>
                                        <Row style={{fontSize:20,color:"#1174dd",fontWeight:5}}>
                                            {payInfo.msg}
                                        </Row>

                                        <Row style={{fontSize:20,color:"#1174dd",padding:"2%"}}>
                                            订单号:{payInfo.data.orderId}
                                        </Row>
                                        <Row type={"flex"} justify={"space-around"} align={"middle"}>
                                            <Col span={12}>
                                                <Button type={"primary"} onClick={()=>{
                                                    // onFetchPayResult(userInfo.userId,payInfo.data.orderId);
                                                    onTestPayDone(payInfo.data.payId);
                                                }}>
                                                    我已支付
                                                </Button>
                                            </Col>
                                        </Row>
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
                                }}>请稍后</Divider>
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
        userInfo:header.userInfo,
        isLoading: privacy.isLoading,
        orderInfo:privacy.orderInfo,
        payDone:privacy.payDone,
        payInfo:privacy.payInfo,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPayResult: (userId,orderId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchPayResult(userId,orderId,localStorage.getItem("RealFakeJwt")));
        },
        onTestPayDone: (payId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.TestPayDone(payId));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(payArea));

