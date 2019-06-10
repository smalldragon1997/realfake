import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Tooltip} from 'antd';
import * as Actions from '../actions';
import {Link,withRouter} from 'react-router-dom';

const {Meta} = Card;

class seriesCardArea extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const seriesCardAreaStyle = {
            margin: "2%"
        };
        const {
            seriesList,
            isLoading,
            onSeriesClick
        } = this.props;

        const bodyStyle = {};
        const headStyle = {textAlign: "center"};

        return (
            <div style={seriesCardAreaStyle}>
                <Card
                    title={"全部系列"}
                    bordered={false}
                    bodyStyle={bodyStyle}
                    headStyle={headStyle}
                    loading={isLoading}
                >
                    {
                        seriesList.map(function (item) {
                            return (
                                <Link to={"/series/" + item.seriesId}>
                                    <Tooltip title={item.seriesName} key={item.seriesName}>
                                        <Card
                                            bordered={false}
                                            bodyStyle={{padding: 0}}
                                            hoverable
                                            style={{
                                                width: "50%",
                                                textAlign: "center",
                                                display: "inline-block",
                                            }}
                                            cover={<img src={item.cover}/>}
                                        >
                                        </Card>
                                    </Tooltip>
                                </Link>
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
        seriesList: header.seriesList,
        isLoading: header.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onSeriesClick: (id) => {
            console.log("点击了" + id);
            // dispatch();
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(seriesCardArea));