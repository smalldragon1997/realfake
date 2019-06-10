import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});


export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});



export const FetchAfterSaleInfo = (userId,orderId) => ({
    type : ActionType.FetchAfterSaleInfo,
    userId,orderId
});

export const FetchAfterSaleInfoSuccess = (result) => ({
    type : ActionType.FetchAfterSaleInfoSuccess,
    result
});



export const UploadAfterSaleInfo = (userId,orderId,reason,photoList) => ({
    type : ActionType.UploadAfterSaleInfo,
    userId,orderId,reason,photoList
});

export const UploadAfterSaleInfoSuccess = (result) => ({
    type : ActionType.UploadAfterSaleInfoSuccess,
    result
});


