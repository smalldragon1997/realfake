import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Select} from 'antd';
import * as Actions from '../actions';
import {getSeriesByFilterBrand} from '../selector';

const Option = Select.Option;

class filter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const brandAreaStyle = {

        };
        const {brandList, typeList,seriesList,finalList, // brand品牌列表，type类型列表，series系列列表，当页商品数据
            isLoading, //是否正在加载
            onBrandChange,onSeriesChange,onTypeChange,onPriceChange // 按顺序：品牌选择事件、系列选择、类型选择、价格选择
        } = this.props;


        return (
           null
        )
    }
}

// props绑定state
const mapStateToProps = (state) => {
    const header = state.header; // 获得页面头部数据，包含(品牌列表等...)
    const searchCommodity = state.search.searchCommodity; // 获得搜索页面搜索数据
    return {
        finalList:searchCommodity.finalList, // 当前页面数据
        isLoading:header.isLoading, // 头部数据是否正在初始化
        brandList:header.brandList, // 头部数据的品牌列表
        typeList:header.typeList, // 头部数据的类型列表
        seriesList:getSeriesByFilterBrand(header,searchCommodity) // 根据选定的品牌，筛选该品牌下的系列列表
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        // 在选择筛选条件之后 将页面跳转回第一页
        onBrandChange: (id) => {
            dispatch(Actions.FilterBrand(id));
            dispatch(Actions.TurnPage(1,3));
        },
        onSeriesChange: (id) => {
            dispatch(Actions.FilterSeries(id));
            dispatch(Actions.TurnPage(1,3));
        },
        onTypeChange: (id) => {
            dispatch(Actions.FilterSeries(id));
            dispatch(Actions.TurnPage(1,3));
        },
        onPriceChange: (value) => {
            dispatch(Actions.FilterPrice(value));
            dispatch(Actions.TurnPage(1,3));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(filter);
