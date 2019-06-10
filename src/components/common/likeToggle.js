import React from 'react';
import {Icon} from 'antd';

export default class likeToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: this.props.isLike};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }))
    }

    render() {

        const {onLikeNewCommodity, onDislikeNewCommodity,id,count,list,isLike} = this.props;
        return (
            <span onClick={this.handleClick}>
                {
                    isLike?(
                        this.state.isToggleOn ? (
                            <span onClick={() => {
                                onDislikeNewCommodity(id,list)
                            }} style={{cursor: "pointer"}}>
                            <Icon type="heart" theme="filled" style={{fontSize: 15, color: "#0082ff"}}/>
                                {" "+(count)}
                        </span>
                        ) : (
                            <span onClick={() => {
                                onLikeNewCommodity(id,list)
                            }} style={{cursor: "pointer"}}>
                        <Icon type="heart" theme="filled" style={{fontSize: 15}}/>
                                {" "+(count-1)}
                        </span>
                        )
                    ):(
                        this.state.isToggleOn ? (
                            <span onClick={() => {
                                onDislikeNewCommodity(id,list)
                            }} style={{cursor: "pointer"}}>
                            <Icon type="heart" theme="filled" style={{fontSize: 15, color: "#0082ff"}}/>
                                {" "+(count+1)}
                        </span>
                        ) : (
                            <span onClick={() => {
                                onLikeNewCommodity(id,list)
                            }} style={{cursor: "pointer"}}>
                        <Icon type="heart" theme="filled" style={{fontSize: 15}}/>
                                {" "+(count)}
                        </span>
                        )
                    )

                }
            </span>
        )
    }
}