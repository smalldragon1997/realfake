import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Icon, Button, BackTop} from 'antd';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import {Card, Popover, Tooltip} from 'antd';
import {actions as PrivacyActions} from '../../../privacyComponent/privacyArea';
import * as Actions from '../actions';
import {actions as CarActions} from '../../../shareComponent/drawList';


const SubMenu = Menu.SubMenu;

class nav extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        // 如果存在jwt，则验证令牌有效性
        const jwt = localStorage.getItem("RealFakeJwt");
        if(jwt!==undefined&&jwt!==null&&jwt!==""&&this.props.userInfo===undefined){
            this.props.onAuthJwt(jwt);
        }
        // 回到页面顶部
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.props.onFetchMenu();
        if(this.props.userInfo!==undefined){
            this.props.onFetchLikeList(this.props.userInfo.userId);
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.userInfo !== this.props.userInfo) {
    //         this.props.onFetchCarList(nextProps.userInfo.userId);
    //     }
    // }


    handleClick(e) {
        this.setState({
            current: e.key,
        });
    };

    render() {
        const {
            userInfo,
            onCarClick,
            brandList,
            seriesList,
            uniteList
        } = this.props;
        //导航栏样式
        const navStyle = {
            backgroundColor: "#001529"
        };
        // 系列分类card样式
        const cardStyle = {
            padding: 0,
            width: 910
        };
        // 系列分类grid样式
        const seriesStyle = {
            padding: 5,
            width: 130,
            textAlign: 'center',
        };
        // 系列分类图片样式
        const seriesImgStyle = {
            maxHeight: 90,
            maxWidth: 130
        };
        // grid列表
        const seriesGrid = (
            seriesList.map(function (item, index) {
                return (
                    <Link to={"/series/" + item.seriesId} key={index}>
                        <Tooltip title={item.seriesName}>
                            <Card.Grid style={seriesStyle}>
                                <img src={item.cover} style={seriesImgStyle}/>
                            </Card.Grid>
                        </Tooltip>
                    </Link>
                )
            })
        );
        // 系列分类content
        const seriesContent = (
            <Card bordered={false} bodyStyle={cardStyle}>
                {seriesGrid}
            </Card>
        );
        let userMenu = (
            <span> 登录 注册 </span>
        );
        if (this.props.userInfo!==undefined) {
            userMenu = (
                <Menu
                    theme={"dark"}
                    mode="horizontal"
                >
                    <SubMenu
                        title={<span> {this.props.userInfo.nickname} <Icon type="caret-down"/> </span>}>
                        <Menu.Item key={"个人信息"}><Link to={"/privacy"}>个人信息</Link></Menu.Item>
                        <Menu.Item key={"我的订单"}><Link to={"/orders"}>我的订单</Link></Menu.Item>
                        <Menu.Item key={"我的地址"}><Link to={"/privacy/address"}>我的地址</Link></Menu.Item>
                        <Menu.Item key={"退出"}><Link to={"/privacy/account"}>退出</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            )
        } else {
            userMenu = (
                <Menu
                    theme={"dark"}
                    mode="horizontal"
                >
                    <SubMenu title={<span>登录|注册</span>}>
                        <Menu.Item key={"登录已有账号"}><Link to={"/privacy/login"}>登录已有账号</Link></Menu.Item>
                        <Menu.Item key={"10秒注册新账号"}><Link to={"/privacy/register"}>10秒注册新账号</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            )
        }
        return (
            <Row style={navStyle}>
                <Row style={navStyle} type="flex" justify="space-around">
                    <Col xs={24} sm={24} md={24} lg={24} xl={19} xxl={14}>
                        <Row>
                            <Col span={20}>
                                <Menu
                                    theme={"dark"}
                                    style={navStyle}
                                    onClick={this.handleClick}
                                    selectedKeys={["home"]}
                                    mode="horizontal"
                                >
                                    <Menu.Item key="home">
                                        <a href="#">首页</a>
                                    </Menu.Item>
                                    <SubMenu title={<span>品牌分类</span>}>
                                        {brandList.map(function (item) {
                                            return (
                                                <Menu.Item key={item.brandName}>
                                                    <Link to={"/brands/" + item.brandId}>
                                                        {item.brandName}
                                                    </Link>
                                                </Menu.Item>
                                            )
                                        })}
                                    </SubMenu>
                                    <SubMenu title={<span>联名分类</span>}>
                                        {uniteList.map(function (item) {
                                            return <Menu.Item key={item.uniteName}>
                                                <Link to={"/unites/" + item.uniteId}>
                                                    {item.uniteName}
                                                </Link>
                                            </Menu.Item>
                                        })}
                                    </SubMenu>
                                    <Menu.Item key="series">
                                        <Popover content={seriesContent} placement="bottom">
                                            <span
                                                style={{color: "#059cff", fontWeight: "bold", fontSize: 15}}>系列大全</span>
                                        </Popover>
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col span={3} style={{textAlign: "right"}}>
                                {userMenu}
                            </Col>
                        </Row>


                        <BackTop style={{marginBottom: 140}}/>

                        <BackTop style={{marginBottom: 200}} visibilityHeight={-1}>
                            <Button
                                type={"primary"}
                                onClick={() => {
                                    onCarClick(userInfo.userId)
                                }}
                                style={{width: 40, height: 40, padding: 3}}>
                                <Icon style={{fontSize: 20}} type="shopping-cart"/>
                            </Button>
                        </BackTop>
                    </Col>
                </Row>
            </Row>
        );
    }
}

// props绑定state
const mapStateToProps = (state) => {
    state = state.header;
    return {
        brandList: state.brandList,
        uniteList: state.uniteList,
        seriesList: state.seriesList,
        userInfo: state.userInfo
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onAuthJwt: (jwt) => {
            dispatch(Actions.JwtLogin(jwt));
        },
        // 打开购物车
        onCarClick: (userId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchCar(userId, localStorage.getItem("RealFakeJwt")));
            dispatch(CarActions.Start());
        },
        //
        onFetchMenu: () => {
            dispatch(Actions.Fetching());
        },
        onFetchLikeList: (userId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchLike(userId, localStorage.getItem("RealFakeJwt")));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(nav);