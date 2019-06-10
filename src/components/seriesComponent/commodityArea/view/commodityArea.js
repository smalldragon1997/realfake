import UniteCard from './uniteCard';
import UsualCard from './usualCard';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;
import React from 'react';
export default (seriesId)=>(
    <Tabs defaultActiveKey="1" size={"large"} >
        <TabPane tab="全部配色" key="1">
            <UsualCard seriesId={seriesId}/>
        </TabPane>
        <TabPane tab="联名配色" key="2">
            <UniteCard seriesId={seriesId}/>
        </TabPane>
    </Tabs>
)