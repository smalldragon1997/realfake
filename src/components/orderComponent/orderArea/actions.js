import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});


export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});


export const FetchingOrders = (userId) => ({
    type : ActionType.FetchingOrders,
    userId
});
export const FetchingOrdersSuccess = (result) => ({
    type : ActionType.FetchingOrdersSuccess,
    result
});
export const CancelOrder = (orderId) => ({
    type : ActionType.CancelOrder,
    orderId
});
export const CancelOrderSuccess = (orderId) => ({
    type : ActionType.CancelOrderSuccess,
    orderId
});



export const CancelAfterSale = (userId,orderId) => ({
    type : ActionType.CancelAfterSale,
    userId,orderId
});

export const CancelAfterSaleSuccess = (orderId) => ({
    type : ActionType.CancelAfterSaleSuccess,
    orderId
});
