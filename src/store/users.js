import axios from '../axios'
import {toast} from "vue3-toastify";

export default {
    state() {
        return {
            user_list:{},
            roles: {},
        }
    },
    getters: {
        getUserList(state){
            return state.user_list;
        },
        getRoles(state){
            return state.roles;
        },
    },
    mutations: {
        updateUserList(state, data){
            state.user_list = data;
        },
        updateRoles(state, data){
            state.roles = data;
        },
    },
    actions: {
        loadUserList(context, params){
            axios.get(`admin-user/user-list?page=${params.page}&role_id=${params.role_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateUserList', res.data)
            })
        },
        changeUser(context, params){
            axios.patch(`admin-user/user/update/${params.id}`, params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                toast.success("Пользователь успешно изменён!", {
                    autoClose: 1000,
                });
                context.dispatch('loadUserList', params)
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            });
        },
        addNewUser(context, params){
            axios.post("auth/register", params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                toast.success("Новый пользователь успешно добавлен!", {
                    autoClose: 1000,
                });
                context.dispatch('loadUserList', params)
            }).catch(res=>{
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            })
        },
        deleteUser(context, params){
            axios.delete(`admin-user/user/delete/${params.delete_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Пользователь успешно удалён!", {
                    autoClose: 1000,
                });
                context.dispatch('loadUserList', params)
            }).catch(res => {
                toast.error("Произошла ошибка!", {
                    autoClose: 1000,
                });
            });
        },
        search(context, params){
            axios.get(`admin-user/user-list?search=${params.search}&role_id=${params.role_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateUserList', res.data)
            })
        },
        loadRoles(context){
            axios.get('role', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateRoles', res.data)
            })
        },
    }
}