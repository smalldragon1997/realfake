import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});


export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});


export const Return = () => ({
    type : ActionType.ReturnOrder,
});
export const ReturnSuccess = () => ({
    type : ActionType.ReturnOrderSuccess
});


export const FetchDeliverInfo = (userId,orderId) => ({
    type : ActionType.FetchDeliverInfo,
    userId,orderId
});

export const FetchDeliverInfoSuccess = (result) => ({
    type : ActionType.FetchDeliverInfoSuccess,
    result
});


