import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Icon, Tooltip} from 'antd';
import * as Actions from '../actions';
import {Link} from 'react-router-dom';

const {Meta} = Card;

class hotCommodityArea extends React.Component {

    constructor(props) {
        super(props);

        this.props.onFetchHotCommodity();
    }


    render() {
        const commodityAreaStyle = {
            margin: "2%"
        };
        const {list, isLoading, onCommodityClick} = this.props;

        const bodyStyle = {};
        const headStyle = {};
        const extra = (
            <span> <a>更多 <Icon type="right" theme="outlined"/></a></span>
        );
        return (
            <div style={commodityAreaStyle}>
                <Card
                    title={"热门商品"}
                    extra={extra}
                    bordered={true}
                    bodyStyle={bodyStyle}
                    headStyle={headStyle}
                    loading={isLoading}
                >
                    {
                        list.map(function (item,index) {
                            return (<Link to={"/commodities/" + item.id} key={index}>
                                <Tooltip title={item.title} >

                                        <Card
                                            bordered={false}
                                            bodyStyle={{padding: 10}}
                                            style={{
                                                width: "48%",
                                                textAlign: "center",
                                                display: "inline-block",
                                                margin: "1%"
                                            }}
                                            cover={<Avatar src={item.img} shape={"square"} size={90}/>}
                                        >
                                            <Meta
                                                title={"￥" + item.price}
                                            />
                                        </Card>
                                </Tooltip>
                                </Link>
                            )
                        })
                    }
                </Card>
            </div>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const hotCommodity = state.home.hotCommodity;

    return {
        list: hotCommodity.list,
        isLoading: hotCommodity.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchHotCommodity: () => {
            dispatch(Actions.Fetching());
        },
        onCommodityClick: (id) => {
            console.log("点击了" + id);
            // dispatch();
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(hotCommodityArea);