import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let state = {
  funcCode: { // 功能码
    // 'path': [1,2,3]
  },
  menuMap: { // 存放url和portalMenu的映射关系
  },
  currentRouter: {}
};
window.portalMenu.forEach((item) => {
  state.menuMap[item.url] = item;
});

const getters = {
  /**
   * 获取路径与portalMenu的映射关系
   * @param {*} state 
   */
  menuMap(state) {
    return state.menuMap;
  },
  /**
   * 获取面包屑数组
   * @param {*} state 
   */
  breadcrumb(state) {
    return getBreadcrumb(state.menuMap[state.currentRouter.path]);
  },
  funcCode(state) {
    return state.funcCode[state.currentRouter.path];
  }
};

/**
 * 获取面包屑每个项目的数组
 * @param {portal菜单项} menuItem 
 */
let getBreadcrumb = (menuItem) => {
  let result = [menuItem],
    pCode = menuItem.pCode,
    len = window.portalMenu.length,
    i = 0;
  while(pCode && pCode !== '0') {
    let item = window.portalMenu[i];
    if (item.code === pCode) {
      result.unshift(item);
      pCode = item.pCode;
    }
    i = ++i === len? 0: i;
  }
  return result;
}

const SET_CURRENT_ROUTER = 'SET_CURRENT_ROUTER'; // 设置当前路由对象
const SET_FUNC_CODE = 'SET_FUNC_CODE'; // 设置功能码

const mutations = {
  [SET_CURRENT_ROUTER](state, router) {
    state.currentRouter = router;
  },
  [SET_FUNC_CODE](state, funcCode) {
    state.funcCode[state.currentRouter.path] = funcCode;
  }
};

const actions = {
  /**
   * 设置功能码
   */
  setFuncCode({ commit, getters }, router) {
    return new Promise((resolve, reject) => {
      if (!getters.funcCode) {
        Vue.$axios.get('/user/permission', {
          params: {
            code: router.meta.code
          }
        }).then(response => {
          let result = response.data;
          if (result.success) {
            commit(SET_FUNC_CODE, result.data);
            resolve();
          } else {
            reject({
              message: result.msg
            });
            Vue.$message.error(result.msg || '请求失败');
          }
        });
      } else {
        resolve();
      }
    });
  },
  setCurrentRouter({ dispatch, commit }, router) {
    commit(SET_CURRENT_ROUTER, router);
    return dispatch('setFuncCode', router);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
});