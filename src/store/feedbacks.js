import axios from '../axios'
import {toast} from "vue3-toastify"

export default {
    state() {
        return {
            all_feedbacks: {},
        }
    },
    getters: {
        getFeedbacks(state){
            return state.all_feedbacks;
        }
    },
    mutations: {
        updateFeedbacks(state, data){
            state.all_feedbacks = data;
        }
    },
    actions: {
        createFeedback(context, params){
            axios.post("feedback/create", params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Комментарий успешно создан!", {
                    autoClose: 1000,
                });
                context.dispatch('loadCatalogItem', params)
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            });
        },
        loadFeedbacks(context, params){
            axios.get(`admin-user/feedback?status=${params.status}&page=${params.page}&limit=${params.limit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateFeedbacks', res.data )
            })
        },
        searchFeedbacks(context, params){
            axios.get(`admin-user/feedback?status=${params.status}&search=${params.search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateFeedbacks', res.data)
            })
        },
        changeFeedback(context, params){
            axios.patch(`admin-user/feedback/update/${params.id}`, {publish:params.published}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Комментарий успешно изменён!", {
                    autoClose: 1000,
                });
                context.dispatch('loadFeedbacks', params)
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            });
        }
    }
}