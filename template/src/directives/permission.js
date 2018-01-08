import Vue from 'vue';

/**
 * store.getters有个隐藏的问题，第一次调用的时候，会发现是undefined，实际上是有值的
 * vue估计会触发change事件，因此在组件中时候的时候，是没有什么问题的，组件自带update属性
 * 但是在普通的地方就不能这么干了，例如指令里面，只能老老实实的用state来获取
 */
Vue.directive('permission', {
  inserted(el, binding, vnode, oldVnode) {
    let funcCode = vnode.context.$store.state.funcCode[vnode.context.$route.path];
    if (funcCode.indexOf(parseInt(binding.value)) < 0) {
      if (vnode.componentInstance) {
        vnode.componentInstance.$destroy();
      }
      el.remove();
    }
  }
});