import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Tooltip, Icon, message, Spin, Pagination, Radio, BackTop, Select} from 'antd';
import * as Actions from '../actions';
import {getCommodityByPageSize as getCommodityByPage} from '../selector';
import {getCommodityBySort as getCommodityByFilter} from '../selector';
import LikeToggle from '../../../common/likeToggle';
import {Link} from 'react-router-dom'
import user from "../../../shareComponent/user/view/user";

const Option = Select.Option;
const {Meta} = Card;

class commodity extends React.Component {

    constructor(props) {
        super(props);
        // 回到页面顶部
        window.scrollTo(0, 0);
        // 当kw为空时说明有可能是地址访问或者没有输入关键字搜索
        // 将路径的参数初始化为关键字即可 如果是关键字为undefined则saga获取数据前判断为获取全部数据

        this.state = {
            brandId: undefined,
            seriesId: undefined,
            typeId: undefined,
            uniteId: undefined,
            price: 1000000,
            sort: "date",
            desc: true,

            dateStart: 0, // 默认开始时间
            dateEnd: 9999999999999, // 默认结束时间

            pageSize: 15, //默认当前页数据量
            keyWord: this.props.kw, // 默认搜索条件
        };

    }

    componentDidMount() {
        console.log(this.props.keyWord);
        this.props.onSearchInit({
            ...this.state,
            keyWord: this.props.keyWord === "undefined" ? undefined : this.props.keyWord
        });
    }

    componentWillReceiveProps(nextProps) {
        // 接收到新的keyword就更新
        if (this.props.keyWord !== nextProps.keyWord) {
            this.props.onSearchInit({
                ...this.state,
                keyWord: nextProps.keyWord === "undefined" ? undefined : nextProps.keyWord
            });
        }
    }


    render() {
        const {
            commList,
            isLoading,
            typeList,
            uniteList,
            brandList,
            seriesList,
            scrollId,
            showLoadMore,
            onSearch,
            onSearchInit,
            onLikeNewCommodity, onDislikeNewCommodity, onTurnPage, onLogin, onCarClick, // 桉顺序：收藏、取消收藏、翻页、登录,打开购物车
        } = this.props;
        const {
            keyWord,
            pageNum,
            pageSize,
            sort,
            desc,
            price,
            uniteId,
            brandId,
            seriesId,
            typeId,
            dateStart, // 默认开始时间
            dateEnd,
        } = this.state;
        const loadMore = !isLoading ? (
            showLoadMore ? (
                <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px', marginBottom: 20}}>
                    <Button onClick={() => {
                        onSearch(this.state, scrollId)
                    }}>加载更多</Button>
                </div>
            ) : (
                <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px', marginBottom: 20}}>
                    已经加载全部
                </div>
            )
        ) : (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px', marginBottom: 20}}>
                <Spin/>
            </div>
        );
        return (
            <div>
                <Spin tip="搜索中..." spinning={isLoading} size={"large"}>
                    {/*过滤*/}
                    <Row>
                        <Row style={{margin: "2%", marginBottom: "1%"}}>
                            <Col span={12}>
                                <strong>筛选方式</strong>
                            </Col>
                            <Col span={12} style={{textAlign: "right"}}>
                                <strong>排序方式</strong>
                            </Col>
                        </Row>
                        <Row style={{margin: "1%"}}>
                            <Col span={2}>
                                <Select notFoundContent={"没有匹配内容"} allowClear dropdownMatchSelectWidth={false}
                                        disabled={isLoading} showSearch style={{width: "100%"}} placeholder="品牌"
                                        optionFilterProp="children"
                                        onChange={(e) => {
                                            onSearchInit({
                                                brandId: e,
                                                seriesId: seriesId,
                                                typeId: typeId,
                                                uniteId: uniteId,
                                                price: price,
                                                sort: sort,
                                                desc: desc,
                                                dateStart: dateStart,
                                                dateEnd: dateEnd,
                                                keyWord: keyWord,
                                                pageSize: pageSize
                                            });
                                            this.setState({
                                                brandId: e,
                                            });
                                        }}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {/*<Option value={undefined} key={"全部"}>全部</Option>*/}
                                    {   //遍历全部品牌
                                        brandList.map(function (item) {
                                            return (
                                                <Option value={item.brandId}
                                                        key={item.brandId}>{item.brandName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col span={2}>
                                <Select notFoundContent={"没有匹配内容"} allowClear dropdownMatchSelectWidth={false}
                                        disabled={isLoading}
                                        showSearch
                                        style={{width: "100%"}}
                                        placeholder="系列"
                                        optionFilterProp="children"
                                        onChange={(e) => {
                                            onSearchInit({
                                                brandId: brandId,
                                                seriesId: e,
                                                typeId: typeId,
                                                uniteId: uniteId,
                                                price: price,
                                                sort: sort,
                                                desc: desc,
                                                dateStart: dateStart,
                                                dateEnd: dateEnd,
                                                keyWord: keyWord,
                                                pageSize: pageSize
                                            });
                                            this.setState({
                                                seriesId: e,
                                            });
                                        }}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {/*<Option value={undefined} key={"全部"}>全部</Option>*/}
                                    {   //遍历选定品牌后该品牌下的系列
                                        brandId === undefined ? (
                                            seriesList.map((item, index) => (
                                                <Option value={item.seriesId}
                                                        key={index}>{item.seriesName}</Option>
                                            ))
                                        ) : (
                                            seriesList
                                                .filter(item => (item.brand !== null && item.brand.brandId === brandId))
                                                .map((item, index) => (
                                                    <Option value={item.seriesId}
                                                            key={index}>{item.seriesName}</Option>
                                                ))
                                        )

                                    }
                                </Select>
                            </Col>
                            <Col span={2}>
                                <Select notFoundContent={"没有匹配内容"} allowClear dropdownMatchSelectWidth={false}
                                        disabled={isLoading}
                                        showSearch
                                        style={{width: "100%"}}
                                        placeholder="联名"
                                        optionFilterProp="children"
                                        onChange={(e) => {
                                            onSearchInit({
                                                brandId: brandId,
                                                seriesId: seriesId,
                                                typeId: typeId,
                                                uniteId: e,
                                                price: price,
                                                sort: sort,
                                                desc: desc,
                                                dateStart: dateStart,
                                                dateEnd: dateEnd,
                                                keyWord: keyWord,
                                                pageSize: pageSize
                                            });
                                            this.setState({
                                                uniteId: e,
                                            });
                                        }}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {/*<Option value={undefined} key={"-1"}>全部</Option>*/}
                                    {   //遍历全部类型
                                        uniteList.map(function (item) {
                                            return (
                                                <Option value={item.uniteId}
                                                        key={item.uniteId}>{item.uniteName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col span={2}>
                                <Select notFoundContent={"没有匹配内容"} allowClear dropdownMatchSelectWidth={false}
                                        disabled={isLoading}
                                        showSearch
                                        style={{width: "100%"}}
                                        placeholder="类型"
                                        optionFilterProp="children"
                                        onChange={(e) => {
                                            onSearchInit({
                                                brandId: brandId,
                                                seriesId: seriesId,
                                                typeId: e,
                                                uniteId: uniteId,
                                                price: price,
                                                sort: sort,
                                                desc: desc,
                                                dateStart: dateStart,
                                                dateEnd: dateEnd,
                                                keyWord: keyWord,
                                                pageSize: pageSize
                                            });
                                            this.setState({
                                                typeId: e,
                                            });
                                        }}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {/*<Option value={undefined} key={"-1"}>全部</Option>*/}
                                    {   //遍历全部类型
                                        typeList.map(function (item) {
                                            return (
                                                <Option value={item.typeId} key={item.typeId}>{item.typeName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col span={2}>
                                <Select notFoundContent={"没有匹配内容"} allowClear dropdownMatchSelectWidth={false}
                                        disabled={isLoading}
                                        showSearch
                                        style={{width: "100%"}}
                                        placeholder="价格"
                                        optionFilterProp="children"
                                        onChange={(e) => {
                                            onSearchInit({
                                                brandId: brandId,
                                                seriesId: seriesId,
                                                typeId: typeId,
                                                uniteId: uniteId,
                                                price: e,
                                                sort: sort,
                                                desc: desc,
                                                dateStart: dateStart,
                                                dateEnd: dateEnd,
                                                keyWord: keyWord,
                                                pageSize: pageSize
                                            });
                                            this.setState({
                                                price: e,
                                            });
                                        }}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={200} key={200}>200以下</Option>
                                    <Option value={300} key={300}>300以下</Option>
                                    <Option value={400} key={400}>400以下</Option>
                                    <Option value={500} key={500}>500以下</Option>
                                    <Option value={9999} key={9999}>我有钱</Option>
                                </Select>
                            </Col>

                            <Col span={14} style={{textAlign: "right"}}>
                                <Radio.Group defaultValue={"date"} buttonStyle="solid" onChange={(e) => {
                                    onSearchInit({
                                        brandId: brandId,
                                        seriesId: seriesId,
                                        typeId: typeId,
                                        uniteId: uniteId,
                                        price: price,
                                        sort: e.target.value,
                                        desc: desc,
                                        dateStart: dateStart,
                                        dateEnd: dateEnd,
                                        keyWord: keyWord,
                                        pageSize: pageSize
                                    });
                                    this.setState({
                                        sort: e.target.value,
                                    });
                                }}>
                                    <Radio.Button value={"like"} onClick={() => {
                                        if (sort === "like") {
                                            onSearchInit({
                                                brandId: brandId,
                                                seriesId: seriesId,
                                                typeId: typeId,
                                                uniteId: uniteId,
                                                price: price,
                                                sort: sort,
                                                desc: !desc,
                                                dateStart: dateStart,
                                                dateEnd: dateEnd,
                                                keyWord: keyWord,
                                                pageSize: pageSize
                                            });
                                            this.setState({
                                                desc: !desc
                                            });

                                        }
                                    }}>
                                        收藏
                                        {   // 如果当前没有选中 则不显示箭头
                                            sort === undefined ? (
                                                // 根据desc判断箭头指示方向
                                                desc ? (
                                                    <Icon type="arrow-down" theme="outlined"/>
                                                ) : (
                                                    <Icon type="arrow-up" theme="outlined"/>
                                                )
                                            ) : null
                                        }
                                    </Radio.Button>
                                    <Radio.Button value="glance" onClick={(e) => {
                                        if (sort === "glance") {
                                            onSearchInit({
                                                brandId: brandId,
                                                seriesId: seriesId,
                                                typeId: typeId,
                                                uniteId: uniteId,
                                                price: price,
                                                sort: sort,
                                                desc: !desc,
                                                dateStart: dateStart,
                                                dateEnd: dateEnd,
                                                keyWord: keyWord,
                                                pageSize: pageSize
                                            });
                                            this.setState({
                                                desc: !desc
                                            })
                                        }
                                    }}>
                                        浏览量{   // 如果当前没有选中 则不显示箭头
                                        sort === "glance" ? (
                                            // 根据desc判断箭头指示方向
                                            desc ? (
                                                <Icon type="arrow-down" theme="outlined"/>
                                            ) : (
                                                <Icon type="arrow-up" theme="outlined"/>
                                            )
                                        ) : null
                                    }
                                    </Radio.Button>
                                    <Radio.Button value="sales" onClick={(e) => {
                                        if (sort === "sales") {
                                            onSearchInit({
                                                brandId: brandId,
                                                seriesId: seriesId,
                                                typeId: typeId,
                                                uniteId: uniteId,
                                                price: price,
                                                sort: sort,
                                                desc: !desc,
                                                dateStart: dateStart,
                                                dateEnd: dateEnd,
                                                keyWord: keyWord,
                                                pageSize: pageSize
                                            });
                                            this.setState({
                                                desc: !desc
                                            })
                                        }
                                    }}>
                                        销量{   // 如果当前没有选中 则不显示箭头
                                        sort === "sales" ? (
                                            // 根据desc判断箭头指示方向
                                            desc ? (
                                                <Icon type="arrow-down" theme="outlined"/>
                                            ) : (
                                                <Icon type="arrow-up" theme="outlined"/>
                                            )
                                        ) : null
                                    }</Radio.Button>
                                    <Radio.Button value="price" onClick={() => {
                                        if (sort === "price") {
                                            onSearchInit({
                                                brandId: brandId,
                                                seriesId: seriesId,
                                                typeId: typeId,
                                                uniteId: uniteId,
                                                price: price,
                                                sort: sort,
                                                desc: !desc,
                                                dateStart: dateStart,
                                                dateEnd: dateEnd,
                                                keyWord: keyWord,
                                                pageSize: pageSize
                                            });
                                            this.setState({
                                                desc: !desc
                                            })
                                        }
                                    }}>
                                        价格
                                        {
                                            sort === "price" ? (
                                                desc ? (
                                                    <Icon type="arrow-down" theme="outlined"/>
                                                ) : (
                                                    <Icon type="arrow-up" theme="outlined"/>
                                                )
                                            ) : null
                                        }
                                    </Radio.Button>
                                    <Radio.Button value="date" onClick={() => {
                                        if (sort === "date") {
                                            onSearchInit({
                                                brandId: brandId,
                                                seriesId: seriesId,
                                                typeId: typeId,
                                                uniteId: uniteId,
                                                price: price,
                                                sort: sort,
                                                desc: !desc,
                                                dateStart: dateStart,
                                                dateEnd: dateEnd,
                                                keyWord: keyWord,
                                                pageSize: pageSize
                                            });
                                            this.setState({
                                                desc: !desc
                                            })
                                        }
                                    }}>
                                        时间
                                        {
                                            sort === "date" ? (
                                                desc ? (
                                                    <Icon type="arrow-down" theme="outlined"/>
                                                ) : (
                                                    <Icon type="arrow-up" theme="outlined"/>
                                                )
                                            ) : null

                                        }
                                    </Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>

                    </Row>

                </Spin>
                {/*商品*/}
                <Row>
                    {   // 如果筛选后没数据，显示提示信息
                        commList.length === 0 ? (
                            <div style={{textAlign: "center", padding: 50}}>没有搜到商品或者没有匹配筛选条件的商品</div>
                        ) : null
                    }
                    {
                        // 遍历显示当前页面 商品数据
                        commList.map(function (item) {
                            return (
                                <Card // 商品卡片
                                    key={item.commId}
                                    bordered={false}
                                    bodyStyle={{padding: 10, textAlign: "left"}}
                                    hoverable
                                    style={{
                                        width: "32.3%",
                                        textAlign: "center",
                                        display: "inline-block",
                                        margin: "0.5%",
                                        padding: "0.5%"
                                    }}
                                    cover={
                                        <Link to={"/commodities/" + item.commId}>
                                            <img src={item.cover}
                                                 style={{width: "100%"}}
                                            />
                                        </Link>
                                    }
                                >
                                    <Meta //商品信息
                                        style={{paddingBottom: 10}}
                                        title={<span style={{fontWeight: "bold"}}>
                                            <Link to={"/commodities/"+item.commId}
                                                  style={{fontSize: 20,color:item.isOut?"#ff0006":"#000"}}>
                                        {item.isOut?"等待补货:":""+item.title}
                                    </Link>
                                                    </span>}
                                        description={
                                            <Link to={"/commodities/" + item.commId} style={{color: "#6c6c6c"}}>
                                                <img //从虎扑偷的图
                                                    src={"//sh1.hoopchina.com.cn/fis_static/trade/static/shihuo/images/t1_index_c492037.png"}/>
                                                {/*<Icon type="tags" theme="outlined"/>*/}
                                                {"" + item.describe.slice(0, 15) + "..."}
                                                <img
                                                    src={"//sh1.hoopchina.com.cn/fis_static/trade/static/shihuo/images/t2_index_65ddcbc.png"}/>
                                            </Link>}
                                    />
                                    <Row type="flex" justify="space-between">
                                        <Col span={4}>
                                                    <span style={{
                                                        fontWeight: "bold",
                                                        color: "#098aff"
                                                    }}>{"￥" + item.price.reduce((price, next) => (next < price ? next : price), 9999)}</span>
                                        </Col>
                                        <Col span={10} style={{textAlign: "right"}}>

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
                                    <Row style={{fontSize: 8, paddingTop: 5}}>
                                        {   // 将long整型毫秒数转化为日期格式，之前方便排序
                                            new Date(item.date).Format("yyyy-MM-dd hh:mm:ss")
                                        }
                                    </Row>
                                </Card>
                            )
                        })
                    }
                </Row>

                <Row style={{textAlign: "center"}}>
                    {loadMore}
                </Row>
            </div>

        )
    }
}

// props绑定state
const mapStateToProps = (state) => {
    const searchCommodity = state.search.searchCommodity; // 获得search页面搜索商品组件的状态

    const header = state.header;
    return {

        brandList: header.brandList,
        typeList: header.typeList,
        seriesList: header.seriesList,
        uniteList: header.uniteList,
        commList: searchCommodity.commList, // 根据关键字搜索的所有商品数据
        isLoading: searchCommodity.isLoading, // 是否正在搜索
        showLoadMore: searchCommodity.showLoadMore, // 是否正在搜索
        scrollId: searchCommodity.scrollId, // 是否正在搜索
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        // 搜索
        onSearchInit: (searchInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Init(searchInfo));
        },
        // 搜索
        onSearch: (searchInfo, scrollId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Search(searchInfo, scrollId));
        },
        // 收藏
        onLikeNewCommodity: (id, list) => {
            dispatch(Actions.Like(id, list));
        },
        // 取消收藏
        onDislikeNewCommodity: (id, list) => {
            dispatch(Actions.Dislike(id, list));
        },
        // 登陆
        onLogin: () => {
            message.info("请先登录~");
            // dispatch(Actions.Like(id));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(commodity);

// 日期转换
Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
