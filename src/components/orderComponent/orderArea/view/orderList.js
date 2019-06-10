import React from 'react';

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
    Tag
} from 'antd';
import {Link, withRouter} from 'react-router-dom'

export default (props) => (
    <div>
        <Row style={{textAlign: "center", backgroundColor: "#f5f5f5", padding: "1%", margin: "1%"}}>
            <Col span={7}>
                商品信息
            </Col>
            <Col span={3}>
                配送方式
            </Col>
            <Col span={4}>
                优惠方式
            </Col>
            <Col span={3}>
                实际支付
            </Col>
            <Col span={3}>
                订单状态
            </Col>
            <Col span={3}>
                商品操作
            </Col>
        </Row>
        {
            props.list.length === 0 ? (
                <Divider style={{padding: "2%", margin: 0, fontSize: 18}}>这里空空如也</Divider>
            ) : (
                // 遍历订单
                props.list.map(function (item, index) {
                    return (
                        <Row style={{
                            borderRadius: 3, textAlign: "center",
                            backgroundColor: "#eaf8ff", margin: "1%"
                        }} key={index}>
                            <Row style={{padding: "1%"}}>
                                <Col span={6}>
                                    创建时间：{new Date(item.date).Format("yyyy-MM-dd hh:mm:ss")}
                                </Col>
                                <Col span={9}>
                                    订单号：{item.orderId}
                                </Col>
                                <Col span={9}>
                                    交易号：{item.payId}
                                </Col>
                            </Row>
                            <Row style={{margin: 1, backgroundColor: "#fff", padding: "1%"}}
                                 type={"flex"} align={"middle"}>
                                <Col span={7}>
                                    {
                                        item.commOrderList.map(function (item, index) {
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
                                <Col span={3}>
                                    {item.express.expName}：
                                    {item.express.price===0?(
                                        "包邮"
                                    ):(item.express.price+"元")}
                                </Col>
                                <Col span={4}>
                                    {
                                        item.discount===null?("无优惠"):(
                                            <span>
                                                                    {item.discount.disName}：
                                                {item.discount.price+"元"}
                                                                </span>
                                        )
                                    }
                                </Col>
                                <Col span={3} style={{color:"#00a9ff"}}>
                                    ￥{item.total}
                                </Col>
                                <Col span={3}>
                                    {
                                        getOrderState(item.state)
                                    }
                                </Col>
                                <Col span={3}>
                                    {
                                        item.state>1&&item.state<5?
                                        item.commOrderList.map(function (item1, index) {
                                            return (
                                                <Row key={index} style={{
                                                    marginTop: "2%",
                                                    marginBottom: "2%",textAlign:"center"
                                                }}
                                                     type={"flex"} align={"middle"}
                                                >
                                                    <Col span={24} style={{margin: "4%",textAlign:"center"}}>
                                                        {
                                                            item1.state===0?(
                                                                <Tag color="red"  onClick={()=>{
                                                                    props.actions.goApplyAfterSale(item,item1.commodity.commId);
                                                                }}>申请售后</Tag>
                                                            ):(
                                                                item1.state===3?(
                                                                    <Tag color="red"  onClick={()=>{
                                                                        props.actions.goApplyAfterSale(item,item1.commodity.commId);
                                                                    }}>售后处理成功</Tag>
                                                                ):(
                                                                    item1.state===4?(
                                                                        <Tag color="red"  onClick={()=>{
                                                                            props.actions.goApplyAfterSale(item,item1.commodity.commId);
                                                                        }}>售后处理失败</Tag>
                                                                    ):(
                                                                        <Tag color="red"  onClick={()=>{
                                                                            props.actions.goApplyAfterSale(item,item1.commodity.commId);
                                                                        }}>售后处理中</Tag>
                                                                    )
                                                                )
                                                            )
                                                        }
                                                    </Col>
                                                </Row>
                                            )
                                        }):"无操作"
                                    }
                                </Col>
                            </Row>
                            {
                                item.state===3?(
                                    <Row style={{padding: "1%",margin:1,backgroundColor:"#fff"}}>
                                        <Col span={24} style={{textAlign:"right",fontWeight:"bold"}}>
                                            快递：{item.expMessage===undefined?null:item.expMessage+" "}
                                            <a onClick={()=>{
                                                window.open("http://www.baidu.com/s?wd="+item.expMessage);
                                            }}>{item.number}</a>(点击可查看物流)
                                        </Col>
                                    </Row>
                                ):null
                            }
                            {
                                item.state<4?(
                                    <Row style={{padding: "1%",margin:1,backgroundColor:"#fff"}}>
                                        <Col span={12} style={{textAlign:"left"}}>
                                            买家留言：{item.message===null?("无"):(item.message)}
                                        </Col>
                                        <Col span={12} style={{textAlign:"right"}}>
                                            收货地址：{item.address.area+" "+item.address.detail+" "
                                        +item.address.name+"收 "+item.address.tel}
                                        </Col>
                                    </Row>
                                ):null
                            }
                            <Row style={{padding: "1%",margin:1,backgroundColor:"#fff"}}>
                                <Col span={24} style={{textAlign:"right"}}>
                                    {
                                        getActionsByState(item,props)
                                    }
                                </Col>
                            </Row>
                        </Row>
                    )
                })
            )
        }
    </div>
)
function getOrderState(state) {
    switch (state){
        case 1:return "等待付款";
        case 2:return "等待发货";
        case 3:return "等待收货";
        case 4:return "等待评价";
        case 5:return "订单已完成";
        default:return "未知状态";
    }
}


function getActionsByState(item,props) {
    switch (item.state){
        case 1:return (
            <div>
                <Tag color="magenta" onClick={()=>{
                    props.actions.goPay(props.userId,item.orderId);
                }}>去付款</Tag>
                <Tag color="blue" onClick={()=>{
                    props.actions.goPay(props.userId,item.orderId);
                }}>查看订单</Tag>
                <Tag color="red" onClick={()=>{
                    props.actions.cancelOrderConfirm(props.userId,item.orderId,props.actions.cancelOrder)
                }}>取消订单</Tag>
            </div>
        );
        case 2:return (
            <div>
                <Tag color="blue" onClick={()=>{
                    props.actions.goDeliver(props.userId,item.orderId);
                }}>查看订单</Tag>
            </div>
        );
        case 3:return (
            <div>
                <Tag color="magenta"  onClick={()=>{
                    props.actions.onConfirmOrder({
                        userId:props.userId,
                        orderId:item.orderId
                    });
                    setTimeout(()=>{
                        props.actions.goEvaluate(props.userId,item.orderId)
                    },2000)
                }}>确认收货</Tag>
                <Tag color="blue" onClick={()=>{
                    props.actions.goTake(props.userId,item.orderId);
                }}>查看订单</Tag>
            </div>
        );
        case 4:return (
            <div>
                <Tag color="magenta"  onClick={()=>{
                    props.actions.goEvaluate(props.userId,item.orderId);
                }}>评价返红包</Tag>
                <Tag color="blue"  onClick={()=>{
                    props.actions.goEvaluate(props.userId,item.orderId);
                }}>查看订单</Tag>
            </div>
        );
        case 5:return (
            <div>
                <Tag color="blue"  onClick={()=>{
                    props.actions.goDone(props.userId,item.orderId);
                }}>查看订单</Tag>
                <Tag color="red"  onClick={()=>{
                    props.actions.deleteOrderConfirm(props.userId,item.orderId,props.actions.deleteOrder)
                }}>删除订单</Tag>
            </div>
        );
        default:return "未知状态";
    }
}