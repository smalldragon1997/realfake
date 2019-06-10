import React from 'react';
import {view as HotSeries} from '../../../components/homeComponent/hotSeries/'
import {view as User} from '../../../components/shareComponent/user/'
import {view as Carousel} from '../../../components/homeComponent/homeCarousel/'
import {view as BrandArea} from '../../../components/shareComponent/brandArea/'
import {view as HotCommodityArea} from '../../../components/shareComponent/hotCommodityArea/'
import {view as LowPriceCommodityArea} from '../../../components/shareComponent/lowPriceCommodityArea/'
import {view as SeriesCardArea} from '../../../components/shareComponent/seriesCardArea/'
import {view as TypeCardArea} from '../../../components/shareComponent/typeCardArea/'
import {view as NewCommodityArea} from '../../../components/homeComponent/newArea/'
import {Row, Col} from 'antd';

export default () => (
    <Row type="flex" justify="space-around">
        <Col xs={24} sm={24} md={24} lg={24} xl={19} xxl={14}>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={0} xl={8} xxl={8}>
                            <HotSeries/>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>
                            <Carousel/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <BrandArea/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <NewCommodityArea/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}>
                    <Row>
                        <User/>
                    </Row>
                    <Row>
                        <SeriesCardArea/>
                    </Row>
                </Col>
            </Row>
        </Col>
    </Row>

)