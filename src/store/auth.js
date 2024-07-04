import axios from '../axios'
import {toast} from "vue3-toastify";
import router from "../router/index.js";

export default {
    state() {
        return {
            current_user: {},
        }
    },
    getters: {
        getCurrentUser(state) {
            return state.current_user;
        },
    },
    mutations: {
        updateCurrentUser(state, data) {
            state.current_user = data;
        },
    },
    actions: {
        login(context, params) {
            axios.post('auth/login', params).then(res => {
                localStorage.setItem('token', res.data.access);
                router.push({name: 'home'})
                context.dispatch('loadCurrentUser');
                toast.success("Вы успешно зашли!", {
                    autoClose: 1000,
                });
            }).catch(res => {
                toast.error("Произошла ошибка!", {
                    autoClose: 1000,
                });
            });
        },
        register(context, params) {
            axios.post('auth/register', params).then(res => {
                localStorage.setItem('token', res.data.access);
                router.push({name: 'home'})
                context.dispatch('login', params);
                toast.success("Вы успешно зарегистрировались!", {
                    autoClose: 1000,
                });
            }).catch(res => {
                toast.error("Произошла ошибка!", {
                    autoClose: 1000,
                });
            });
        },
        loadCurrentUser(context) {
            axios.get('auth/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                context.commit('updateCurrentUser', res.data)
            })
        },
        checkCurrentUser(){
            axios.get('auth/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log("success")
            }).catch(res=> {
                router.push('autorization')
            })
        }
    }

}