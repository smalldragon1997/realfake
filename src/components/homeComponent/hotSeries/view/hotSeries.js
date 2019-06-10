import React from 'react';
import {connect} from 'react-redux';
import { List } from 'antd';
import { Card } from 'antd';
import * as Actions from '../actions';
import {Link,withRouter} from 'react-router-dom'

const hotStyle = {
    margin:"2%"
};
const cardStyle = {
    height:"350px",
    backgroundColor:"white",
    padding:"4%"
};
const itemStyle = {
    height:"60",
    padding:1
};
class hotSeries extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){

        this.props.onFetchHot();
    }

    render() {

        const {brandList} = this.props;


        return (
            <div style={hotStyle}>
                <Card loading={this.props.isLoading}  bodyStyle={cardStyle} >
                    <List
                        itemLayout="horizontal"
                        dataSource={brandList.filter((item,index)=>index<5)}
                        renderItem={item => (
                            <List.Item style={itemStyle}>
                                <List.Item.Meta
                                    title={<Link to={"/brands/"+item.brandId}>{item.brandName}</Link>}
                                    description={
                                        item.seriesList
                                            .filter((item,index)=>index<3)
                                            .map(item=>(
                                            <Link to={"/series/"+item.seriesId} key={item.seriesName}> {item.seriesName} </Link>
                                        ))
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        );
    }
}

// props绑定state
const mapStateToProps = (state) => {
    state = state.home.hotSeries;
    return {
        brandList: state.brandList,
        isLoading: state.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchHot:()=>{
            dispatch(Actions.Start());
            dispatch(Actions.Fetching());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(hotSeries));