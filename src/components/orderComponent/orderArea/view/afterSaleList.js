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
            <Col span={4}>
                商品封面
            </Col>
            <Col span={4}>
                商品标题
            </Col>
            <Col span={2}>
                商品尺码
            </Col>
            <Col span={3}>
                商品品质
            </Col>
            <Col span={2}>
                商品价格
            </Col>
            <Col span={3}>
                售后原因
            </Col>
            <Col span={3}>
                售后状态
            </Col>
            <Col span={3}>
                操作
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
                                    申请时间：{new Date(item.applyDate).Format("yyyy-MM-dd hh:mm:ss")}
                                </Col>
                                <Col span={9}>
                                    订单号：{item.order.orderId}
                                </Col>
                                <Col span={9}>
                                    售后号：{item.aftId}
                                </Col>
                            </Row>
                            <Row style={{margin: 1, backgroundColor: "#fff", padding: "1%"}}
                                 type={"flex"} align={"middle"}>
                                <Col span={4}>
                                    <Avatar src={item.cover}
                                            size={70}
                                            shape={"square"}/>
                                </Col>
                                <Col span={4}>
                                    {item.title}
                                </Col>
                                <Col span={2}>
                                    {item.size}
                                </Col>
                                <Col span={3}>
                                    {item.qualName}
                                </Col>
                                <Col span={2} style={{color:"#00a9ff"}}>
                                    ￥{item.price}
                                </Col>
                                <Col span={3}>
                                    {item.reason}
                                </Col>
                                <Col span={3}>
                                    {getOrderState(item.state)}
                                </Col>
                                <Col span={3}>
                                    <div>
                                        {
                                            item.state<3?(
                                                <Row style={{margin: "4%"}}>
                                                    <Tag color="magenta"  onClick={()=>{

                                                        props.actions.cancelAfterSaleConfirm({
                                                            userId:props.userId,
                                                            orderId:item.order.orderId,
                                                            commId:item.commodity.commId,
                                                            aftId:item.aftId
                                                        },props.actions.cancelAfterSale)
                                                    }}>取消售后</Tag>
                                                </Row>
                                            ):null
                                        }
                                        <Row style={{margin: "4%"}}>
                                            <Tag color="blue"  onClick={()=>{
                                                props.actions.goAfterSale(props.userId,item.aftId);
                                            }}>{item.state<3?"查看售后进度":"查看售后结果"}</Tag>
                                        </Row>
                                    </div>
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
                            {/*{*/}
                                {/*item.state<4?(*/}
                                    {/*<Row style={{padding: "1%",margin:1,backgroundColor:"#fff"}}>*/}
                                        {/*<Col span={12} style={{textAlign:"left"}}>*/}
                                            {/*买家留言：{item.message===undefined?("无"):(item.message)}*/}
                                        {/*</Col>*/}
                                        {/*<Col span={12} style={{textAlign:"right"}}>*/}
                                            {/*收货地址：{item.address.area+" "+item.address.detail+" "*/}
                                        {/*+item.name+"收 "+item.tel}*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                {/*):null*/}
                            {/*}*/}
                        </Row>
                    )
                })
            )
        }
    </div>
)
function getOrderState(state) {
    switch (state){
        case 1:return "等待处理";
        case 2:return "处理中";
        case 3:return "售后成功";
        case 4:return "售后失败";
        default:return "未知状态";
    }
}
