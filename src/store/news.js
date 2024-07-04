import axios from '../axios'
import {toast} from "vue3-toastify"

export default  {
    state(){
        return {
            news: {}
        }
    },
    getters: {
        getNews(state){
            return state.news;
        }
    },
    mutations: {
        updateNews(state, data){
            state.news = data;
        }
    },
    actions: {
        loadNews(context, params){
            axios.get(`news?page=${params.page}&limit=${params.limit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                context.commit('updateNews', res.data)
            })
        },
        createNews(context, params){
            axios.post("news/create", params.fd, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Новость успешно добавлена!", {
                    autoClose: 1000,
                });
                context.dispatch('loadNews', params)
            }).catch(res=>{
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            })
        },
        updateNews(context, params){
            axios.patch(`news/update/${params.id}`, params.data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Новость успешно изменена!", {
                    autoClose: 1000,
                });
                context.dispatch('loadNews', params)
            }).catch(res => {
                toast.error("Внимательно всё заполните!", {
                    autoClose: 1000,
                });
            });
        },
        deleteNews(context, params){
            axios.delete(`news/delete/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> {
                toast.success("Новость успешно удалена!", {
                    autoClose: 1000,
                });
                context.dispatch('loadNews', params)
            }).catch(res => {
                toast.error("Произошла ошибка!", {
                    autoClose: 1000,
                });
            });
        }
    }
}