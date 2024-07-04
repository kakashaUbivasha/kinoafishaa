import axios from '../axios'
import {toast} from "vue3-toastify"

export default {
    state() {
        return {
            movie: {},
            all_movies: {},
        }
    },
    getters: {
        getMovie(state) {
            return state.movie;
        },
        getAllMovies(state) {
            return state.all_movies;
        },
    },
    mutations: {
        updateMovie(state, data) {
            state.movie = data;
        },
        updateAllMovies(state, data) {
            state.all_movies = data;
        },
    },
    actions: {
        loadAllMovies(context, params) {
            axios.get(`movie?&page=${params.page}&limit=${params.limit}`).then(res => {
                context.commit('updateAllMovies', res.data)
            })
        },
    }
}