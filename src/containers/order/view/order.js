import React from 'react';
import {view as Order} from '../../../components/orderComponent/order';
import {view as User} from '../../../components/shareComponent/user';
import {view as HotCommodityArea} from '../../../components/shareComponent/hotCommodityArea';
import {view as LowPriceCommodityArea} from '../../../components/shareComponent/lowPriceCommodityArea/'
import {Row, Col} from 'antd';

export default (props) => (
    <Row type="flex" justify="space-around">
        <Col xs={24} sm={24} md={24} lg={24} xl={19} xxl={14}>
            <Row>
                {/*<Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>*/}
                    {/*<Row>*/}
                        <Order/>
                    {/*</Row>*/}
                {/*</Col>*/}
                {/*<Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}>*/}
                    {/*<Row>*/}
                        {/*<User/>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                        {/*<HotCommodityArea/>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                        {/*<LowPriceCommodityArea/>*/}
                    {/*</Row>*/}
                {/*</Col>*/}
            </Row>
        </Col>
    </Row>
)