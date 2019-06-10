import axios from 'axios';
export const login = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.post('/api/v1/security/users/login', data)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const register = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.post('/api/v1/security/users/register', data)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const logout = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.delete('/api/v1/security/users/login/' + data.userId, {
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const getExpressList = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.get('/api/v1/categories/expresses')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const updatePwd = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.put('/api/v1/security/users/login/' + data.userId,data, {
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const updateUserInfo = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.put('/api/v1/users/' + data.userId,data, {
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const loginWithJwt = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.post('/api/v1/security/users/token', data, {
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            params: data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};



export const getProcessOrderList = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.get('/api/v1/orders/process', {
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const getDoneOrderList = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.get('/api/v1/orders/done', {
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const notify = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.post('/api/v1/orders/test', data,{
            params:data,
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const getOrderInfo = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.get('/api/v1/orders/'+data.orderId, {
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteOrder = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.delete('/api/v1/orders/'+data.orderId, {
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateOrderInfo = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.put('/api/v1/orders/'+data.orderId, data,{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const addAfterSale = (data) => {
    console.log(data)
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/afterSale', data,{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt,
                "Content-type": "application/json"}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const getAfterSaleList = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.get('/api/v1/afterSales',{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const getAfterSaleInfo = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.get('/api/v1/afterSales/'+data.aftId,{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteAfterSale = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.delete('/api/v1/afterSales/'+data.aftId,{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateAfterSaleInfo = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.put('/api/v1/afterSales/'+data.aftId,data,{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const payOrder = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.put('/api/v1/orders/pays/'+data.userId,data,{
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const commitOrder = (data) => {
    console.log(data)
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.post('/api/v1/order',data,{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const evaluate = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.post('/api/v1/comment',data,{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};



export const getCommentList = (data) => {
    return new Promise(function (resolve, reject) {
        // userId
        // axios.get('/mock/manager/superInfo', {
        axios.get('/api/v1/comments',{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchDiscountList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/users/'+data.userId+'/discounts',{
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchCarList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/users/'+data.userId+'/car',{
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchLikeList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/users/'+data.userId+'/like',{
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchAddressList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/users/'+data.userId+'/addresses',{
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addAddress = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/users/'+data.userId+'/address',data,{
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addLike = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/users/'+data.userId+'/like',data,{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addCar = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/users/'+data.userId+'/car',data,{
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateCar = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/users/'+data.userId+'/car/'+data.commId,data,{
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteCar = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/users/'+data.userId+'/car/'+data.commId,{
            params:data,
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteLike = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/users/'+data.userId+'/like/'+data.commId,{
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteAddress = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/users/'+data.userId+'/addresses/'+data.addressId,{
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchSeriesList = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/series')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchSeriesListByBrandId = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/series?brandId='+data.brandId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchUniteList = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/unites')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchTypeList = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/types')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchBrandList = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/brands')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchHotSeries = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/brands')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchOrder = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/drawList')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchHomeCarousel = () => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/homeCarousel')
        axios.get('/api/v1/categories/home')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchUniteInfo = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/homeCarousel')
        axios.get('/api/v1/categories/unites/'+data.uniteId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchSeriesInfo = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/homeCarousel')
        axios.get('/api/v1/categories/series/'+data.seriesId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchBrandInfo = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/homeCarousel')
        axios.get('/api/v1/categories/brands/'+data.brandId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchLotCommodities = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/commodities',{
            params:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchHotCommodity = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/hotCommodity')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchLowPriceCommodity = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/lowPriceCommodity')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchNewCommodity = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/commodities', {
            params: data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchSearchCommodity = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/commodities',{
            params:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchRecommendCommodity = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/recommendSearch')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchCommodity = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/commodities/'+data.commId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchComments = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/comments')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchOrders = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/orders')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchExpress = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/express')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchPayInfo = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/order/pay')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchDeliverInfo = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/order/deliver')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchTakeInfo = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/order/take')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchEvaluateInfo = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/order/evaluate')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchAfterSaleInfo = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/order/afterSale')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchAfterSaleDoneInfo = () => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/order/afterSaleDone')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};