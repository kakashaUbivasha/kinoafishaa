import axios from '../axios'
import {toast} from "vue3-toastify"

export default {
    state() {
        return {
            items: {},
            search_result:[],
            movie_item: {},
        }
    },
    getters: {
        getItems(state) {
            return state.items;
        },
        getSearchValue(state){
            return state.search_result;
        },
        getMovieItem(state){
            return state.movie_item;
        },
    },
    mutations: {
        updateItems(state, data) {
            state.items = data;
        },
        updateSearchValue(state, data){
            state.search_result = data;
        },
        updateCatalogItem(state, data){
            state.movie_item = data;
        },
    },
    actions: {
        loadCatalogItems(context, params) {
            axios.get(`movie?category=${params.category_id}&page=${params.page}&limit=${params.limit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                context.commit('updateItems', res.data)
            })
        },
        searchOrderItem(context, params){
            axios.get(`movie?search=${params.search}&category=${params.category_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateSearchValue', res.data)
            })
        },
        searchCatalogItem(context, params){
            axios.get(`movie?search=${params.search}&category=${params.category_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateItems', res.data)
            })
        },
        loadCatalogItem(context, params){
            axios.get(`movie/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateCatalogItem', res.data)
            })
        },
        addCatalogItem(context, params){
            axios.post("movie/create", params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                toast.success("Фильм был успешно добавлен!", {
                    autoClose: 1000,
                });
                context.dispatch('loadCatalogItems', params)
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            })
        },
        deleteCatalogItem(context, params){
            axios.delete(`movie/delete/${params.delete_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=>{
                toast.success("Фильм успешно удален!", {
                    autoClose: 1000,
                });
                context.dispatch('loadCatalogItems', params)
            }).catch(res => {
                toast.error("Ошибка!", {
                    autoClose: 1000,
                });
            });
        },
        updateCatalogItem(context, params){
            axios.patch(`movie/update/${params.id}`, params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                context.dispatch('loadCatalogItems', params)
                toast.success("Фильм был изменён!", {
                    autoClose: 1000,
                });
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            })
        }
    }
}