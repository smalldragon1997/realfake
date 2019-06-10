import * as ActionTypes from './actionTypes';
import { message } from 'antd';
import * as Status from './status';

const initState = {
    isLoading: true
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Start: {
            return {...state,isLoading:true}
        }
        case ActionTypes.Success: {
            return {...state,isLoading:false, ...action.result}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state}
        }
        default:
            return state;
    }
}

Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) { return false; }
    for (let i = 0, n = 0; i < this.length; i++) {
        if (this[i] !== this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
};