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
import UploadShow from './uploadPhoto';

const {TextArea} = Input;
const Option = Select.Option;

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Step = Steps.Step;
const RadioGroup = Radio.Group;

class applyAfterSaleArea extends React.Component {

    constructor(props) {
        super(props);
        // 回到页面顶部
        window.scrollTo(0, 0);
        this.state={};
        // 如果直接访问 返回主页
        if (this.props.location.state === undefined) {
            message.success("操作失效,返回主页");
            this.props.history.push("/");
        } else {
            message.success("正在加载订单信息");
            const info = this.props.location.state;

            this.state=({
                orderInfo:info.orderInfo,
                commId:info.commId,
                finalList:[]
            })
        }
        this.mapFileListName = this.mapFileListName.bind(this);
    }

    // 匹配已上传列表中的文件名 ，传给后端进行保存操作
    mapFileListName(fileList) {
        let list = [];
        for (let i = 0; i < fileList.length; i++) {
            list = list.concat(fileList[i].name);
        }
        this.setState({
            finalList:list
        })
    }


    render() {
        const {
            userInfo, // 用户信息
            onApplyAfterSale,
            isLoading, // 加载中
        } = this.props;

        const {
            orderInfo,
        } = this.state;


        return (
            <Spin spinning={isLoading}>
                <Divider style={{padding: "2%",paddingBottom:0, margin: 0, fontSize: 18}}>退款&售后</Divider>
                <div style={{padding: "1%", margin: "2%", backgroundColor: "#fff"}}>
                    {
                        orderInfo !== undefined ? (
                            <div>
                                <Divider style={{padding: "2%", margin: 0, fontSize: 18}}>订单详情</Divider>
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
                                {/*{*/}
                                    {/*afterSaleInfo.state>3?(*/}
                                        {/*<Row type={"flex"} justify={"space-around"} align={"middle"}*/}
                                             {/*style={{textAlign: "center"}}>*/}
                                            {/*<Col span={6} offset={18}>*/}
                                                {/*完成时间：{new Date(afterSaleInfo.doneDate).Format("yyyy-MM-dd hh:mm:ss")}*/}
                                            {/*</Col>*/}
                                        {/*</Row>*/}
                                    {/*):null*/}
                                {/*}*/}
                                <Row
                                    style={{textAlign: "center", backgroundColor: "#f5f5f5", padding: 1, margin: "1%"}}>
                                    <Col>
                                        <Row style={{padding: "1%"}}>
                                            <Col span={8}>
                                                商品信息
                                            </Col>
                                            <Col span={5}>
                                                配送方式
                                            </Col>
                                            <Col span={5}>
                                                优惠方式
                                            </Col>
                                            <Col span={5}>
                                                实付款
                                            </Col>
                                        </Row>
                                        {
                                            orderInfo ? (
                                                <Row style={{padding: "1%", backgroundColor: "#fff"}} type={"flex"}
                                                     align={"middle"}>
                                                    <Col span={8}>
                                                        {
                                                            orderInfo.commOrderList
                                                                .filter((item,index)=>(
                                                                    item.commodity.commId===this.state.commId
                                                                ))
                                                                .map(function (item, index) {
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
                                                    <Col span={5}>
                                                        {orderInfo.express.expName}：
                                                        {orderInfo.express.price === 0 ? (
                                                            "包邮"
                                                        ) : (orderInfo.express.price + "元")}
                                                    </Col>
                                                    <Col span={5}>
                                                        {
                                                            orderInfo.discount === null ? ("无优惠") : (
                                                                <span>
                                                                    {orderInfo.discount.disName}：
                                                                    {orderInfo.discount.price + "元"}
                                                                </span>
                                                            )
                                                        }
                                                    </Col>
                                                    <Col span={5} style={{color: "#00a9ff"}}>
                                                        ￥{orderInfo.total}
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <Divider
                                                    style={{padding: "2%", margin: 0, fontSize: 18}}>订单参数错误</Divider>
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>
                                        <Row type={"flex"} justify={"space-around"} align={"middle"}
                                             style={{paddingLeft: "4%", paddingRight: "4%", backgroundColor: "#fff"}}>
                                            <Col span={4}>申请理由</Col>
                                            <Col span={20}>
                                                <TextArea rows={4} placeholder={"说明售后理由"} onChange={(e) => {
                                                    this.setState({
                                                        reason: e.target.value
                                                    });
                                                }}/>
                                            </Col>
                                        </Row>
                                        <Row type={"flex"} justify={"space-around"} align={"middle"}
                                             style={{
                                                 paddingTop: "1%",
                                                 paddingLeft: "4%",
                                                 paddingRight: "4%",
                                                 backgroundColor: "#fff"
                                             }}>
                                            <Col span={4}>售后拍照(鞋底、鞋盒)</Col>
                                            <Col span={20}>
                                                <UploadShow mapFileListName={this.mapFileListName}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                                        <Row style={{padding: "2%", backgroundColor: "#fff"}}>
                                            <Button type={"danger"} style={{width: "100%"}}
                                                    onClick={() => {
                                                        if (this.state.reason === undefined) {
                                                            message.success("请输入售后理由");
                                                        } else {
                                                            message.success("申请成功...即将返回");
                                                            console.log(this.state);
                                                            const commId = orderInfo.commOrderList
                                                                .filter((item,index)=>(
                                                                    item.commodity.commId===this.state.commId
                                                                ))[0].commodity.commId;

                                                            onApplyAfterSale({
                                                                userId:userInfo.userId,
                                                                orderId:orderInfo.orderId,
                                                                commId:commId,
                                                                reason:this.state.reason,
                                                                afterPics:this.state.finalList,
                                                            });
                                                            setTimeout(()=>{
                                                                this.props.history.push("/orders");
                                                                this.props.onTradeInit();
                                                            },2000);
                                                        }
                                                    }}>确定申请售后</Button>
                                        </Row>
                                        <Row style={{padding: "2%", backgroundColor: "#fff"}}>
                                            <Button type={"primary"} style={{width: "100%"}}
                                                    onClick={() => {

                                                        this.props.history.push("/orders");

                                                    }}>点错了、打扰了</Button>
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
    const privacy = state.privacy.privacy;
    const header = state.header;
    return {
        userInfo:header.userInfo,
        isLoading: privacy.isLoading,
        orderInfo:privacy.orderInfo,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrderInfo: (userId,orderId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchOrderInfo(userId,orderId,localStorage.getItem("RealFakeJwt")));
        },
        onApplyAfterSale: (info) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.ApplyAfterSale(info,localStorage.getItem("RealFakeJwt")));
        },
        onTradeInit: () => {
            dispatch(PrivacyActions.TradeInit());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(applyAfterSaleArea));

