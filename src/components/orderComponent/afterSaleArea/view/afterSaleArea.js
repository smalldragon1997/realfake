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
import * as OrderActions from '../../orderArea/actions';
import {Link, withRouter} from 'react-router-dom'
import {message} from 'antd';
import Show from './show';
import * as PrivacyActions from '../../../../components/privacyComponent/privacyArea/actions';

const {TextArea} = Input;
const Option = Select.Option;

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Step = Steps.Step;
const RadioGroup = Radio.Group;

class applyArea extends React.Component {

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
            console.log(info);
            // 获取订单信息，由订单页面传来的用户id，订单id
            this.props.onFetchAfterSaleInfo(info.userId, info.aftId);

        }
        this.mapFileListName = this.mapFileListName.bind(this);
    }

    // 匹配已上传列表中的文件名 ，传给后端进行保存操作
    mapFileListName(fileList) {
        let list = [];
        for (let i = 0; i < fileList.length; i++) {
            list = list.concat(fileList[i].name);
        }
        this.state.finalList = list;
    }


    render() {
        const {
            userInfo, // 用户信息
            isLoading, // 加载中
            afterSaleInfo, // 订单信息
            onCancelAfterSale, // 取消售后
        } = this.props;


        return (
            <Spin spinning={isLoading}>
                <Divider style={{padding: "2%",paddingBottom:0, margin: 0, fontSize: 18}}>退款&售后</Divider>
                <div style={{padding: "1%", margin: "2%", backgroundColor: "#fff"}}>
                    {
                        afterSaleInfo !== undefined ? (
                            <div>
                                <Divider style={{padding: "2%", margin: 0, fontSize: 18}}>订单详情</Divider>
                                <Row type={"flex"} justify={"space-around"} align={"middle"}
                                     style={{textAlign: "center"}}>
                                    <Col span={9}>
                                        订单号：{afterSaleInfo.order.orderId}
                                    </Col>
                                    <Col span={9}>
                                        交易号：{afterSaleInfo.order.payId}
                                    </Col>
                                    <Col span={6}>
                                        {afterSaleInfo.order.state===5?(
                                            <Row type={"flex"} justify={"space-around"} align={"middle"}
                                                 style={{textAlign: "center"}}>
                                                完成时间：{new Date(afterSaleInfo.order.doneDate).Format("yyyy-MM-dd hh:mm:ss")}
                                            </Row>
                                        ):null}
                                        <Row type={"flex"} justify={"space-around"} align={"middle"}
                                             style={{textAlign: "center"}}>
                                                申请时间：{new Date(afterSaleInfo.applyDate).Format("yyyy-MM-dd hh:mm:ss")}
                                        </Row>
                                        <Row type={"flex"} justify={"space-around"} align={"middle"}
                                             style={{textAlign: "center"}}>
                                                创建时间：{new Date(afterSaleInfo.order.date).Format("yyyy-MM-dd hh:mm:ss")}
                                        </Row>
                                        <Row type={"flex"} justify={"space-around"} align={"middle"}
                                             style={{textAlign: "center"}}>
                                                支付时间：{new Date(afterSaleInfo.order.payDate).Format("yyyy-MM-dd hh:mm:ss")}
                                        </Row>
                                    </Col>
                                </Row>

                                {
                                    afterSaleInfo.state>3?(
                                        <Row type={"flex"} justify={"space-around"} align={"middle"}
                                             style={{textAlign: "center"}}>
                                            <Col span={6} offset={18}>
                                                售后完成：{new Date(afterSaleInfo.doneDate).Format("yyyy-MM-dd hh:mm:ss")}
                                            </Col>
                                        </Row>
                                    ):(null)
                                }
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
                                            afterSaleInfo!==undefined ? (
                                                <Row style={{padding: "1%", backgroundColor: "#fff"}} type={"flex"}
                                                     align={"middle"}>
                                                    <Col span={8}>
                                                        <Row style={{
                                                            marginTop: "2%",
                                                            marginBottom: "2%"
                                                        }}
                                                             type={"flex"} align={"middle"}
                                                        >
                                                            <Col span={24}>
                                                                <Row>
                                                                    <Col span={10}>
                                                                        <Link
                                                                            to={"/commodities/" + afterSaleInfo.commodity.commId}>
                                                                            <Avatar src={afterSaleInfo.cover}
                                                                                    size={90}
                                                                                    shape={"square"}/>
                                                                        </Link>
                                                                    </Col>
                                                                    <Col span={14}
                                                                         style={{textAlign: "left"}}>
                                                                        <Row>
                                                                            <Link style={{color: "#000"}}
                                                                                  to={"/commodities/" + afterSaleInfo.commodity.commId}>
                                                                                {afterSaleInfo.title}
                                                                            </Link>
                                                                        </Row>
                                                                        <Row>
                                                                            码数：{afterSaleInfo.size}
                                                                        </Row>
                                                                        <Row>
                                                                            品质：{afterSaleInfo.qualName}
                                                                        </Row>
                                                                        <Row>
                                                                            价格：￥{afterSaleInfo.price}
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={5}>
                                                        {afterSaleInfo.order.express.expName}：
                                                        {afterSaleInfo.order.express.price === 0 ? (
                                                            "包邮"
                                                        ) : (afterSaleInfo.express.price + "元")}
                                                    </Col>
                                                    <Col span={5}>
                                                        {
                                                            afterSaleInfo.order.discount === null ? ("无优惠") : (
                                                                <span>
                                                                    {afterSaleInfo.order.discount.disName}：
                                                                    {afterSaleInfo.order.discount.price + "元"}
                                                                </span>
                                                            )
                                                        }
                                                    </Col>
                                                    <Col span={5} style={{color: "#00a9ff"}}>
                                                        ￥{afterSaleInfo.price}
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
                                                {afterSaleInfo.reason}
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
                                                <Show images={afterSaleInfo.afterPicList.reduce((pics,next)=>(pics.concat(next.url)),[])}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {
                                        afterSaleInfo.state>2?(
                                            <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                                                <Row style={{padding: "2%", backgroundColor: "#fff",textAlign:"center"}}>
                                                    售后处理已完成
                                                </Row>
                                            </Col>
                                        ):(
                                            <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                                                <Row style={{padding: "2%", backgroundColor: "#fff"}}>
                                                    <Button type={"danger"} style={{width: "100%"}}
                                                            onClick={() => {
                                                                onCancelAfterSale({
                                                                    userId:userInfo.userId,
                                                                    commId:afterSaleInfo.commodity.commId,
                                                                    orderId:afterSaleInfo.order.orderId,
                                                                    aftId:afterSaleInfo.aftId
                                                                });
                                                                message.success("退换申请成功...等待客服查看");
                                                                setTimeout(()=>this.props.history.push("/orders"),1500)
                                                            }}>撤销售后申请</Button>
                                                </Row>
                                            </Col>
                                        )
                                    }
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
        afterSaleInfo:privacy.afterSaleInfo,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAfterSaleInfo: (userId,aftId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchAfterSaleInfo(userId,aftId,localStorage.getItem("RealFakeJwt")));
        },
        onCancelAfterSale: (cancelInfo) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.CancelAfterSale(cancelInfo,localStorage.getItem("RealFakeJwt")));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(applyArea));

