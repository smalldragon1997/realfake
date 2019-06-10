import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button,Tooltip} from 'antd';
import * as Actions from '../actions';

class typeCardArea extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const seriesCardAreaStyle = {
            margin:2
        };
        const {list,isLoading,onSeriesClick} = this.props;

        const bodyStyle={};
        const headStyle={textAlign:"center"};

        return (
            <div style={seriesCardAreaStyle}>
                <Card
                    title={"类型分类"}
                    bordered={true}
                    bodyStyle={bodyStyle}
                    headStyle={headStyle}
                    loading={isLoading}
                >
                    {
                        list.map(function (item) {
                            return (
                                <Tooltip title={item.describe} key={item.name}>
                                    <Card.Grid style={{
                                        padding: 5,
                                        width: 110,
                                        textAlign: 'center',
                                    }}>
                                        <a><img
                                            src={item.img}
                                            style={{
                                                maxHeight: 70,
                                                maxWidth: 110
                                            }}
                                            onClick={()=>{onSeriesClick(item.id)}}
                                        />
                                        <span>{item.name}</span>
                                        </a>
                                    </Card.Grid>
                                </Tooltip>
                            )
                        })
                    }
                </Card>
            </div>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const header = state.header;

    return {
        list:header.typeList,
        isLoading:header.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onSeriesClick: (id) => {
            console.log("点击了" +id);
            // dispatch();
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(typeCardArea);