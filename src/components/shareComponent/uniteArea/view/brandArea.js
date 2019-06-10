import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Avatar, Button, Tooltip} from 'antd';
import * as Actions from '../actions';
import * as BrandsCarouselAction from '../../../brandComponent/brandPageCarousel/actions';
import {Link} from 'react-router-dom'
const {Meta} = Card;

class brandArea extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
    }

    render() {
        const brandAreaStyle = {
            margin: 5
        };
        const { isLoading, uniteList,vertical} = this.props;

        const bodyStyle = {padding:"0",textAlign:"center"};

        return (
            <div style={brandAreaStyle}>
                <Card
                    title={vertical===undefined?"":"全部联名"}
                    headStyle={{textAlign:"center"}}
                    bordered={false}
                    bodyStyle={bodyStyle}
                    loading={isLoading}
                >
                    {
                        uniteList.map(function (item,index) {
                            return (
                                <Link to={"/unites/"+item.uniteId} key={index}>
                                <Tooltip title={item.uniteName} >
                                        <Card
                                        bordered={false}
                                        bodyStyle={{padding:0}}
                                        hoverable
                                        style={{width: vertical===undefined?"16.3%":"60%", textAlign: "center",display:"inline-block",margin:"0.1%"}}
                                        cover={<img src={item.cover} />}
                                    >
                                            {
                                                vertical===undefined?undefined:item.uniteName
                                            }
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
        uniteList: header.uniteList,
        isLoading: header.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(brandArea);
