import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Tooltip, Icon,BackTop} from 'antd';
import * as Actions from '../actions';
import {Link} from 'react-router-dom'

const {Meta} = Card;

class recommendSearchArea extends React.Component {

    constructor(props) {
        super(props);
        this.props.onFetchRecommend();
    }


    render() {
        const {
            list,
            isLoading,
            onItemClick,
        } = this.props;

        const bodyStyle = {padding:"3%"};
        const headStyle = {};


        return (
            <div style={{margin: "2%", marginTop: "6%"}}>
                <Card
                    title={<div style={{fontSize: 17}}>
                        <Icon  type="smile" theme="outlined" style={{padding: 8,fontSize:20,color:"#0097ff"}}/>猜你喜欢
                    </div>}
                    bordered={true}
                    bodyStyle={bodyStyle}
                    headStyle={headStyle}
                    loading={isLoading}
                >
                    {
                        list.map(function (item) {
                            return (
                                <Link to={"/search"} key={item.name}>
                                    <Button type="dashed" style={{margin:"3%"}}>{item.name}</Button>
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
    const recommendSearch = state.search.recommendSearch; // 获得搜索页面的推荐搜索组件状态

    return {
        list: recommendSearch.list, // 推荐搜索列表
        isLoading: recommendSearch.isLoading // 加载状态
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchRecommend: (id) => {
            dispatch(Actions.Fetching());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(recommendSearchArea);
