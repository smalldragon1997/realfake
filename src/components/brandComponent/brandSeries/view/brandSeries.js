import {view as SeriesAll} from '../../seriesAllArea';
import {view as SeriesUnite} from '../../seriesUniteArea';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;
import React from 'react';
export default (brandId)=>(
    <Tabs defaultActiveKey="1" size={"large"}>
        <TabPane tab="全部系列" key="1">
            <SeriesAll brandId={brandId}/>
        </TabPane>
        <TabPane tab="联名专区" key="2">
            <SeriesUnite brandId={brandId}/>
        </TabPane>
    </Tabs>
)