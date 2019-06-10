import { createSelector } from 'reselect'


// 获取系列列表
const getSeriesList = (state,props) => state;
const getSelectedBrand = (state,props) => props;
// 获取商品列表和系列id
const getCommodityList = (state,props) => state;
const getSeriesId = (state,props) => props;

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

export const getCommoditiesBySeriesId = createSelector(
    [ getCommodityList, getSeriesId ],
    (commodityList, seriesId) => {
        switch (seriesId){
            case undefined: return commodityList;
            default:
                const list = commodityList.filter(
                    item => item.id===seriesId
                );
                let finalList = [];
                if(list.length>5){
                    finalList[0] = list[0];
                    finalList[1] = list[1];
                    finalList[2] = list[2];
                    finalList[3] = list[3];
                    finalList[4] = list[4];
                }else {
                    finalList = list;
                }
                return finalList;
        }
    }
);