import React from 'react';
import {connect} from 'react-redux';
import {Input, Button, Row, Col, message} from 'antd';
import * as Actions from '../actions';
import * as SearchActions from '../../../searchComponent/searchCommodityArea/actions';
import {Link} from 'react-router-dom';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        // 获取header数据
        this.props.onFetchHeader();
        this.state = {
            keyWord: "undefined"
        };
    }

    // 渲染搜索框
    render() {
        const SearchInput = Input.Search;
        const {onSearchBtn} = this.props;
        return (
            <Row>
                <Col span={18}>
                    <Input
                        placeholder="请输入搜索内容"
                        size="default"
                        onChange={(e) => {
                            this.setState({keyWord: e.target.value===""||e.target.value===undefined?"undefined":e.target.value})
                        }}
                    />
                </Col>
                <Col span={6}>
                    <Link to={"/search/" + this.state.keyWord}>
                        <Button size={"default"} type={"primary"} onClick={() => {
                            onSearchBtn(this.state.keyWord)
                        }}>
                            搜索
                        </Button>
                    </Link>
                </Col>
            </Row>
        )
    }
}

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchBtn: (keyword) => {
            if (keyword === "undefined"||keyword==="")
                message.success("显示全部商品", 1);

        },
        onFetchHeader: () => {
            dispatch(Actions.Fetching());
        }
    }
};


export default connect(null, mapDispatchToProps)(SearchBox);