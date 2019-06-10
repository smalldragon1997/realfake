import * as ActionTypes from './actionTypes';
import { message } from 'antd';
const initState = {
    brandList: [],
    uniteList:[],
    seriesList: [],
    typeList: [],
    isLoading:true,
    userInfo:undefined,

    expressList:[], // 可选快递列表,
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.SaveInfo: {
            const data = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                localStorage.removeItem("RealFakeJwt");
                return {...state, isLoading: false}
            }else{
                // 如果需要保存登录状态
                localStorage.setItem("RealFakeJwt", data.info.jwt);
                // console.log("已保存登录状态" + localStorage.getItem("RealFakeManagerJwt"));
                return {...state, userInfo: data.info, isLoading: false}
            }

        }
        case ActionTypes.ExitSuccess: {
            // 删除登录状态
            localStorage.removeItem("RealFakeJwt");
            console.log("已删除登录状态");
            message.success("注销成功");
            return {brandList: [],
                uniteList:[],
                seriesList: [],
                typeList: [],
                isLoading:false,
                userInfo:undefined,

                carList:[],
                orderList:[],
                afterSaleList:[],}
        }

        case ActionTypes.FetchExpressListSuccess: {
            const data = action.result.data;
            if (action.result.status === "200") {
                return {...state, expressList: data.expressList, isLoading: false}
            } else {
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }
        }
        case ActionTypes.BrandListSuccess: {
            const data = action.result.data;
            if (action.result.status === "200") {
                return {...state, brandList: data.brandList, isLoading: false}
            } else {
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }
        }
        case ActionTypes.SeriesListSuccess: {
            const data = action.result.data;
            if (action.result.status === "200") {
                return {...state, seriesList: data.seriesList, isLoading: false}
            } else {
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }
        }
        case ActionTypes.UniteListSuccess: {
            const data = action.result.data;
            if (action.result.status === "200") {
                return {...state, uniteList: data.uniteList, isLoading: false}
            } else {
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }
        }
        case ActionTypes.TypeListSuccess: {
            const data = action.result.data;
            if (action.result.status === "200") {
                return {...state, typeList: data.typeList, isLoading: false}
            } else {
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }
        }
        case ActionTypes.HeaderFailure: {
            message.error(action.error);
            return {...state,isLoading:false}
        }
        default:
            return state;
    }
}