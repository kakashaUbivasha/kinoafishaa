import axios from '../axios'
import {toast} from "vue3-toastify"

export default {
    state() {
        return {
            category: {},
        }
    },
    getters: {
        getCategory(state) {
            return state.category;
        },
    },
    mutations: {
        updateCategory(state, data) {
            state.category = data;
        },
    },
    actions: {
        loadCategory(context) {
            axios.get('category', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                context.commit('updateCategory', res.data)
            })
        },
        changeCategory(context, params){
            axios.patch(`category/update/${params.id}`, params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                toast.success("Категория успешно изменена!", {
                    autoClose: 1000,
                });
                context.dispatch('loadCategory', params)
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            });
        },
        deleteCategory(context, params) {
            axios.delete(`category/delete/${params.delete_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                toast.success("Категория успешно удалена!", {
                    autoClose: 1000,
                });
                context.dispatch('loadCategory', params)
            }).catch(res => {
                toast.error("Произошла ошибка!", {
                    autoClose: 1000,
                });
            });
        },
        addNewCategory(context, params) {
            axios.post('category/create', params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                toast.success("Категория успешно добавлена!", {
                    autoClose: 1000,
                });
                context.dispatch('loadCategory', params)
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            });
        },
    }
}