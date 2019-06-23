import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Tooltip, List,Divider} from 'antd';
import * as Actions from '../actions';
import {getSeriesByFilterBrand} from '../selector';
import {getCommoditiesBySeriesId} from '../selector';
import brands from "../../../../containers/brands/view/brands";
import {Link} from 'react-router-dom'

const {Meta} = Card;

class seriesUniteArea extends React.Component {

    constructor(props) {
        super(props);
        // // 当brand为空时说明有可能是地址访问或者没有点击按钮就进入页面
        // // 将路径的参数初始化为关键字即可 如果是关键字为undefined则saga获取数据前判断为获取全部数据
        // this.props.onFetchBrandCommodities(this.props.brandId);
    }


    render() {
        const seriesCardAreaStyle = {
            margin: "1%"
        };
        const {
            uniteList,
            commList,
            isLoading,
            brandInfo
        } = this.props;
        return (
            <div style={seriesCardAreaStyle}>
                <Divider style={{padding: "1%", margin: 0,  fontSize: 20}}>{brandInfo===undefined?undefined:brandInfo.brandName} 联名专区</Divider>

                <List
                    itemLayout="horizontal"
                    size="large"
                    dataSource={uniteList}
                    renderItem={item => (
                        <List.Item
                            key={item.uniteId}
                        >
                            <List.Item.Meta
                                avatar={<Link to={"/unites/" + item.uniteId}><Avatar src={item.cover} shape={"square"}
                                                                               size={170}/></Link>}
                                title={<div style={{marginTop: "1%", fontSize: 17}}>
                                    <Link to={"/unites/" + item.uniteId} style={{color: "#000"}}>{item.uniteName}</Link>
                                </div>}
                                description={<div style={{marginTop: "2%", width: "100%"}}>
                                    <Row style={{height: 55}}>
                                        <img
                                            src={"//sh1.hoopchina.com.cn/fis_static/trade/static/shihuo/images/t1_index_c492037.png"}/>
                                        {"" + item.describe.slice(0, 50) + "..."}
                                        <img
                                            src={"//sh1.hoopchina.com.cn/fis_static/trade/static/shihuo/images/t2_index_65ddcbc.png"}/>
                                    </Row>
                                    <Row type="flex" align="middle">
                                        <Col span={20}>
                                            {
                                                commList
                                                    .filter((item1,index)=>(
                                                        item1.uniteId.reduce((result,next)=>(result?result:next==item.uniteId),false)
                                                    ))
                                                    .map(function (i,index) {
                                                        if(index<5)
                                                    return (
                                                        <Link to={"/commodities/" + i.commId}>
                                                            <Card
                                                                key={item.commId}
                                                                hoverable
                                                                bodyStyle={{padding: 0}}
                                                                style={{textAlign: "center", display: "inline-block"}}
                                                                cover={<Avatar src={i.cover} shape={"square"}
                                                                               size={70}/>}
                                                            >
                                                            </Card>
                                                        </Link>
                                                    )
                                                })
                                            }
                                            <Link to={"/unites/" + item.uniteId}>
                                                <Card
                                                    key={"all"}
                                                    hoverable
                                                    bodyStyle={{padding: 0}}
                                                    style={{textAlign: "center", display: "inline-block"}}
                                                    cover={<Avatar
                                                        src={"http://www.shihuo.cn/images/trade/search/ps.jpg"}
                                                        shape={"square"} size={70}/>}
                                                >
                                                </Card>
                                            </Link>
                                        </Col>
                                        <Col span={4}>
                                            <Link to={"/unites/" + item.uniteId}>
                                                <Button ghost size={"large"} type={"dashed"}
                                                        style={{color: "#000"}}>联名详情</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const header = state.header;
    const brandCarousel = state.brands.brandCarousel;
    return {
        uniteList: header.uniteList,
        isLoading: header.isLoading,
        commList: brandCarousel.commList,
        brandInfo: brandCarousel.brandInfo
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchBrandCommodities: (brandId) => {
            dispatch(Actions.Fetching(brandId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(seriesUniteArea);