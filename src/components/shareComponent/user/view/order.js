import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Badge, Icon, Affix} from 'antd';
import * as Actions from '../actions';
import * as Status from '../status';
import * as CarActions from '../../drawList/actions';
import * as PrivacyActions from '../../../privacyComponent/privacyArea/actions';
import {Link} from 'react-router-dom';

const orderStyle = {
    backgroundColor: "#ffffff",
    margin: "2%"
};
const cardStyle = {
    paddingLeft: 10,
    paddingRight: 10
};
const rowStyle = {
    paddingTop: 5,
    paddingBottom: 5
};
const titleStyle = {
    textAlign: "center"
};
const btnStyle = {
    width: "30%"
};

class order extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        const {
            onCarClick,
            userInfo,
            carList,
            processOrderList,
            afterSaleList,
        } = this.props;

        return (

            userInfo === undefined ? null : (
                <div style={orderStyle}>
                    <Card loading={this.props.isLoading} bodyStyle={cardStyle} title={"快速通道"} headStyle={titleStyle}>
                        <Row type="flex" justify="space-around" align="middle" style={rowStyle}>
                            <Badge count={carList.length} title={carList.length + "件商品在购物车"}>
                                <Button type="dashed" onClick={() => {
                                    onCarClick(userInfo.userId);
                                }}>
                                    <Icon type="shopping-cart"/>购物车
                                </Button>
                            </Badge>
                            <Badge count={processOrderList.filter(item => item.state === 1).length}
                                   title={processOrderList.filter(item => item.state === 1).length + "件商品待付款"}>
                                <Link to={"/orders"}>
                                    <Button type="dashed">
                                        <Icon type="pay-circle"/>待付款
                                    </Button>
                                </Link>
                            </Badge>
                        </Row>
                        <Row type="flex" justify="space-around" align="middle" style={rowStyle}>
                            <Badge count={processOrderList.filter(item => item.state === 2).length}
                                   title={processOrderList.filter(item => item.state === 2).length + "件商品待发货"}>
                                <Link to={"/orders"}>
                                    <Button type="dashed">
                                        <Icon type="rocket"/>待发货
                                    </Button>
                                </Link>
                            </Badge>
                            <Badge count={processOrderList.filter(item => item.state === 3).length}
                                   title={processOrderList.filter(item => item.state === 3).length + "件商品待收货"}>
                                <Link to={"/orders"}>
                                    <Button type="dashed">
                                        <Icon type="home"/>待收货
                                    </Button>
                                </Link>
                            </Badge>
                        </Row>
                        <Row type="flex" justify="space-around" align="middle" style={rowStyle}>
                            <Badge count={processOrderList.filter(item => item.state === 4).length}
                                   title={processOrderList.filter(item => item.state === 4).length + "件商品待评价"}>
                                <Link to={"/orders"}>
                                    <Button type="dashed">
                                        <Icon type="like-o"/>待评价
                                    </Button>
                                </Link>
                            </Badge>
                            <Badge count={afterSaleList.filter(item => item.state < 3).length}
                                   title={afterSaleList.filter(item => item.state < 3).length + "个售后处理中"}>
                                <Link to={"/orders"}>
                                    <Button type="dashed">
                                        <Icon type="tool"/>售后中
                                    </Button>
                                </Link>
                            </Badge>
                        </Row>
                    </Card>
                </div>
            )
        )

    }
}

// props绑定state
const mapStateToProps = (state) => {
    const privacy = state.privacy.privacy;
    const header = state.header;
    return {
        userInfo: header.userInfo,
        carList: privacy.carList,
        processOrderList: privacy.processOrderList,
        afterSaleList: privacy.afterSaleList,
        isLoading: header.isLoading,
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onCarClick: (userId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchCar(userId, localStorage.getItem("RealFakeJwt")));
            dispatch(CarActions.Start());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(order);

