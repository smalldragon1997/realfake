import React from 'react';
import {connect} from 'react-redux';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
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
    Tag, Input, Cascader, Upload
} from 'antd';
import * as Actions from '../actions';
import * as HeaderActions from '../../../shareComponent/header/actions';
import cityOptions from '../city.json';
import * as UserActions from '../../../shareComponent/user/actions';
import {Link, withRouter} from 'react-router-dom'
import {message} from 'antd';
import * as Constants from '../../../../constants';

const {Meta} = Card;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const initState = {
    alterName: false, // 修改昵称
    alterIcon: false, // 修改昵称
    newName: undefined, // 新昵称
    newIcon: undefined, // 新头像
    imageUrl: undefined
};

class info extends React.Component {

    constructor(props) {
        super(props);
        // 回到页面顶部
        window.scrollTo(0, 0);
        this.state = initState;

    }

    _crop() {
        // image in dataUrl
        this.setState({
            newIcon: this.refs.cropper.getCroppedCanvas().toDataURL()
        });
    }

    componentDidMount(){
        if(this.props.userInfo!==undefined){
            this.props.onFetchDiscountList(this.props.userInfo.userId);
            this.props.onFetchLikeList(this.props.userInfo.userId);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.userInfo!==this.props.userInfo){
            this.props.onFetchDiscountList(nextProps.userInfo.userId);
            this.props.onFetchLikeList(nextProps.userInfo.userId);
        }
    }

    render() {
        const {
            isLoading, // 加载中
            userInfo, // 用户信息,
            onAlterInfo, // 修改
            onDelLike,
            discountList,
            likeList
        } = this.props;
        const {
            newName,
            newIcon,
            imageUrl
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    userInfo !== undefined ? (
                        <div>
                            <Divider style={{padding: "1%", margin: 0, fontSize: 18}}>个人信息</Divider>
                            <div style={{padding: "1%", margin: "1%", backgroundColor: "#fff"}}>
                                <Divider
                                    style={{padding: "2%", margin: 0, fontWeight: "bold", fontSize: 18}}>我的信息</Divider>
                                <Row>
                                    <Col span={6} style={{textAlign: "center"}}>
                                        <Row>
                                            <Avatar src={userInfo.icon} size={100} shape={"square"}/>
                                        </Row>
                                        <Row style={{margin: "2%"}}>
                                            <Button type={"dashed"} onClick={() => {
                                                // 显示修改昵称框
                                                this.setState({...this.state, alterIcon: true})
                                            }}>更换头像</Button>
                                            <Modal
                                                cancelText="点错了"
                                                okText="确认修改"
                                                title="修改头像"
                                                visible={this.state.alterIcon}
                                                onOk={
                                                    // 修改密码
                                                    () => {
                                                        if (this.state.newIcon === undefined) {
                                                            message.error("请选择图片");
                                                        } else {
                                                            onAlterInfo({
                                                                userId: userInfo.userId,
                                                                icon: newIcon===undefined ? userInfo.icon : newIcon,
                                                                nickname: newName===undefined ? userInfo.nickname : newName
                                                            });
                                                            this.setState(initState);
                                                        }
                                                    }
                                                }
                                                onCancel={
                                                    // 关闭对话框，恢复成undefined
                                                    () => {
                                                        this.setState(initState);
                                                    }
                                                }
                                            >
                                                <Row>
                                                    {
                                                        !this.state.newIcon ? (
                                                            <Col span={10}>
                                                                <Avatar src={userInfo.icon} size={160}
                                                                        shape={"square"}/>
                                                            </Col>
                                                        ) : (
                                                            <Col span={10}>
                                                                <Avatar src={this.state.newIcon} size={160}
                                                                        shape={"square"}/>
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
                                                            {imageUrl ?
                                                                <Avatar src={imageUrl} size={100} shape={"square"}/> : (
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
                                                                    ref='cropper'
                                                                    src={imageUrl}
                                                                    style={{height: 300, width: '100%'}}
                                                                    // Cropper.js options
                                                                    aspectRatio={1}
                                                                    guides={true}
                                                                    crop={this._crop.bind(this)}/>
                                                            )
                                                        }
                                                    </Col>
                                                </Row>
                                            </Modal>
                                        </Row>
                                    </Col>
                                    <Col span={18} style={{fontSize: 20}}>
                                        <Row type={"flex"} align={"middle"}>
                                            <Col span={3}>昵称：</Col>
                                            <Col span={8}>{userInfo.nickname}</Col>
                                            <Col span={8}>
                                                <Button type={"dashed"} onClick={() => {
                                                    // 显示修改昵称框
                                                    this.setState({...this.state, alterName: true})
                                                }}>修改昵称</Button>
                                                <Modal
                                                    cancelText="点错了"
                                                    okText="确认修改"
                                                    title="修改昵称"
                                                    visible={this.state.alterName}
                                                    onOk={
                                                        // 修改昵称
                                                        () => {
                                                            if (this.state.newName === undefined || this.state.newName === "") {
                                                                message.error("新昵称不能为空");
                                                            } else {
                                                                onAlterInfo({
                                                                    userId: userInfo.userId,
                                                                    nickname: newName===undefined ? userInfo.nickname : newName,
                                                                    icon: newIcon===undefined ? userInfo.icon : newIcon,
                                                                });
                                                                this.setState(initState);
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
                                                    <Input placeholder="输入新昵称" value={this.state.newName}
                                                           onChange={(e) => {
                                                               // 输入昵称时修改
                                                               this.setState({
                                                                   ...this.state,
                                                                   newName: e.target.value
                                                               })
                                                           }}/>
                                                </Modal>
                                            </Col>
                                        </Row>
                                        <Divider style={{padding: "2%", margin: 0, fontWeight: "bold", fontSize: 18}}>我的收藏</Divider>
                                        <Row type={"flex"} align={"middle"}>
                                            <List
                                                pagination={{
                                                    showQuickJumper: true,
                                                    showTotal: (total, range) => `第${range[0]}-${range[1]}个商品 总个数 ${total} 个`,
                                                }}
                                                grid={{gutter: 16, xs: 2, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3}}
                                                dataSource={likeList.sort((a,b)=>(a.date-b.date))}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <Card cover={
                                                            <Link to={"/commodities/" + item.commodity.commId}>
                                                                <img src={item.commodity.cover} style={{width: "100%",padding:"2%"}}/>
                                                            </Link>
                                                        }
                                                        >
                                                            <Meta //商品信息
                                                                style={{paddingBottom: 10}}
                                                                title={// 如果售空显示为红色
                                                                    item.commodity.isOut ? (
                                                                        <span style={{
                                                                            color: "#ff0006"
                                                                        }}>等待补货:{item.commodity.title}</span>
                                                                    ) : (
                                                                        <span
                                                                            style={{fontWeight: "bold"}}>{item.commodity.title}</span>
                                                                    )
                                                                }
                                                            />
                                                            <Row>
                                                                <Col span={14}>
                                                    {/*<span style={{*/}
                                                        {/*fontWeight: "bold",*/}
                                                        {/*color: "#098aff"*/}
                                                    {/*}}>{*/}
                                                        {/*item.commodity.commQualList.length > 1 ? (*/}
                                                            {/*"￥" + item.commodity.commQualList.reduce((price, next) => next.price<price?next.price:price, 99999)*/}
                                                            {/*+ " - " + item.commodity.commQualList.reduce((price, next) => next.price>price?next.price:price, 0)*/}
                                                        {/*) : (*/}
                                                            {/*"￥" + item.commodity.commQualList[0].price*/}
                                                        {/*)*/}
                                                    {/*}</span>*/}
                                                                </Col>
                                                                <Col span={10} style={{textAlign: "right"}}>

                                                                    <Icon type="eye"
                                                                          style={{
                                                                              fontSize: 15,
                                                                              color: "#0082ff"
                                                                          }}/><span
                                                                    style={{marginRight: "10%"}}> {item.commodity.glance}</span>
                                                                    <Icon type="heart" theme="filled" style={{
                                                                        fontSize: 15,
                                                                        color: "#0082ff"
                                                                    }}/><span> {item.commodity.like}</span>
                                                                </Col>
                                                            </Row>

                                                            <Row style={{fontSize: 8, paddingTop: 5}}>
                                                                <Button  style={{width:"100%"}} type={"danger"} onClick={()=>{
                                                                    onDelLike(userInfo.userId,item.commodity.commId);
                                                                }}>取消收藏</Button>
                                                            </Row>
                                                        </Card>
                                                    </List.Item>
                                                )}
                                            />
                                        </Row>
                                        <Divider style={{padding: "2%", margin: 0, fontWeight: "bold", fontSize: 18}}>我的代金卷</Divider>
                                        <Row type={"flex"} align={"middle"}>

                                            <List
                                                pagination={{
                                                    showQuickJumper: true,
                                                    showTotal: (total, range) => `第${range[0]}-${range[1]}个 总个数 ${total} 个`,
                                                }}
                                                grid={{gutter: 16, xs: 2, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3}}
                                                dataSource={discountList.sort((a,b)=>a.discount.price-b.discount.price)}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <Card cover={
                                                            <img src={item.cover} style={{width: "100%"}}/>
                                                        }>
                                                            <Meta //商品信息
                                                                style={{paddingBottom: 10}}
                                                                title={item.discount.disName}/>
                                                            <Row type="flex" justify="space-between">
                                                                <Col span={4}>
                                                    <span style={{fontWeight: "bold", color: "#098aff"}}>
                                                        {"￥" + item.discount.price}
                                                        </span>
                                                                </Col>
                                                                <Col span={10} style={{textAlign: "right"}}>
                                                                    使用条件：{item.limit===0?"无条件使用":"满 "+item.limit+"元 可用"}
                                                                </Col>
                                                            </Row>
                                                            <Row type="flex" justify="space-between">
                                                                使用期限至：{new Date(item.date).Format("yyyy-MM-dd hh:mm:ss")}
                                                            </Row>
                                                        </Card>
                                                    </List.Item>
                                                )}
                                            />
                                        </Row>
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
        likeList: privacy.likeList,
        discountList: privacy.discountList,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onAlterInfo: (userInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.AlterUserInfo(userInfo, localStorage.getItem("RealFakeJwt")));
            setTimeout(()=>{
                dispatch(HeaderActions.JwtLogin(localStorage.getItem("RealFakeJwt")));
            },3000);
        },
        onDelLike: (userId,commId) => {
            dispatch(Actions.Start());
            dispatch(Actions.DelLike(userId,commId, localStorage.getItem("RealFakeJwt")));
            setTimeout(()=>{
                dispatch(Actions.FetchLike(userId,localStorage.getItem("RealFakeJwt")));
            },Constants.reFetchTimeOut);
        },
        onFetchLikeList: (userId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchLike(userId, localStorage.getItem("RealFakeJwt")));
        },
        onFetchDiscountList: (userId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchDiscount(userId, localStorage.getItem("RealFakeJwt")));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));
