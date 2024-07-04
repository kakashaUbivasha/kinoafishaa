import axios from '../axios'
import {toast} from "vue3-toastify"

export default {
    state() {
        return {
            my_order: {},
            all_session: {},
            session_detail: {},
            check_order: {},
        }
    },
    getters: {
        getMyOrder(state) {
            return state.my_order;
        },
        getAllSessions(state) {
            return state.all_session;
        },
        getSessionDetail(state) {
            return state.session_detail;
        },
        getCheckOrder(state) {
            return state.check_order;
        },
    },
    mutations: {
        updateMyOrder(state, data) {
            state.my_order = data;
        },
        updateAllOrder(state, data) {
            state.all_session = data;
        },
        updateSessionDetail(state, data) {
            state.session_detail = data
        },
        updateCheckOrder(state, data) {
            state.check_order = data
        },
    },
    actions: {
        loadSessionDetail(context, params) {
            axios.get(`session/${params.id}`).then(res => {
                context.commit('updateSessionDetail', res.data)
            })
        },
        loadAllSessions(context, params) {
            axios.get(`session?&page=${params.page}&limit=${params.limit}`).then(res => {
                context.commit('updateAllOrder', res.data)
            })
        },
        deleteSession(context, params){
            axios.delete(`session/delete/${params.delete_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Сеанс успешно удалён!", {
                    autoClose: 1000,
                });
                context.dispatch('loadAllSessions', params)
            }).catch(res => {
                toast.error("Произошла ошибка!", {
                    autoClose: 1000,
                });
            });
        },
        changeSession(context, params){
            axios.patch(`session/update/${params.id}`, params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                toast.success("Сеанс успешно изменён!", {
                    autoClose: 1000,
                });
                context.dispatch('loadAllSessions', params)
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            });
        },
        createSession(context, params){
            axios.post("session/create", params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Сеанс успешно добавлен!", {
                    autoClose: 1000,
                });
                context.dispatch('loadAllSessions', params)
            }).catch(res=>{
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            })
        }
    }
}