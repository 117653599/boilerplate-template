
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import App from './App';
import { axiosPlugin } from './plugins';
import store from './store';
import { getRoutes } from './router';
import directives from './directives';
import 'lodash';

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(axiosPlugin, axios.create({
  baseURL: BASE_URL,
  // transformResponse: [(data)=> {
  //   console.log('transformResponse');
  //   return data;
  // }]
}));
let routes = [{
  path: '*',
  redirect: '/opportunity/list'
}];
routes = routes.concat(getRoutes(store.getters.menuMap));
const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  store.dispatch('setCurrentRouter', to).then(() => next());
});

new Vue({
  el: '#app',
  ...App,
  store,
  router,
})