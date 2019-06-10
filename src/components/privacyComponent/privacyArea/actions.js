import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});

export const Init = () => ({
    type : ActionType.Init
});

export const TradeInit = () => ({
    type : ActionType.TradeInit
});

export const PayStateInit = () => ({
    type : ActionType.PayStateInit
});


export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});


export const FetchInfo = (username,password,rememberMe) => ({
    type : ActionType.FetchInfo,username,password,rememberMe
});
export const FetchInfoSuccess = (result) => ({
    type : ActionType.FetchInfoSuccess,
    result
});



export const Register = (registerInfo) => ({
    type : ActionType.Register,registerInfo
});
export const RegisterSuccess = (result) => ({
    type : ActionType.RegisterSuccess,
    result
});


export const AlterUserInfo = (userInfo,jwt) => ({
    type : ActionType.AlterUserInfo,
    userInfo,jwt
});



export const AlterPwd = (pwdInfo,jwt) => ({
    type : ActionType.AlterPwd,pwdInfo,jwt
});


export const AlterUserInfoSuccess = (result) => ({
    type : ActionType.AlterUserInfoSuccess,
    result
});

export const AlterPwdSuccess = (result) => ({
    type : ActionType.AlterPwdSuccess,
    result
});


export const AddAddress = (userId,addressInfo,jwt) => ({
    type : ActionType.AddAddress,userId,
    jwt,
    addressInfo
});

export const AddAddressSuccess = (result) => ({
    type : ActionType.AddAddressSuccess,
    result
});

export const AddCar = (carInfo,jwt) => ({
    type : ActionType.AddCar,
    jwt,
    carInfo
});

export const AddCarSuccess = (result) => ({
    type : ActionType.AddCarSuccess,
    result
});

export const AddLike = (userId,commId,jwt) => ({
    type : ActionType.AddLike,
    jwt,
    userId,commId
});

export const AddLikeSuccess = (result) => ({
    type : ActionType.AddLikeSuccess,
    result
});
export const DelAddress = (userId,addressId,jwt) => ({
    type : ActionType.DelAddress,userId,
    jwt,
    addressId
});

export const DelAddressSuccess = (result) => ({
    type : ActionType.DelAddressSuccess,result
});

export const DelLike = (userId,commId,jwt) => ({
    type : ActionType.DelLike,userId,commId,
    jwt
});

export const DelLikeSuccess = (result) => ({
    type : ActionType.DelLikeSuccess,result
});

export const DelCar = (carInfo,jwt) => ({
    type : ActionType.DelCar,carInfo,
    jwt
});

export const DelCarSuccess = (result) => ({
    type : ActionType.DelCarSuccess,result
});


export const AlterCar = (carInfo,jwt) => ({
    type : ActionType.AlterCar,carInfo,
    jwt
});

export const AlterCarSuccess = (result) => ({
    type : ActionType.AlterCarSuccess,result
});

export const FetchAddress = (userId,jwt) => ({
    type : ActionType.FetchAddress,userId,
    jwt
});

export const FetchAddressSuccess = (result) => ({
    type : ActionType.FetchAddressSuccess,result
});

export const FetchLike = (userId,jwt) => ({
    type : ActionType.FetchLike,userId,
    jwt
});

export const FetchLikeSuccess = (result) => ({
    type : ActionType.FetchLikeSuccess,result
});

export const FetchDiscount = (userId,jwt) => ({
    type : ActionType.FetchDiscount,userId,
    jwt
});

export const FetchDiscountSuccess = (result) => ({
    type : ActionType.FetchDiscountSuccess,result
});

export const FetchCar = (userId,jwt) => ({
    type : ActionType.FetchCar,userId,
    jwt
});

export const FetchCarSuccess = (result) => ({
    type : ActionType.FetchCarSuccess,result
});


export const FetchProcessOrderList = (userId,jwt) => ({
    type : ActionType.FetchProcessOrderList,userId,
    jwt
});

export const FetchProcessOrderListSuccess = (result) => ({
    type : ActionType.FetchProcessOrderListSuccess,result
});

export const FetchDoneOrderList = (userId,jwt) => ({
    type : ActionType.FetchDoneOrderList,userId,
    jwt
});

export const FetchDoneOrderListSuccess = (result) => ({
    type : ActionType.FetchDoneOrderListSuccess,result
});


export const FetchAfterSaleList = (userId,jwt) => ({
    type : ActionType.FetchAfterSaleList,userId,
    jwt
});

export const FetchAfterSaleListSuccess = (result) => ({
    type : ActionType.FetchAfterSaleListSuccess,result
});


export const FetchOrderInfo = (userId,orderId,jwt) => ({
    type : ActionType.FetchOrderInfo,userId,orderId,
    jwt
});

export const FetchOrderInfoSuccess = (result) => ({
    type : ActionType.FetchOrderInfoSuccess,result
});

export const FetchAfterSaleInfo = (userId,aftId,jwt) => ({
    type : ActionType.FetchAfterSaleInfo,userId,aftId,
    jwt
});

export const FetchAfterSaleInfoSuccess = (result) => ({
    type : ActionType.FetchAfterSaleInfoSuccess,result
});

export const CommitOrder = (orderInfo,jwt) => ({
    type : ActionType.CommitOrder,orderInfo,
    jwt
});

export const CommitOrderSuccess = (result) => ({
    type : ActionType.CommitOrderSuccess,result
});


export const PayOrder = (payInfo,jwt) => ({
    type : ActionType.PayOrder,payInfo,
    jwt
});

export const PayOrderSuccess = (result) => ({
    type : ActionType.PayOrderSuccess,result
});

export const FetchPayResult = (userId,orderId,jwt) => ({
    type : ActionType.FetchPayResult,userId,orderId,
    jwt
});

export const FetchPayResultSuccess = (result) => ({
    type : ActionType.FetchPayResultSuccess,result
});

export const ApplyAfterSale = (afterSaleInfo,jwt) => ({
    type : ActionType.ApplyAfterSale,afterSaleInfo,
    jwt
});

export const ApplyAfterSaleSuccess = (result) => ({
    type : ActionType.ApplyAfterSaleSuccess,result
});

export const CancelAfterSale = (cancelInfo,jwt) => ({
    type : ActionType.CancelAfterSale,cancelInfo,
    jwt
});
export const CancelAfterSaleSuccess = (result) => ({
    type : ActionType.CancelAfterSaleSuccess,result
});

export const ConfirmOrder = (confirmInfo,jwt) => ({
    type : ActionType.ConfirmOrder,confirmInfo,
    jwt
});
export const ConfirmOrderSuccess = (result) => ({
    type : ActionType.ConfirmOrderSuccess,result
});

export const Evaluate = (evaluateInfo,jwt) => ({
    type : ActionType.Evaluate,evaluateInfo,
    jwt
});
export const EvaluateSuccess = (result) => ({
    type : ActionType.EvaluateSuccess,result
});

export const UpdateAfterSale = (info,jwt) => ({
    type : ActionType.UpdateAfterSale,info,
    jwt
});
export const UpdateAfterSaleSuccess = (result) => ({
    type : ActionType.UpdateAfterSaleSuccess,result
});

export const DeleteOrder = (userId,orderId,jwt) => ({
    type : ActionType.DeleteOrder,userId,orderId,
    jwt
});
export const DeleteOrderSuccess = (result) => ({
    type : ActionType.DeleteOrderSuccess,result
});

export const TestPayDone = (payId) => ({
    type : ActionType.TestPayDone,payId
});
export const TestPayDoneSuccess = (result) => ({
    type : ActionType.TestPayDoneSuccess,result
});