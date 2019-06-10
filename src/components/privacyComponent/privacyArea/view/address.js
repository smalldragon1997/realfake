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
    Tag, Input, Cascader
} from 'antd';
import * as Actions from '../actions';
import cityOptions from '../city.json';
import * as UserActions from '../../../shareComponent/user/actions';
import {Link, withRouter} from 'react-router-dom'
import {message} from 'antd';
import * as Constants from '../../../../constants';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const initState = {
    alterAddress: false, // 修改地址
    newConsignee: undefined, // 新联系人
    newArea: undefined, // 新地区
    newDetail: undefined, // 新地址
    newTel: undefined, // 新联系方式
};

class address extends React.Component {

    constructor(props) {
        super(props);
        // 回到页面顶部
        window.scrollTo(0, 0);
        this.state = initState;
    }

    componentDidMount() {
        if (this.props.userInfo !== undefined){
            this.props.onFetchAddressList(this.props.userInfo.userId);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.userInfo!==this.props.userInfo){
            this.props.onFetchAddressList(nextProps.userInfo.userId);
        }
    }

    render() {
        const {
            isLoading, // 加载中
            userInfo, // 用户信息,
            onAddAddress, // 添加地址
            onDelAddress, // 删除地址
            addressList,
        } = this.props;

        return (
            <Spin spinning={isLoading}>
                {
                    userInfo !== undefined ? (
                        <div>
                            <Divider style={{padding: "1%", margin: 0, fontSize: 18}}>收货地址</Divider>
                            <div style={{padding: "1%", margin: "1%", backgroundColor: "#fff"}}>

                                <Divider
                                    style={{padding: "2%", margin: 0, fontWeight: "bold", fontSize: 18}}>新增地址</Divider>

                                <Row style={{textAlign: "center", margin: "2%"}} type={"flex"} align={"middle"}>
                                    <Col span={4}>
                                        所在地区：
                                    </Col>
                                    <Col xs={20} sm={20} md={20} lg={20} xl={8} xxl={8}>
                                        {this.state.newArea}
                                        <Cascader options={cityOptions} onChange={(e) => {
                                            this.setState({...this.state, newArea: e})
                                        }}>
                                            <Tag color={"blue"}>选择地区</Tag>
                                        </Cascader>
                                    </Col>
                                    <Col span={4}>
                                        详细地址：
                                    </Col>
                                    <Col xs={20} sm={20} md={20} lg={20} xl={8} xxl={8}>
                                        <Input placeholder="详细地址" value={this.state.newDetail}
                                               onChange={(e) => {
                                                   // 输入昵称时修改
                                                   this.setState({...this.state, newDetail: e.target.value})
                                               }}/>
                                    </Col>
                                </Row>
                                <Row style={{textAlign: "center", margin: "2%"}} type={"flex"} align={"middle"}>
                                    <Col span={4}>
                                        收件人：
                                    </Col>
                                    <Col xs={20} sm={20} md={20} lg={20} xl={8} xxl={8}>
                                        <Input placeholder="收货时的联系人" value={this.state.newConsignee}
                                               onChange={(e) => {
                                                   // 输入昵称时修改
                                                   this.setState({...this.state, newConsignee: e.target.value})
                                               }}/>
                                    </Col>
                                    <Col span={4}>
                                        联系电话：
                                    </Col>
                                    <Col xs={20} sm={20} md={20} lg={20} xl={8} xxl={8}>
                                        <Input placeholder="派送时联系电话" value={this.state.newTel} onChange={(e) => {
                                            // 输入昵称时修改
                                            this.setState({...this.state, newTel: e.target.value})
                                        }}/>
                                    </Col>
                                </Row>

                                <Row style={{textAlign: "center", margin: "2%"}} type={"flex"} align={"middle"}
                                     justify={"space-around"}>
                                    <Button type={"primary"} onClick={() => {
                                        const newTel = this.state.newTel;
                                        const newDetail = this.state.newDetail;
                                        const newArea = this.state.newArea;
                                        const newConsignee = this.state.newConsignee;
                                        if (newConsignee === undefined || newConsignee === "" || newArea === undefined || newArea === ""
                                            || newDetail === undefined || newDetail === "" || newTel === undefined || newTel === "") {

                                            message.error("内容不能为空");
                                        } else {
                                            if (isPhoneAvailable(newTel)) {
                                                onAddAddress(userInfo.userId,{
                                                    area:newArea,
                                                    detail:newDetail,
                                                    name:newConsignee,
                                                    tel:newTel
                                                });
                                                this.setState(initState);
                                            } else {
                                                message.error("联系方式格式错误")
                                            }

                                        }
                                    }}>添加收货地址</Button>
                                </Row>
                                <Divider
                                    style={{padding: "2%", margin: 0, fontWeight: "bold", fontSize: 18}}>地址管理</Divider>
                                <Row style={{textAlign: "center", backgroundColor: "#f5f5f5", margin: "2%"}}>
                                    <Col span={24}>
                                        <Row style={{padding: "1%"}}>
                                            <Col span={4}>
                                                收货人
                                            </Col>
                                            <Col span={5}>
                                                所在地区
                                            </Col>
                                            <Col span={8}>
                                                详细地址
                                            </Col>
                                            <Col span={4}>
                                                手机/电话
                                            </Col>
                                            <Col span={3}>
                                                操作
                                            </Col>
                                        </Row>
                                        {
                                            addressList.length === 0 ? (
                                                <Divider style={{
                                                    padding: "1%",
                                                    margin: 0,
                                                    fontSize: 18
                                                }}>你还没有新建收货地址哦</Divider>
                                            ) : (
                                                addressList.map(function (item, index) {
                                                    return (
                                                        <Row style={{
                                                            backgroundColor: "#fff",
                                                            margin: 1,
                                                            padding: "1%",
                                                            paddingTop: "2%",
                                                            paddingBottom: "2%"
                                                        }}
                                                             type={"flex"} align={"middle"} key={index}>
                                                            <Col span={4}>
                                                                {item.name}
                                                            </Col>
                                                            <Col span={5}>
                                                                {item.area}
                                                            </Col>
                                                            <Col span={8}>
                                                                {item.detail}
                                                            </Col>
                                                            <Col span={4}>
                                                                {item.tel}
                                                            </Col>
                                                            <Col span={3}>
                                                                <Tag color="red" onClick={() => {
                                                                    onDelAddress(userInfo.userId,item.addId);
                                                                }}>删除</Tag>
                                                            </Col>

                                                        </Row>
                                                    )
                                                })
                                            )
                                        }

                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ) : (
                        <Divider style={{padding: "1%", margin: 0, fontSize: 18}}>登录后访问哦</Divider>
                    )
                }
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
        addressList: privacy.addressList,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onAddAddress: (userId, newAddress) => {
            dispatch(Actions.Start());
            dispatch(Actions.AddAddress(userId, newAddress,localStorage.getItem("RealFakeJwt")));
            setTimeout(()=>{
                dispatch(Actions.FetchAddress(userId,localStorage.getItem("RealFakeJwt")));
            },Constants.reFetchTimeOut)
        },
        onDelAddress: (userId, addressId) => {
            dispatch(Actions.Start());
            dispatch(Actions.DelAddress(userId, addressId,localStorage.getItem("RealFakeJwt")));
            setTimeout(()=>{
                dispatch(Actions.FetchAddress(userId,localStorage.getItem("RealFakeJwt")));
            },Constants.reFetchTimeOut)
        },
        onFetchAddressList: (userId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchAddress(userId,localStorage.getItem("RealFakeJwt")));
            setTimeout(()=>{
                dispatch(Actions.FetchAddress(userId,localStorage.getItem("RealFakeJwt")));
            },Constants.reFetchTimeOut)
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(address));

function isPhoneAvailable(str) {
    const myReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return myReg.test(str);
}
