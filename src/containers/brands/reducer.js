import {combineReducers} from 'redux';

import {reducer as brandCarouselReducer} from '../../components/brandComponent/brandPageCarousel/';
import {reducer as seriesAllReducer} from '../../components/brandComponent/seriesAllArea/';

export const reducer = combineReducers({
    brandCarousel:brandCarouselReducer,
    seriesAll:seriesAllReducer
});