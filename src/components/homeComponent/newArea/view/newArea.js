import React from 'react';
import {connect} from 'react-redux';
import {Icon, Row, Col, Avatar, Button, Tooltip, List,message,Spin} from 'antd';
import * as Actions from '../actions';
import * as CommodityActions from '../../../searchComponent/searchCommodityArea/actions';
import LikeToggle from '../../../common/likeToggle';
import {Link} from 'react-router-dom'

// 列表item的样式
const itemStyle = {
    padding: 0,
    backgroundColor: "#fff",
    margin: 5
};
class newArea extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){

        this.props.onFetchNewCommodity(this.props.scrollId);
    }

    render() {

        const {
            info,
            commodityList,
            isLoading,
            showLoadMore,
            isLogin,
            onItemClick,
            onLikeNewCommodity,
            onDislikeNewCommodity,
            onFetchNewCommodity,
            onLogin,
            scrollId
        } = this.props;
        const loadMore = !isLoading? (
            showLoadMore?(
                <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' ,marginBottom:20}}>
                    <Button onClick={()=>{onFetchNewCommodity(scrollId)}}>加载更多</Button>
                </div>
            ):(
                <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' ,marginBottom:20}}>
                    已经加载全部
                </div>
            )
        ) : (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' ,marginBottom:20}}>
                <Spin/>
            </div>
        );


        return (
            <List
                header={(
                    <div style={{textAlign:"center"}}>最近更新</div>
                )}
                loadMore={loadMore}
                itemLayout="horizontal"
                dataSource={commodityList}
                renderItem={item => (
                    <List.Item style={itemStyle}>
                        <List.Item.Meta
                            style={{padding: 10}}
                            avatar={<Link to={"/commodities/"+item.commId}><Avatar src={item.cover} size={200} shape={"square"}/></Link>}
                            title={
                                <div style={{paddingTop: 5}}>
                                    <Link to={"/commodities/"+item.commId}
                                       style={{fontSize: 20,color:item.isOut?"#ff0006":"#000"}}>
                                        {item.isOut?"等待补货:":""+item.title}
                                    </Link>
                                </div>
                            }
                            description={
                                <div>
                                    <Row style={{height:100}}>
                                        <span style={{lineHeight: 2.5}}>
                                            <img src={"//sh1.hoopchina.com.cn/fis_static/trade/static/shihuo/images/t1_index_c492037.png"}/>
                                            {item.describe}
                                            <img src={"//sh1.hoopchina.com.cn/fis_static/trade/static/shihuo/images/t2_index_65ddcbc.png"}/>
                                        </span>
                                    </Row>
                                    <Row >
                                         <span style={{lineHeight: 2.5,color:"#069eff",fontWeight:"bold",fontSize:15}}>
                                            ￥ {item.price.reduce((result,next)=>(next<result?next:result),9999)}
                                        </span>
                                    </Row>
                                    <Row type="flex" justify="space-between" align="bottom" >
                                        <Col span={6}>
                                            {new Date(item.date).Format("yyyy-MM-dd hh:mm:ss")}
                                        </Col>
                                        <Col span={4}>
                                            <Icon type="eye" style={{color: "#0082ff"}}/>
                                            <span style={{marginRight: "10%"}}>
                                                {" " + item.glance}
                                            </span>

                                            <Icon type="heart" theme="filled" style={{fontSize: 15,color: "#0082ff"}}/>

                                            <span style={{marginRight: "10%"}}>
                                                {" " + item.like}
                                            </span>
                                        </Col>
                                    </Row>
                                </div>

                            }
                        />
                    </List.Item>
                )}
            />
        )
    }
}

// props绑定state
const mapStateToProps = (state) => {
    const newArea = state.home.newArea;
    const user = state.user;
    return {
        info: user,
        commodityList: newArea.commodityList,
        scrollId: newArea.scrollId,
        isLoading: newArea.isLoading,
        showLoadMore:newArea.showLoadMore
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onItemClick: (id) => {
            console.log("点击了" + id);
            // dispatch();
        },
        onFetchNewCommodity: (scrollId) => {
            dispatch(Actions.Fetching(scrollId));
        },
        onLikeNewCommodity: (id,list) => {
            dispatch(CommodityActions.Like(id,list));
        },
        onDislikeNewCommodity: (id,list) => {
            dispatch(CommodityActions.Dislike(id,list));
        },
        onLogin: () => {
            message.info("请先登录~");
            // dispatch(Actions.Like(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(newArea);