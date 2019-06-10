import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});


export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});


export const Submit = (userId,commList,disId,expressId,message) => ({
    type : ActionType.Submit,
    userId,
    commList,
    disId,expressId,message
});
export const SubmitSuccess = (orderId) => ({
    type : ActionType.SubmitSuccess,
    orderId
});


export const FetchExpress = () => ({
    type : ActionType.FetchExpress
});

export const FetchExpressSuccess = (result) => ({
    type : ActionType.FetchExpressSuccess,
    result
});


export const ClearOrderId = () => ({
    type : ActionType.ClearOrderId
});
