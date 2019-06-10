import { createSelector } from 'reselect'


// 获取系列列表
const getSeriesList = (state,props) => state;
const getSelectedBrand = (state,props) => props;

export const getSeriesByFilterBrand = createSelector(
    [ getSeriesList, getSelectedBrand ],
    (seriesList, selectedBrand) => {
        switch (selectedBrand){
            case undefined: return seriesList;
            default:
                return seriesList.filter(
                    item => item.brandId===selectedBrand
                )
        }
    }
);

