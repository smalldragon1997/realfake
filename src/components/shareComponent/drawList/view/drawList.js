import React from 'react';
import {connect} from 'react-redux';
import {List, Button, Drawer, Avatar, Spin, Checkbox, message} from 'antd';
import * as Actions from '../actions';
import * as PrivacyActions from '../../../privacyComponent/privacyArea/actions';
import {Link, withRouter} from 'react-router-dom';
import * as Constants from '../../../../constants';
import CarItem from './carItem';


class drawList extends React.Component {

    constructor(props) {
        super(props);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.goTrade = this.goTrade.bind(this);
        this.goTradeAlone = this.goTradeAlone.bind(this);
        this.state = {
            total: 0,
            carList:[]
        }
    }

    componentDidMount() {
        if (this.props.userInfo !== undefined) {
            setTimeout(() => {
                // 登录后令牌不会马上生效，等待令牌生效后 再获取订单
                this.props.onFetchCarList(this.props.userInfo.userId);
                this.props.onFetchProcessOrderList(this.props.userInfo.userId);
            }, 1000);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.userInfo !== this.props.userInfo&&nextProps.userInfo!==undefined) {
            this.props.onFetchCarList(nextProps.userInfo.userId);
            this.props.onFetchProcessOrderList(nextProps.userInfo.userId);
        }
    }

    onCheckChange(price,commodity,qualId,sizeId) {
        // 如果价格小于0 说明是取消勾选 删除carList中的carInfo
        if(price<0){
            this.setState({
                total: this.state.total + price,
                carList:this.state.carList.filter(item=>!(item.commodity.commId===commodity.commId&&item.qualId===qualId&&item.sizeId===sizeId))
            })
        }else{
            this.setState({
                total: this.state.total + price,
                carList:this.state.carList.concat({
                    commodity:commodity,
                    qualId:qualId,
                    sizeId:sizeId
                })
            })
        }
        console.log(this.state)
    }


    // 购买
    goTrade() {
        setTimeout(()=>this.props.onTradeInit(),1000);
        if (this.state.carList.length === 0) {
            message.error("购买参数错误");
        } else {
            this.props.history.push({pathname: '/orders/trade', state: {carList: this.state.carList}});
        }
    }

    // 单独购买
    goTradeAlone(carInfo) {
        setTimeout(()=>this.props.onTradeInit(),1000);
        this.props.history.push({pathname: '/orders/trade', state: {carList: [carInfo]}});
    }


    render() {
        const {isLoading, carList, visible, onCloseClick, isLogin, userInfo, onDelCar, onUpdateCar, checked} = this.props;

        return (
            <Drawer
                width={800}
                title="购物车"
                placement="right"
                closable={true}
                onClose={onCloseClick}
                visible={visible}
            >
                {
                    userInfo !== undefined ? (
                        carList.length === 0 ? (
                            "购物车空空如也~"
                        ) : (
                            <List
                                locale={"购物车空空如也~"}
                                loading={isLoading}
                                itemLayout="horizontal"
                                dataSource={carList}
                                renderItem={(item,index) => (
                                    <CarItem
                                        key={index}
                                        car={item}
                                        carList={carList}
                                        onDelCar={onDelCar}
                                        onUpdateCar={onUpdateCar}
                                        goTradeAlone={this.goTradeAlone}
                                        onCloseClick={onCloseClick}
                                        onCheckChange={this.onCheckChange}
                                    />
                                )}
                            />
                        )

                    ) : (
                        <div>
                            <div>登录后就可以添加到购物车啦</div>
                            <Button onClick={onCloseClick} type="primary">登录</Button></div>
                    )
                }
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e8e8e8',
                    padding: '10px 16px',
                    textAlign: 'right',
                    left: 0,
                    background: '#fff',
                    borderRadius: '0 0 4px 4px',
                }}>
                    <span style={{marginRight: 20, fontSize: 20, color: "#009dff"}}>
                        {"总价格(不包括优惠):￥" + this.state.total}
                    </span>
                    <Button style={{marginRight: 8}} onClick={onCloseClick}>
                        返回
                    </Button>
                    {
                        userInfo !== undefined ? (<Button disabled={this.state.carList.length===0} onClick={() => {
                                onCloseClick();
                                this.goTrade();
                            }} type="primary">结算</Button>)
                            : (<Button onClick={onCloseClick} type="primary">登录</Button>)
                    }

                </div>
            </Drawer>
        );
    }
}

// props绑定state
const mapStateToProps = (state) => {
    const header = state.header;
    const privacy = state.privacy.privacy;
    const drawList = state.drawList;
    return {
        userInfo: header.userInfo,
        isLoading: privacy.isLoading,
        carList: privacy.carList,
        visible: drawList.visible,
        checkList: drawList.checkList,
        checked: drawList.checked
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onCloseClick: () => {
            dispatch(Actions.Close());
        },
        onUpdateCar: (carInfo,oldCarInfo) => {
            dispatch(PrivacyActions.DelCar(oldCarInfo, localStorage.getItem("RealFakeJwt")));
            dispatch(PrivacyActions.AddCar(carInfo, localStorage.getItem("RealFakeJwt")));
            setTimeout(() => {
                dispatch(PrivacyActions.FetchCar(carInfo.userId, localStorage.getItem("RealFakeJwt")));
            }, 5000)
        },
        onDelCar: (carInfo) => {
            dispatch(PrivacyActions.DelCar(carInfo, localStorage.getItem("RealFakeJwt")));
            setTimeout(() => {
                dispatch(PrivacyActions.FetchCar(carInfo.userId, localStorage.getItem("RealFakeJwt")));
            }, 2000)
        },
        onFetchCarList: (userId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchCar(userId, localStorage.getItem("RealFakeJwt")));
        },
        onFetchProcessOrderList: (userId) => {
            dispatch(PrivacyActions.Start());
            dispatch(PrivacyActions.FetchProcessOrderList(userId, localStorage.getItem("RealFakeJwt")));
        },
        onTradeInit: () => {
            dispatch(PrivacyActions.TradeInit());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(drawList));
