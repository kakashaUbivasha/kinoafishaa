import axios from '../axios'
import {toast} from "vue3-toastify"

export default {
    state() {
        return {
            all_supports: {},
        }
    },
    getters: {
        getAllSupports(state){
            return state.all_supports;
        },
    },
    mutations: {
        updateAllSupports(state, data){
            state.all_supports = data
        },
    },
    actions: {
        loadAllSupports(context, params){
            axios.get(`admin-user/support?status=${params.status}&page=${params.page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateAllSupports', res.data)
            })
        },
        searchAllSupports(context, params){
            axios.get(`admin-user/support?status=${params.status}&search=${params.search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateAllSupports', res.data)
            })
        },
        updateSupport(context, params){
            axios.patch(`admin-user/support/update/${params.id}`, {solved:params.checked}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Обновлено!", {
                    autoClose: 1000,
                });
                context.dispatch('loadAllSupports', params)
            }).catch(res=>{
                toast.error("Ошибка!", {
                    autoClose: 1000,
                });
            })
        },
        createSupport(context, params){
            axios.post("support/create", params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Ваша проблема была успешно отправлена!", {
                    autoClose: 1000,
                });
            }).catch(res=>{
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            })
        }

    }
}