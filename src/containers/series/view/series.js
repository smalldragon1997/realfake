import React from 'react';
import {view as Carousel} from '../../../components/seriesComponent/seriesCarousel/'
import {view as CommodityArea} from '../../../components/seriesComponent/commodityArea/'
import {view as HotCommodityArea} from '../../../components/shareComponent/hotCommodityArea';
import {view as LowPriceCommodityArea} from '../../../components/shareComponent/lowPriceCommodityArea/'
import {view as UniteArea} from '../../../components/shareComponent/uniteArea/'
import { Row,Col } from 'antd';

export default (props) => (
    <Row type="flex" justify="space-around">
        <Col  xs={24} sm={24} md={24} lg={24} xl={19} xxl={14}>
            <Row>
                <Carousel seriesId={props.match.params.seriesId}/>
            </Row>
            <Row >
                <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                    <CommodityArea seriesId={props.match.params.seriesId}/>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}>
                    <Row>
                        <UniteArea vertical={1}/>
                    </Row>
                </Col>
            </Row>
        </Col>
    </Row>

)