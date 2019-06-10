import { createSelector } from 'reselect'


// 获取商品列表和系列id
const getCommodityList = (state,props) => state;
const getBrandId = (state,props) => props;

export const getUniteList = createSelector(
    [ getCommodityList ,getBrandId],
    (commList,brandId) => {
        return commList.filter(
            item => item.brandId===brandId
        )
    }
);
