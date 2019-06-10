import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import lrz from 'lrz';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import {Select,Upload,
    Menu,
    Icon,
    Row,
    Col,
    Avatar,
    Dropdown,
    Spin,
    Button,
    Checkbox,
    Input,
    message,
    Table,
    Tag,
    Divider,Collapse
} from 'antd';

const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

class add extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 头像图片的中间变量
            imageUrl:undefined,

            // 需要提交的数据
            // 昵称
            nickname: undefined,
            // 头像base64
            icon:undefined,
            // 用户名
            username:undefined,
            // 密码
            password:undefined
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.registerDone){
            this.props.history.push("/privacy/login");
        }
    }

    // 裁剪图片
    _cropIcon() {
        // image in dataUrl
        this.setState({
            icon: this.refs.cropperIcon.getCroppedCanvas().toDataURL()
        });
    }

    render() {
        const {
            isLoading, // 是否加载中
            onRegister, // 添加管理员
            userInfo,
        } = this.props;

        const {
            icon,//头像base64编码
            imageUrl, // 裁剪图片中间变量
            nickname, // 昵称
            username, // 用户名
            password, // 密码
        } = this.state;

        // 如果已经登录过，到主页
        if(userInfo!==undefined){
            this.props.history.push("/");
        }


        return (
            <Spin spinning={isLoading}>
                <Row style={{padding:"2%"}}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={{span:16,offset:4}} xxl={{span:16,offset:4}}
                         style={{backgroundColor:"white"}}>
                        {/*添加管理员*/}
                        <Row type={"flex"} align={"middle"} style={{padding: "2%"}}>
                            <Divider>注册</Divider>
                        </Row>
                        {/*昵称*/}
                        <Row type={"flex"} align={"middle"} style={{margin: "3%", paddingTop: 0}}>
                            <Col span={6} style={{textAlign: "right"}}>
                                昵称：
                            </Col>
                            <Col span={18}>
                                <Input style={{width: "70%"}} placeholder={"昵称"}
                                       onChange={(e) => {
                                           this.setState({
                                               nickname: e.target.value
                                           })
                                       }}/>
                            </Col>
                        </Row>
                        {/*用户名*/}
                        <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                            <Col span={6} style={{textAlign: "right"}}>
                                用户名：
                            </Col>
                            <Col span={18}>
                                <Input style={{width: "70%"}} placeholder={"登录的用户名"}
                                       onChange={(e) => {
                                           this.setState({
                                               username: e.target.value
                                           })
                                       }}/>
                            </Col>
                        </Row>
                        {/*密码*/}
                        <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                            <Col span={6} style={{textAlign: "right"}}>
                                密码：
                            </Col>
                            <Col span={18}>
                                <Input style={{width: "70%"}} placeholder={"登录的密码"}
                                       onChange={(e) => {
                                           this.setState({
                                               password: e.target.value
                                           })
                                       }}/>
                            </Col>
                        </Row>
                        {/*头像*/}
                        <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                            <Col span={6} style={{textAlign: "right"}}>
                                头像：
                            </Col>
                            <Col span={12}>
                                <Collapse bordered={false} >
                                    <Panel header="上传头像" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>

                                        <Row>
                                            {
                                                icon === undefined ? null : (
                                                    <Col span={14}>
                                                        <Avatar src={icon} size={160} shape={"square"}/>
                                                    </Col>
                                                )
                                            }
                                            <Col span={5}>
                                                <Upload
                                                    accept={"image/*"}
                                                    name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    beforeUpload={(file) => {
                                                        console.log(file.size / 1024);
                                                        lrz(file, {quality: 1})
                                                            .then((rst) => {
                                                                console.log(rst.fileLen / 1024);
                                                                this.setState({
                                                                    imageUrl: rst.base64,
                                                                })
                                                            });
                                                        return false;
                                                    }}
                                                >
                                                    {imageUrl ? <Avatar src={imageUrl} size={100} shape={"square"}/> : (
                                                        null
                                                    )}
                                                    <div>
                                                        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                                                        <div className="ant-upload-text">上传头像</div>
                                                    </div>
                                                </Upload>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={16}>
                                                {
                                                    imageUrl === undefined ? (
                                                        "请先上传头像图片"
                                                    ) : (
                                                        <Cropper
                                                            ref='cropperIcon'
                                                            src={imageUrl}
                                                            style={{height: 300, width: '100%'}}
                                                            // Cropper.js options
                                                            aspectRatio={1}
                                                            guides={true}
                                                            crop={this._cropIcon.bind(this)}/>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>

                        {/*按钮*/}
                        <Row style={{padding: "3%", paddingTop: 0}}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={{span: 6, offset: 6}}
                                 xxl={{span: 6, offset: 6}} style={{padding: "1%"}}>
                                <Button type={"primary"} style={{width: "100%"}}
                                        onClick={() => {
                                            if(!(nickname&&username&&password&&icon)){
                                                message.error("请输入完整");
                                            }else{
                                                onRegister({
                                                    nickname:nickname,
                                                    username:username,
                                                    password:password,
                                                    icon:icon,
                                                });
                                            }
                                        }}
                                >马上注册</Button>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={6} style={{padding: "1%"}}>
                                <Button
                                    style={{width: "100%"}}
                                    onClick={() => {
                                        this.props.history.push("/privacy/login");
                                    }}>已有账号|去登录</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Spin>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const header = state.header;
    const privacy = state.privacy.privacy;
    return {
        registerDone: privacy.registerDone,
        userInfo: header.userInfo,
        isLoading: privacy.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onRegister: (registerInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Register(registerInfo));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(add));