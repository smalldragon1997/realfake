import React from 'react';
import {view as PrivacyArea} from '../../../components/privacyComponent/privacyArea';
import {Row, Col} from 'antd';

export default (props) => (
    <Row type="flex" justify="space-around">
        <Col xs={24} sm={24} md={24} lg={24} xl={19} xxl={14}>
            <Row>
                <PrivacyArea/>
            </Row>
        </Col>
    </Row>
)