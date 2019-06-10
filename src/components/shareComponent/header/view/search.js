import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Popover} from 'antd';
import SearchBox from './searchBox';
import {bgStyleWhite} from '../../../commonStyle';
import {Link} from 'react-router-dom';

const searchStyle = {
    height: 100
};
const imgStyle = {
    width:"100%"
};

const qrImgStyle = {
    width:"70%"
};
const qrBigImgStyle = {
    maxHeight: 200,
    maxWidth: 200
};
const qrPopover = (url) => (
    <div>
        <img src={url} style={qrBigImgStyle}/>
    </div>
);
const search = () => (
    <div>
        <Row style={bgStyleWhite} type="flex" justify="space-around">
            <Col xs={24} sm={24} md={24} lg={24} xl={19} xxl={14}>
                <Row type="flex" justify="space-between" align="middle" style={searchStyle}>
                    <Col span={4}>
                        <Link to={"/"}>
                            <img src={"https://image.realfake.cn/shoseImg/common/logo.png"} style={imgStyle}/>
                        </Link>
                    </Col>
                    <Col span={8}>
                        <SearchBox/>
                    </Col>
                    <Col span={4} style={{textAlign:"right"}}>
                        <Popover placement="bottom"
                                 content={qrPopover("https://image.realfake.cn/shoseImg/common/qr.png")}
                                 title="添加微信咨询客服">
                            <img src={"https://image.realfake.cn/shoseImg/common/qr_big.png"} style={qrImgStyle}/>
                        </Popover>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
);


export default search;