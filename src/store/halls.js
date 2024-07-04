import axios from '../axios'
import {toast} from "vue3-toastify"

export default {
    state() {
        return {
            my_order: {},
            all_halls: {},
            check_order: {},
        }
    },
    getters: {
        getMyOrder(state) {
            return state.my_order;
        },
        getAllHalls(state) {
            return state.all_halls;
        },
        getCheckOrder(state) {
            return state.check_order;
        },
    },
    mutations: {
        updateMyOrder(state, data) {
            state.my_order = data;
        },
        updateAllHalls(state, data) {
            state.all_halls = data;
        },
        updateOrderDetail(state, data) {
            state.order_detail = data
        },
        updateCheckOrder(state, data) {
            state.check_order = data
        },
    },
    actions: {
        changeShopAddress(context, params){
            axios.patch("admin-user/store-info/update", params, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Информация обновлена!", {
                    autoClose: 1000,
                });
            }).catch(res=> {
                toast.error("Возникла ошибка!", {
                    autoClose: 1000,
                });
            })
        },
        loadMyOrder(context, params) {
            axios.get(`order/my?status=${params.status}&page=${params.page}&limit=${params.limit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                context.commit('updateMyOrder', res.data)
            })
        },
        loadAllHalls(context, params) {
            axios.get(`hall?&page=${params.page}&limit=${params.limit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                context.commit('updateAllHalls', res.data)
            })
        },
        loadOrderDetail(context, params) {
            axios.get(`order/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                context.commit('updateOrderDetail', res.data)
            })
        },
        loadCheckOrder(context, params) {
            axios.get(`feedback/can-create/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                context.commit('updateCheckOrder', true)
            }).catch(res => {
                context.commit('updateCheckOrder', false)
            })
        },
        updateOnWayOrder(context, params){
            axios.patch(`admin-user/order/update/${params.id}`, {on_way_at: params.date},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.dispatch('loadAllOrder', params);
                context.dispatch('loadOrderDetail', params)
                toast.success("Заказ в пути!", {
                    autoClose: 1000,
                });
            }).catch(res=>{
                toast.error("Возникла ошибка!", {
                    autoClose: 1000,
                });
            })
        },
        updateCancelOrder(context, params){
            axios.patch(`admin-user/order/update/${params.id}`, {cancelled_at: params.date},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.dispatch('loadAllOrder', params);
                toast.success("Заказ отменён!", {
                    autoClose: 1000,
                });
            }).catch(res=>{
                toast.error("Возникла ошибка!", {
                    autoClose: 1000,
                });
            })
        },
        updateUserCancelOrder(context, params){
            axios.patch(`order/cancel/${params.id}`, {},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.dispatch('loadMyOrder', params)
                toast.success("Ваш заказ отменён!", {
                    autoClose: 1000,
                });
            }).catch(res=>{
                toast.error("Возникла ошибка!", {
                    autoClose: 1000,
                });
            })
        },
        updateDeliveredOrder(context, params){
            axios.patch(`admin-user/order/update/${params.id}`, {delivered_at: params.date},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.dispatch('loadAllOrder', params)
                context.dispatch('loadOrderDetail', params)
                toast.success("Заказ доставлен!", {
                    autoClose: 1000,
                });
            }).catch(res=>{
                toast.error("Возникла ошибка!", {
                    autoClose: 1000,
                });
            })
        },
        searchDelivery(context, params){
            axios.get(`order?status=${params.status}&search=${params.search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateAllOrder', res.data)
            })
        }
    }
}