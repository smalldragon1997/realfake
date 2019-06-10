import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Tooltip} from 'antd';
import * as Actions from '../actions';
import {view as BrandArea} from "../../brandArea/index";

const {Meta} = Card;

class footer extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {} = this.props;


        return (
            <div>
                    <Row style={{backgroundColor:"#fff"}} type="flex" justify="space-around">
                        <Col xs={24} sm={24} md={24} lg={24} xl={19} xxl={14}>
                        {/*<Row>*/}
                            {/*<Col span={8}>*/}
                                {/*专业审核 品质保证*/}
                            {/*</Col>*/}

                            {/*<Col span={8}>*/}
                                {/*用心挑选 剔除瑕疵*/}
                            {/*</Col>*/}

                            {/*<Col span={8}>*/}
                                {/*品种齐全 售后无忧*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                        <Row>
                            <BrandArea/>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

// props绑定state
const mapStateToProps = (state) => {
    const header = state.header;

    return {
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onBrandClick: (id) => {
            console.log("点击了" + id);
            // dispatch();
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(footer);
