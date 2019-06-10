import {combineReducers} from 'redux';

import {reducer as seriesCarouselReducer} from '../../components/seriesComponent/seriesCarousel/';
import {reducer as commodityReducer} from '../../components/seriesComponent/commodityArea/';

export const reducer = combineReducers({
    seriesCarousel:seriesCarouselReducer,
    commodityArea:commodityReducer,
});