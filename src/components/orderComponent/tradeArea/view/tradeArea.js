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
import * as HeaderActions from '../../../shareComponent/header/actions';
import * as PrivacyActions from '../../../../components/privacyComponent/privacyArea/actions';
import {Link, withRouter} from 'react-router-dom'
import {message} from 'antd';
import user from "../../../shareComponent/user/view/user";

const Option = Select.Option;

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Step = Steps.Step;
const RadioGroup = Radio.Group;

class tradeArea extends React.Component {

    constructor(props) {
        super(props);
        // 回到页面顶部
        window.scrollTo(0, 0);
        // 如果直接访问 返回主页
        if (this.props.location.state === undefined) {
            message.success("操作失效,返回主页");
            this.state = {
                carList: undefined
            };
            this.props.history.push("/");
        } else {
            message.success("正在计算");
            // 初始化次选操作 留言、制定快递、选择优惠卷
            this.state = {
                carList: this.props.location.state.carList,
                message: undefined,
                expressId: undefined,
                discountId: undefined,
                addressId:undefined
            };
            // 获取可选快递
            this.props.onFetchExpress();
            this.props.onTradeInit();
        }
        this.goPay = this.goPay.bind(this);
    }


    componentDidMount(){
        if(this.props.userInfo!==undefined){
            this.props.onFetchDiscountList(this.props.userInfo.userId);
            this.props.onFetchAddressList(this.props.userInfo.userId);
        }
    }


    // 去支付页面
    goPay(userId,orderId) {
        this.props.onTradeInit();
        this.props.history.push({
            pathname: '/orders/pay', state: {
                userId:userId,
                orderId: orderId
            }
        });
    }

    render() {
        const {
            userInfo, // 用户id
            expressList, // 可选快递列表
            addressList, // 地址列表
            privacyIsLoading, // 加载中
            headerIsLoading, // 加载中
            discountList, // 优惠券列表
            orderInfo,
            onCommitOrder
        } = this.props;

        const {
            carList,
            message,
            expressId,
            discountId,
            addressId
        } = this.state;

        // 如果订单信息不为空，则跳转至支付页面
        if(orderInfo!==undefined){
            setTimeout(()=>this.goPay(userInfo.userId,orderInfo.orderId),1500)
        }

        console.log(this.state);
        return (
            <Spin spinning={privacyIsLoading||headerIsLoading}>
                <Steps style={{padding: "2%", paddingBottom: 0}}>
                    <Step status="process" title="确认订单" icon={<Icon type="solution"/>}/>
                    <Step status="wait" title="支付订单" icon={<div><Icon type="wechat"/>&<Icon type="alipay"/></div>}/>
                    <Step status="wait" title="等待发货" icon={<Icon type="rocket"/>}/>
                    <Step status="wait" title="确认收货" icon={<Icon type="smile-o"/>}/>
                    <Step status="wait" title="评价订单" icon={<Icon type="like"/>}/>
                </Steps>
                <div style={{padding: "1%", margin: "2%", backgroundColor: "#fff"}}>
                    {
                        userInfo!==undefined ? (
                            <div>
                                <Divider style={{padding: "2%", margin: 0, fontSize: 18}}>选择收货地址</Divider>
                                {
                                    addressList.length === 0 ? (
                                        <div>
                                            <Row style={{textAlign: "center"}}>你还没有收货地址</Row>
                                            <Row style={{textAlign: "center"}}>
                                                <Link to="/privacy/address">添加收货地址</Link>
                                            </Row>
                                        </div>
                                    ) : (
                                        <div>
                                            <Row>
                                                <Col style={{textAlign: "center"}}>
                                                    <RadioGroup onChange={(e) => {
                                                        this.setState({
                                                            ...this.state,
                                                            addressId: e.target.value
                                                        });
                                                    }}>

                                                        {
                                                            addressList.map(function (item, index) {
                                                                const address = item.area + " " + item.detail + " ("
                                                                    + item.name + " 收) " + item.tel;
                                                                return (
                                                                    <Row key={index}>
                                                                        <Radio value={item.addId}>{address}</Radio>
                                                                    </Row>
                                                                )
                                                            })
                                                        }
                                                    </RadioGroup>
                                                </Col>
                                            </Row>
                                            <Row style={{margin: "2%"}}>
                                                <Col style={{textAlign: "center"}}>
                                                    你也可以<Link to="/privacy/address"> 管理收货地址</Link>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                }
                                <Divider style={{padding: "2%", margin: 0, fontSize: 18}}>确认订单信息</Divider>
                                <Row
                                    style={{textAlign: "center", backgroundColor: "#f5f5f5", padding: 1, margin: "1%"}}>
                                    <Col>
                                        <Row style={{padding: "1%"}}>
                                            <Col span={8}>
                                                商品信息
                                            </Col>
                                            <Col span={5}>
                                                尺码
                                            </Col>
                                            <Col span={5}>
                                                品质
                                            </Col>
                                            <Col span={5}>
                                                价格
                                            </Col>
                                        </Row>
                                        {
                                            carList!==undefined ? (
                                                carList.map(function (item, index) {
                                                    return (
                                                        <Row key={index}
                                                             style={{padding: "1%", backgroundColor: "#fff"}}
                                                             type={"flex"} align={"middle"}
                                                        >
                                                            <Col span={8}>
                                                                <Row>
                                                                    <Col span={10}>
                                                                        <Link
                                                                            to={"/commodities/" + item.commodity.commId}>
                                                                            <Avatar src={item.commodity.cover}
                                                                                    size={80}
                                                                                    shape={"square"}/>
                                                                        </Link>
                                                                    </Col>
                                                                    <Col span={14}
                                                                         style={{textAlign: "left"}}>
                                                                        <Row>
                                                                            <Link style={{color: "#000"}}
                                                                                  to={"/commodities/" + item.commodity.commId}>
                                                                                {item.commodity.title}
                                                                            </Link>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col span={5}>
                                                                {item.commodity.sizeList.filter(item1=>item1.sizeId===item.sizeId)[0].value}
                                                            </Col>
                                                            <Col span={5}>
                                                                {item.commodity.commQualList.filter(item1=>item1.quality.qualId===item.qualId)[0].quality.qualName}
                                                            </Col>
                                                            <Col span={5}>
                                                                ￥{item.commodity.commQualList.filter(item1=>item1.quality.qualId===item.qualId)[0].price}
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            ) : (
                                                <Divider
                                                    style={{padding: "2%", margin: 0, fontSize: 18}}>订单参数错误</Divider>
                                            )
                                        }
                                        <Row style={{padding: "1%"}}>
                                            <Col span={12}>
                                                <Row style={{margin: "2%"}} type={"flex"} align={"middle"}>
                                                    <Col span={8} style={{textAlign: "right"}}>
                                                        给客服留言：
                                                    </Col>
                                                    <Col span={16}>
                                                        <Input placeholder="与客服协商的事项" value={message}
                                                               onChange={(e) => {
                                                                   // 输入昵称时修改
                                                                   this.setState({
                                                                       message: e.target.value
                                                                   })
                                                               }}/>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row style={{margin: "2%"}} type={"flex"} align={"middle"}>
                                                    <Col span={8} style={{textAlign: "right"}}>
                                                        选择优惠方式：
                                                    </Col>
                                                    <Col span={16}>
                                                        <Select style={{width: "50%"}} placeholder={"不选择优惠"}
                                                                onChange={(e) => {
                                                                        this.setState({
                                                                            ...this.state,
                                                                            discountId: e
                                                                        });
                                                                    console.log(this.state);
                                                                }}>
                                                            {
                                                                discountList.map(function (item, index) {
                                                                    return (
                                                                        <Option value={item.disId}
                                                                                key={index}>{item.disName}：{item.price + "元"}</Option>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </Col>

                                                </Row>
                                                <Row style={{margin: "2%"}} type={"flex"} align={"middle"}>
                                                    <Col span={8} style={{textAlign: "right"}}>
                                                        选择配送方式：
                                                    </Col>
                                                    <Col span={16}>
                                                        <Select style={{width: "50%"}} onChange={(e) => {
                                                            this.setState({
                                                                ...this.state,
                                                                expressId: e
                                                            });
                                                        }}>
                                                            {
                                                                expressList.map(function (item, index) {
                                                                    return (
                                                                        <Option value={item.expId}
                                                                                key={index}>{item.expName}：{
                                                                            item.price === 0 ? ("包邮") : (item.price + "元")
                                                                        }</Option>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </Col>
                                                </Row>
                                                <Row style={{margin: "2%"}} type={"flex"} align={"middle"}>
                                                    <Col span={8} style={{textAlign: "right"}}>
                                                        发货时间：
                                                    </Col>
                                                    <Col span={16}>
                                                        2日内发货
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        <Divider style={{margin:0,}}/>
                                        <Row style={{padding: "1%",backgroundColor:"#fff"}}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={{ span: 8, offset: 16 }} xxl={{ span: 8, offset: 16 }}
                                                 style={{backgroundColor:"#00a9ff"}}>
                                                <Row style={{backgroundColor:"#fff",margin:3}}>
                                                    <Col style={{textAlign:"right",padding:"2%"}}>
                                                        <Row  type={"flex"} align={"middle"}>
                                                            <span style={{fontSize:18}}>实付款：</span>
                                                            <span style={{fontSize:25,color:"#00a9ff",fontWeight:"bold"}}>
                                                                ￥
                                                            {
                                                                carList===undefined?(
                                                                    <Divider
                                                                        style={{padding: "2%", margin: 0, fontSize: 18}}>订单参数错误</Divider>
                                                                ):(
                                                                    getExpress(expressId,expressList)
                                                                    -getDisCount(discountId,discountList)
                                                                    +carList.reduce(function (total,item) {
                                                                        return total + item.commodity.commQualList.filter(item1=>item1.quality.qualId===item.qualId)[0].price;
                                                                    },0)
                                                                )
                                                            }
                                                            </span>
                                                        </Row>
                                                        <Row  type={"flex"} align={"middle"}>
                                                            <span style={{fontSize:18}}>收货地址：</span>
                                                            <span style={{fontSize:15,fontWeight:"bold"}}>
                                                            {
                                                                addressId===undefined?(
                                                                    <Divider>请选择收货地址</Divider>
                                                                ):(
                                                                    getAddress(addressId,addressList)
                                                                )
                                                            }
                                                            </span>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row style={{padding: "1%",backgroundColor:"#fff"}}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={{ span: 8, offset:16 }} xxl={{ span: 8, offset: 16 }}>
                                                <Button type={"primary"} style={{width:"100%"}}
                                                        onClick={()=>{
                                                    if(addressId===undefined||expressId===undefined){
                                                        message.error("未选择收货地址或配送方式");
                                                    }else{
                                                        message.success("订单创建中...");
                                                        onCommitOrder({
                                                            userId:userInfo.userId,
                                                            commId:carList.reduce((commId,next)=>(commId.concat(next.commodity.commId)),[]),
                                                            qualId:carList.reduce((qualId,next)=>(qualId.concat(next.qualId)),[]),
                                                            sizeId:carList.reduce((sizeId,next)=>(sizeId.concat(next.sizeId)),[]),
                                                            disId:discountId,
                                                            expId:expressId,
                                                            addId:addressId,
                                                            message:message
                                                        })
                                                    }
                                                }}>提交订单</Button>
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
    const header = state.header;
    const privacy = state.privacy.privacy;
    return {
        userInfo:header.userInfo,
        addressList: privacy.addressList,
        discountList: privacy.discountList,
        headerIsLoading: header.isLoading,
        privacyIsLoading: privacy.isLoading,
        expressList: header.expressList,
        orderInfo:privacy.orderInfo
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchExpress: () => {
            dispatch(HeaderActions.Start());
            dispatch(HeaderActions.FetchExpressList());
        },
        onCommitOrder: (orderInfo) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.CommitOrder(orderInfo,localStorage.getItem("RealFakeJwt")));
        },
        onFetchDiscountList: (userId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchDiscount(userId,localStorage.getItem("RealFakeJwt")));
        },
        onFetchAddressList: (userId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchAddress(userId,localStorage.getItem("RealFakeJwt")));
        },
        onTradeInit: () => {
            dispatch(PrivacyActions.TradeInit());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(tradeArea));

function getAddress(id,addressList) {
    for(let i = 0;i<addressList.length;i++){
        if(addressList[i].addId===id)
            return addressList[i].area+" "+addressList[i].detail+" "+addressList[i].name+" "+addressList[i].tel;
    }
}

function getDisCount(id,discountList) {
    if(id===undefined)
        return 0;
    for(let i = 0;i<discountList.length;i++){
        if(discountList[i].disId===id)
            return discountList[i].price;
    }
}

function getExpress(id,expressList) {
    if(id===undefined)
        return 0;
    for(let i = 0;i<expressList.length;i++){
        if(expressList[i].expId===id)
            return expressList[i].price;
    }
}
