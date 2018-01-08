const ListComponent = () => import('./List.vue')
const ContacterComponent = () => import('./Contacter.vue')

export default [{
  icon: '',
  show: true,
  path: '/customer/list',
  component: ListComponent,
  meta: {
    title: '客户列表'
  },
}, {
  icon: '',
  show: true,
  path: '/customer/contacter',
  component: ContacterComponent,
  meta: {
    title: '联系方式'
  },
}];