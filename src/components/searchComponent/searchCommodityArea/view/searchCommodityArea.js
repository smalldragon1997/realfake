import Commodity from './commodity';
import {Card, Row, Col, Avatar, Button, Tooltip,Icon,message,Spin} from 'antd';
import React from 'react';
import Filter from './filter';
export default ({keyWord})=>(
    // keyWord是Link的url后当作props。match传进的数据
    <div>
        <Row>
            <Filter/>
        </Row>
        <Row>
            <Commodity keyWord={keyWord}/>
        </Row>

    </div>
)