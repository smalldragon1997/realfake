import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});

export const Success = (result) => ({
    type : ActionType.Success,
    result
});

export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});

// 获取购物车数据，userId：用户id
export const Fetching = (userId) => ({
    type : ActionType.Fetching,
    userId
});

export const Close = () =>({
   type : ActionType.Close
});

export const CheckChange = (price,comm) =>({
    type: ActionType.CheckChange,
    price,
    comm
});

export const AddCar = (comm) => ({
    type : ActionType.AddCar,
    comm
});
export const DelCar = (comm) => ({
    type : ActionType.DelCar,
    comm
});
export const AddCarSuccess = (comm) => ({
    type : ActionType.AddCarSuccess,
    comm
});
export const DelCarSuccess = (comm) => ({
    type : ActionType.DelCarSuccess,
    comm
});