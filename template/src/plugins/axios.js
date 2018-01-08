import axios from 'axios';

let installed = false;

axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log('interceptors response');
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default (Vue, $axios) => {
  if (installed) {
    return;
  }
  installed = true;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      value: $axios
    },
    $http: {
      value: $axios
    }
  });
  Object.defineProperties(Vue, {
    axios: {
      value: axios
    },
    $axios: {
      value: $axios
    }
  });
}