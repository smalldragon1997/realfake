import {combineReducers} from 'redux';

import {reducer as orderReducer} from '../../components/orderComponent/orderArea/';
import {reducer as tradeReducer} from '../../components/orderComponent/tradeArea/';
import {reducer as payReducer} from '../../components/orderComponent/payArea/';
import {reducer as deliverReducer} from '../../components/orderComponent/deliverArea/';
import {reducer as takeReducer} from '../../components/orderComponent/takeArea/';
import {reducer as evaluateReducer} from '../../components/orderComponent/evaluateArea/';
import {reducer as afterSaleReducer} from '../../components/orderComponent/afterSaleArea/';
import {reducer as appleAfterSaleReducer} from '../../components/orderComponent/appleAfterSaleArea/';

export const reducer = combineReducers({
    orderArea:orderReducer,
    tradeArea:tradeReducer,
    payArea:payReducer,
    deliverArea:deliverReducer,
    takeArea:takeReducer,
    evaluateArea:evaluateReducer,
    applyAfterSaleArea:appleAfterSaleReducer,
    afterSaleArea:afterSaleReducer,
});