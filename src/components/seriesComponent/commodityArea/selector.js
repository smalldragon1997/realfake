import { createSelector } from 'reselect'


// 获取商品列表和系列id
const getCommodityList = (state) => state;

export const getUniteList = createSelector(
    [ getCommodityList ],
    (commList) => {
        return commList.filter(
            item => !(item.uniteId===-1)
        )
    }
);
