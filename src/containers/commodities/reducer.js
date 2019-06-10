import {combineReducers} from 'redux';

import {reducer as infoReducer} from '../../components/commodityComponent/infoArea/';

export const reducer = combineReducers({
    infoArea:infoReducer,
});