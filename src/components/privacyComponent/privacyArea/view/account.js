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
import * as HeaderActions from '../../../shareComponent/header/actions';
import cityOptions from '../city.json';
import * as UserActions from '../../../shareComponent/user/actions';
import {Link, withRouter} from 'react-router-dom'
import {message} from 'antd';
import * as Constants from '../../../../constants';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
let initState = {

    alterPwd: false, // 修改密码
    oldPwd: undefined, // 旧密码
    newPwd: undefined, // 新密码
    confirmPwd: undefined, // 新密码
};

class account extends React.Component {

    constructor(props) {
        super(props);
        // 回到页面顶部
        window.scrollTo(0, 0);
        this.state = initState;
    }

    render() {
        const {
            isLoading, // 加载中
            userInfo, // 用户信息,
            onAlterPwd, // 修改密码
            onExit,
        } = this.props;

        return (
            userInfo !== undefined ? (
                <Spin spinning={isLoading}>
                    <Divider style={{padding: "1%", margin: 0, fontSize: 18}}>信息设置</Divider>
                    <div style={{padding: "1%", margin: "1%", backgroundColor: "#fff"}}>

                        <Divider
                            style={{padding: "2%", margin: 0, fontWeight: "bold", fontSize: 18}}>我的账号</Divider>
                        <Row style={{fontSize: 20}}>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{margin: "2%"}}>
                                    <Col span={6}
                                         style={{textAlign: "right", marginBottom: "1%"}}>昵称：</Col>
                                    <Col span={6} style={{
                                        textAlign: "left",
                                        marginBottom: "1%"
                                    }}>{userInfo.nickname}</Col>
                                </Row>
                                <Row type={"flex"} align={"middle"} style={{margin: "2%"}}>
                                    <Col span={6} style={{textAlign: "right"}}>账号操作：</Col>
                                    <Col span={3} style={{
                                        padding: "1%",
                                        paddingLeft: 0,
                                        textAlign: "left"
                                    }}>
                                        <Button type={"danger"} onClick={() => {
                                            // 显示修改昵称框
                                            this.setState({alterPwd: true})
                                        }}>修改密码</Button>
                                        <Modal
                                            cancelText="点错了"
                                            okText="确认修改"
                                            title="修改密码"
                                            visible={this.state.alterPwd}
                                            onOk={
                                                // 修改密码
                                                () => {
                                                    if (this.state.newPwd === undefined || this.state.newPwd === ""
                                                        || this.state.oldPwd === undefined || this.state.oldPwd === "") {
                                                        message.error("密码不能为空");
                                                    } else if (this.state.newPwd !== this.state.confirmPwd) {
                                                        message.error("两次密码输入不一致");
                                                    } else {
                                                        onAlterPwd({
                                                            userId: userInfo.userId,
                                                            newPwd: this.state.newPwd,
                                                            oldPwd: this.state.oldPwd
                                                        });
                                                        this.setState({
                                                            ...this.state,
                                                            alterPwd: false,
                                                            oldPwd: undefined,
                                                            newPwd: undefined
                                                        });
                                                    }
                                                }
                                            }
                                            onCancel={
                                                // 关闭对话框，恢复成undefined
                                                () => {
                                                    this.setState(initState)
                                                }
                                            }
                                        >
                                            <Input placeholder="输入旧密码" style={{margin: "2%"}}
                                                   value={this.state.oldPwd} onChange={(e) => {
                                                // 输入昵称时修改
                                                this.setState({...this.state, oldPwd: e.target.value})
                                            }}/>
                                            <Input placeholder="输入新密码" style={{margin: "2%"}}
                                                   value={this.state.newPwd} onChange={(e) => {
                                                // 输入昵称时修改
                                                this.setState({...this.state, newPwd: e.target.value})
                                            }}/>
                                            <Input placeholder="确认新密码" style={{margin: "2%"}}
                                                   value={this.state.confirmPwd} onChange={(e) => {
                                                // 输入昵称时修改
                                                this.setState({...this.state, confirmPwd: e.target.value})
                                            }}/>
                                        </Modal>
                                    </Col>
                                    <Col span={3} style={{
                                        padding: "1%",
                                        paddingLeft: 0,
                                        textAlign: "left"
                                    }}><Button type={"danger"} onClick={()=>{onExit(userInfo.userId)}}>退出登录</Button></Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Spin>
            ) : (
                <Divider style={{padding: "1%", margin: 0, fontSize: 18}}>登录后访问哦</Divider>
            )
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {

    const header = state.header;
    const privacy = state.privacy.privacy;
    return {
        userInfo: header.userInfo,
        isLoading: privacy.isLoading,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onAlterPwd: (pwdInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.AlterPwd(pwdInfo,localStorage.getItem("RealFakeJwt")));
        },
        onExit: (userId) => {
            dispatch(HeaderActions.Exit(userId,localStorage.getItem("RealFakeJwt")));
            dispatch(Actions.Init());
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(account));

