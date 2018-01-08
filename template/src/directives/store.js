import Vue from 'vue';

Vue.directive('store', {
  inserted(el, binding, vnode, oldVnode) {
    // console.log('el-', binding.arg, ':', el);
    // console.log('store:', binding.value);
    // console.log('vnode:', vnode);
    // console.log('componentInstance', vnode.componentInstance);
    // console.log('context', vnode.context);
    if (binding.arg) {
      binding.value[`set_${binding.arg}`](vnode.componentInstance);
    }
  },
  unbind() { }
});