import {createRouter, createWebHistory} from 'vue-router'
import Index from '../pages/index.vue'
import Home from "../pages/main/Home.vue"
import Register from "../pages/main/Register.vue";
import Profile from "../pages/main/Profile.vue";
import Catalog from "../pages/main/Catalog.vue";
import Users from "../pages/main/Users.vue";
import TechnicalSupport from "../pages/main/TechnicalSupport.vue";
import ProductPage from "../pages/main/ProductPage.vue";
import UserDelivery from "../pages/main/UserTicket.vue";
import Deliveries from "../pages/main/AdminSessions.vue";
import AllSupports from "../pages/main/AllSupports.vue";
import CreateNews from "../pages/main/News.vue";
import Error from "../pages/main/Error.vue";
import Feedbacks from "../pages/main/Feedbacks.vue";
import Autorization from "../pages/main/Autorization.vue";
import ProductsList from "../pages/main/ProductsList.vue";
import Halls from "../pages/main/Halls.vue";
import MoviesCatalog from "../pages/main/MoviesCatalog.vue";
import SessionsCatalog from "../pages/main/SessionsCatalog.vue";
import SessionPage from "../pages/main/SessionPage.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },
        {
          path:'/register',
          name: 'register',
          component: Register,
        },
        {
          path:'autorization',
          name: 'autorization',
          component: Autorization,
        },
        {
          path: 'users',
          name: 'users',
          component: Users,
        },
        {
          path: 'halls',
          name: 'halls',
          component: Halls,
        },
        {
          path: 'movies',
          name: 'movies',
          component: MoviesCatalog,
        },
        {
          path: 'sessions-catalog',
          name: 'sessions-catalog',
          component: SessionsCatalog,
        },
        {
          path: 'sessions-catalog-page/:id',
          name: 'sessions-catalog-page',
          component: SessionPage,
        },
        {
          path: 'catalog/:id/:name',
          name: 'catalog',
          component: Catalog,
        },
        {
          path: 'technical-support',
          name: 'technical-support',
          component: TechnicalSupport
        },
        {
          path: 'admin-support',
          name: 'admin-support',
          component: AllSupports
        },
        {
          path: 'admin-products',
          name: 'admin-products',
          component: ProductsList
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile
        },
        {
          path: 'product/:id',
          name: 'product',
          component: ProductPage
        },
        {
          path: 'user-delivery',
          name: 'user-delivery',
          component: UserDelivery
        },
        {
          path: 'admin-deliveries',
          name: 'admin-deliveries',
          component: Deliveries
        },
        {
          path: 'admin-news',
          name: 'admin-news',
          component: CreateNews
        },
        {
          path: 'admin-feedbacks',
          name: 'admin-feedbacks',
          component: Feedbacks
        },
        {
          path: 'error',
          name: 'error',
          component: Error
        }
      ]
    },
   
  ]
})

export default router