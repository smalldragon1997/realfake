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
        this.props.onFetchBrandList();
    }

    render() {
        const brandAreaStyle = {
            margin: 5
        };
        const { isLoading, brandList,vertical} = this.props;

        const bodyStyle = {padding:"0",textAlign:"center"};

        return (
            <div style={brandAreaStyle}>
                <Card
                    title={vertical===undefined?"":"全部品牌"}
                    headStyle={{textAlign:"center"}}
                    bordered={false}
                    bodyStyle={bodyStyle}
                    loading={isLoading}
                >
                    {
                        brandList.map(function (item,index) {
                            return (
                                <Link to={"/brands/"+item.brandId} key={index}>
                                <Tooltip title={item.brandName} >
                                        <Card
                                        bordered={false}
                                        bodyStyle={{padding:0}}
                                        hoverable
                                        style={{width: vertical===undefined?"16.3%":"50%", textAlign: "center",display:"inline-block",margin:"0.1%"}}
                                        cover={<img src={item.cover} />}
                                    >
                                            {
                                                vertical===undefined?undefined:item.brandName
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
    const brand = state.home.brand;

    return {
        brandList: brand.brandList,
        isLoading: brand.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchBrandList: () => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(brandArea);
