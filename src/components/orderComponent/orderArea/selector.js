import { createSelector } from 'reselect'


// 获取商品列表和系列id
const getOrderList = (state,props) => state;
const getOrderState = (state,props) => props;

export const getOrderByState = createSelector(
    [ getOrderList ,getOrderState],
    (orderList,state) => {
        if(state!==undefined){
            return orderList.filter(
                item => item.state===state
            )
        }else{
            return orderList;
        }

    }
);
