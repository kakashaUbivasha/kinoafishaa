import axios from '../axios'
import {toast} from "vue3-toastify"

export default {
    state() {
        return {
            my_ticket: {},
            all_tickets: {},
        }
    },
    getters: {
        getMyTicket(state) {
            return state.my_ticket;
        },
        getAllTickets(state) {
            return state.all_tickets;
        }
    },
    mutations: {
        updateMyTicket(state, data) {
            state.my_ticket = data;
        },
        updateAllTickets(state, data) {
            state.all_tickets = data;
        },
    },
    actions: {
        loadAllTickets(context, params) {
            axios.get(`ticket?session=${params.id}`).then(res => {
                context.commit('updateAllTickets', res.data)
            })
        },
        loadMyTicket(context, params) {
            axios.get(`ticket/my?page=${params.page}&limit=${params.limit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                context.commit('updateMyTicket', res.data)
            })
        },
        changeTicket(context, params){
            axios.patch(`ticket/update/${params.id_seat}`, {status: params.status}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                toast.success("Бронь успешно изменена!", {
                    autoClose: 1000,
                });
                context.dispatch('loadAllTickets', params)
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            });
        },
        deleteTicket(context, params){
            axios.delete(`ticket/delete/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                toast.success("Бронь успешно отменена!", {
                    autoClose: 1000,
                });
                context.dispatch('loadMyTicket', params)
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            });
        },
        createTicket(context, params){
            axios.post("ticket/create", params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Бронь успешно добавлена!", {
                    autoClose: 1000,
                });
                context.dispatch('loadAllTickets', params)
            }).catch(res=>{
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            })
        }
    }
}