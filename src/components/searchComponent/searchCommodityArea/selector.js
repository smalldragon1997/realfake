import { createSelector } from 'reselect'

// 获取排序条件
const getSort = (state) => state.sort;
const getDesc = (state) => state.desc;
// 获取筛选条件
const getFilterBrand = (state) => state.brandId;
const getFilterType = (state) => state.typeId;
const getFilterSeries = (state) => state.seriesId;
const getFilterPrice = (state) => state.price;
// 获取所搜的商品列表
const getCommodityList = (state) => state.list;

//分页
const getPage = (state) => state.page;
const getSize = (state) => state.size;
const getSecondList = (state,props) => props;

// 获取系列列表
const getSeriesList = (state,props) => state.seriesList;
const getSelectedBrand = (state,props) => props.brandId;


const getCommodityByFilterBrand = createSelector(
    [ getCommodityList, getFilterBrand ],
    (commodityList, filterBrand) => {
        switch (filterBrand){
            case undefined: return commodityList;
            default: return commodityList.filter(
                item => item.brandId===filterBrand
            )
        }
    }
);

const getCommodityByFilterType = createSelector(
    [ getCommodityByFilterBrand, getFilterType ],
    (commodityList, filterType) => {
        switch (filterType){
            case undefined: return commodityList;
            default: return commodityList.filter(
                item => item.typeId===filterType
            )
        }
    }
);
const getCommodityByFilterSeries = createSelector(
    [ getCommodityByFilterType, getFilterSeries ],
    (commodityList, filterSeries) => {
        switch (filterSeries){
            case undefined: return commodityList;
            default: return commodityList.filter(
                item => item.seriesId===filterSeries
            )
        }
    }
);
const getCommodityByFilterPrice = createSelector(
    [ getCommodityByFilterSeries, getFilterPrice ],
    (commodityList, filterPrice) => {
        switch (filterPrice){
            case undefined: return commodityList;
            default: return commodityList.filter(
                item => item.price>=filterPrice*100&&item.price<=filterPrice*100+100
            )
        }
    }
);

export const getCommodityBySort = createSelector(
    [ getCommodityByFilterPrice, getSort,getDesc ],
    (commodityList, sort , desc) => {
        let result = commodityList;
        return desc?(
            result.sort(compareDesc(sort===undefined?"like":sort))
        ):(
            result.sort(compareRise(sort===undefined?"like":sort))
        )
    }
);

// 必须要传入会改变的state参数，才会触发函数执行，否则会返回缓存数据，导致数据不按预期更新
export const getCommodityByPageSize = createSelector(
    [ getSecondList, getPage, getSize, getSort,getDesc],
    (secondList, page,size,sort,desc) => {
        let finalList = [];
        for (let i = size*(page-1);i<size*page;i++){
            if(i === secondList.length) break;
            finalList.push(secondList[i]);
        }
        return finalList;
    }
);



export const getSeriesByFilterBrand = createSelector(
    [ getSeriesList, getSelectedBrand ],
    (seriesList, selectedBrand) => {
        switch (selectedBrand){
            case undefined: return seriesList;
            default:
                return seriesList.filter(
                    item => item.brandId===selectedBrand
                )
        }
    }
);


let compareRise = function (prop) {
    return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
};
let compareDesc = function (prop) {
    return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }
    }
};