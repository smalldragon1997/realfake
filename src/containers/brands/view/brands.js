import React from 'react';
import {view as Carousel} from '../../../components/brandComponent/brandPageCarousel/'
import {view as BrandSeries} from '../../../components/brandComponent/brandSeries';
import {view as HotCommodityArea} from '../../../components/shareComponent/hotCommodityArea';
import {view as LowPriceCommodityArea} from '../../../components/shareComponent/lowPriceCommodityArea/'
import {view as SeriesCardArea} from '../../../components/shareComponent/seriesCardArea/'
import {Row, Col} from 'antd';

export default (props) => (
    <Row type="flex" justify="space-around">
        <Col xs={24} sm={24} md={24} lg={24} xl={19} xxl={14}>
            <Row>
                <Carousel brandId={props.match.params.brandId}/>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <BrandSeries brandId={props.match.params.brandId}/>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}>
                    <Row>
                        <SeriesCardArea/>
                    </Row>
                </Col>
            </Row>
        </Col>
    </Row>

)