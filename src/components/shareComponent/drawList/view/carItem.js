import React from 'react';
import {Row,Spin,Select,List,Checkbox,Avatar,message} from 'antd'
import {Link} from 'react-router-dom'
const Option = Select.Option;

export default class drawList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            car: undefined,
            qualId:undefined,
            sizeId:undefined
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.car !== this.props.car) {
            this.setState({
                car: nextProps.car,
                qualId:nextProps.car.quality.qualId,
                sizeId:nextProps.car.size.sizeId
            })
        }
    }

    render() {
        const {onDelCar, onUpdateCar, goTradeAlone, onCloseClick, onCheckChange,carList,key} = this.props;
        const {car,qualId,sizeId} = this.state;
        return (
            car === undefined ? (
                null
            ) : (
                <List.Item
                    actions={[
                    <a onClick={() => {
                        onDelCar({
                            userId:car.userId,
                            commId:car.commodity.commId,
                            sizeId:sizeId,
                            qualId:qualId
                        })
                    }}>删除</a>,
                    <a onClick={() => {
                        onCloseClick();
                        goTradeAlone({
                            commodity:car.commodity,
                            qualId:qualId,
                            sizeId:sizeId
                        });
                    }}>单独购买</a>]}
                           key={key}>
                    <List.Item.Meta avatar={
                        <div>
                <span style={{marginRight: 10}}>
                    <Checkbox onChange={(e) => {
                        const price = car.commodity.commQualList.filter(i=>(i.quality.qualId===qualId))[0].price;
                        onCheckChange(e.target.checked? price: -price,car.commodity,qualId,sizeId);
                    }}/>
                </span>
                            <Link to={"/commodities/" + car.commodity.commId} onClick={onCloseClick}>
                                <Avatar src={car.commodity.cover} size={60} shape={"square"}/>
                            </Link>
                        </div>
                    }
                                    title={<Link to={"/commodities/" + car.commodity.commId}
                                                 onClick={onCloseClick}>{car.commodity.title}</Link>}
                                    description={<div>
                                        <div>
                                            码数：
                                            <Select defaultValue={sizeId} value={sizeId} onChange={(sizeId)=>{
                                                let flag = true;
                                                for(let i=0;i<carList.length;i++){
                                                    if(carList[i].userId===car.userId&&carList[i].commodity.commId===car.commodity.commId
                                                        &&sizeId===carList[i].size.sizeId&&qualId===carList[i].quality.qualId){
                                                        flag=false;
                                                        break;
                                                    }
                                                }
                                                if(flag){
                                                    onUpdateCar({
                                                        userId:car.userId,
                                                        commId:car.commodity.commId,
                                                        sizeId:sizeId,
                                                        qualId:qualId
                                                    },{
                                                        userId:car.userId,
                                                        commId:car.commodity.commId,
                                                        sizeId:car.size.sizeId,
                                                        qualId:car.quality.qualId
                                                    });
                                                    this.setState({
                                                        sizeId:sizeId
                                                    })
                                                }else{
                                                    message.error("商品属性已经存在购物车里了~")
                                                }
                                            }}>
                                                {
                                                    car.commodity.sizeList.map((i,index)=>(
                                                        <Option value={i.sizeId}>{i.value}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </div>
                                    </div>}
                    />
                    <div style={{marginRight: "5%"}}>
                        品质：
                        <Select defaultValue={qualId} value={qualId} onChange={(qualId)=>{
                            let flag = true;
                            for(let i=0;i<carList.length;i++){
                                if(carList[i].userId===car.userId&&carList[i].commodity.commId===car.commodity.commId
                                    &&sizeId===carList[i].size.sizeId&&qualId===carList[i].quality.qualId){
                                    flag=false;
                                    break;
                                }
                            }
                            if(flag){
                                onUpdateCar({
                                    userId:car.userId,
                                    commId:car.commodity.commId,
                                    sizeId:sizeId,
                                    qualId:qualId
                                },{
                                    userId:car.userId,
                                    commId:car.commodity.commId,
                                    sizeId:car.size.sizeId,
                                    qualId:car.quality.qualId
                                });
                                this.setState({
                                    qualId:qualId
                                })
                            }else{
                                message.error("商品属性已经存在购物车里了~")
                            }
                        }}>
                            {
                                car.commodity.commQualList.map((i,index)=>(
                                    <Option value={i.quality.qualId}>{i.quality.qualName}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div>价格：{car.commodity.commQualList.filter(i=>(i.quality.qualId===qualId))[0].price}</div>
                </List.Item>
            )

        )
    }
}
