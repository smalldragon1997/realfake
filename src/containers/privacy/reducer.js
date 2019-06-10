import {combineReducers} from 'redux';

import {reducer as privacyReducer} from '../../components/privacyComponent/privacyArea/';

export const reducer = combineReducers({
    privacy:privacyReducer
});