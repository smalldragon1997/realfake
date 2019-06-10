import {combineReducers} from 'redux';

import {reducer as uniteCarouselReducer} from '../../components/uniteComponent/uniteCarousel/';
import {reducer as commodityReducer} from '../../components/uniteComponent/commodityArea/';

export const reducer = combineReducers({
    uniteCarousel:uniteCarouselReducer,
    commodityArea:commodityReducer,
});