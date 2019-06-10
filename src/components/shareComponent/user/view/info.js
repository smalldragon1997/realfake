import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button} from 'antd';
import * as Actions from '../actions';
import * as Status from '../status';
import {Link} from 'react-router-dom';

class info extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const userStyle = {
            backgroundColor: "#ffffff",
            margin:"2%"
        };
        const cardStyle = {
            paddingTop: 10,
            paddingBottom: 10
        };
        switch (this.props.userInfo!==undefined) {
            case Status.offline: {
                return (
                    <div style={userStyle}>
                        <Card loading={this.props.isLoading} bodyStyle={cardStyle}>
                            <br/>
                            <Row type="flex" justify="space-around" align="middle">
                                <Avatar size={70} icon="user"/>
                            </Row>
                            <br/>
                            <Row type="flex" justify="space-around" align="middle">
                                Hi,你好
                            </Row>
                            <Row type="flex" justify="space-around" align="middle">
                                登录更多精彩
                            </Row>
                            <br/>
                            <Row type="flex" justify="space-around" align="middle">
                                <Button type="primary"><Link to={"/privacy/login"}>登录</Link></Button>
                                <Button type="primary"><Link to={"/privacy/register"}>注册</Link></Button>
                            </Row>
                        </Card>
                    </div>
                );
            }
            case Status.online: {
                return (
                    <div style={userStyle}>
                        <Card loading={this.props.isLoading} bodyStyle={cardStyle}>
                            <br/>
                            <Row type="flex" justify="space-around" align="middle">
                                <Avatar size={70} src={this.props.userInfo.icon} />
                            </Row>
                            <br/>
                            <Row type="flex" justify="space-around" align="middle">
                                Hi,{this.props.userInfo.nickname}
                            </Row>
                            <Row type="flex" justify="space-around" align="middle">
                                欢迎你
                            </Row>
                        </Card>
                    </div>
                );
            }
            default:
                return (
                    <div style={hotStyle}>
                        <Card loading={true} bodyStyle={cardStyle}/>
                    </div>
                )
        }
    }
}

// props绑定state
const mapStateToProps = (state) => {
    state = state.header;
    return {
        userInfo: state.userInfo,
        isLoading: state.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onHotClick: (key) => {
            alert("点击了" + key);
            // dispatch();
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(info);