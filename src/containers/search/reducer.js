import {combineReducers} from 'redux';

import {reducer as searchCommodityReducer} from '../../components/searchComponent/searchCommodityArea/';
import {reducer as recommendSearchReducer} from '../../components/shareComponent/recommendSearchArea/';

export const reducer = combineReducers({
    searchCommodity:searchCommodityReducer,
    recommendSearch:recommendSearchReducer,
});