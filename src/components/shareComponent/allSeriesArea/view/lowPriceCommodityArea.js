import React from 'react';
import {connect} from 'react-redux';
import {List, Row, Col, Avatar, Button, Icon, Affix} from 'antd';
import * as Actions from '../actions';
import {Link} from 'react-router-dom';

class lowPriceCommodityArea extends React.Component {

    constructor(props) {
        super(props);

        this.props.onFetchLowPriceCommodity();
    }

    render() {
        const commodityAreaStyle = {
            backgroundColor: "#fff",
            margin:"2%"
        };
        const {list, isLoading, onCommodityClick} = this.props;

        const header = (
            <div style={{paddingTop: 10, paddingBottom: 10}}>

                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        <span style={{fontSize: 16}}>特价商品</span>
                    </Col>
                    <Col>
                        <span> <a>更多 <Icon type="right" theme="outlined"/></a></span>
                    </Col>
                </Row>
            </div>
        );
        return (
            <Affix offsetTop={0}>
                <div style={commodityAreaStyle}>
                    <List
                        dataSource={list}
                        bordered={true}
                        loading={isLoading}
                        header={header}
                        size={"small"}
                        split={true}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Link to={"/commodities/"+item.id}><Avatar src={item.img} size={70} shape="square"/></Link>}
                                    title={<Link to={"/commodities/"+item.id}>{item.name}</Link>}
                                    description={"特价：" + item.price}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Affix>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const lowPriceCommodity = state.home.lowPriceCommodity;

    return {
        list: lowPriceCommodity.list,
        isLoading: lowPriceCommodity.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchLowPriceCommodity: () => {
            dispatch(Actions.Fetching());
        },
        onCommodityClick: (id) => {
            console.log("点击了" + id);
            // dispatch();
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(lowPriceCommodityArea);