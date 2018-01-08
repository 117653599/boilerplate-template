const ListComponent = () => import('./List.vue')
const DashboardComponent = () => import('./Dashboard.vue')

export default [{
  icon: '',
  show: true,
  path: '/opportunity/dashboard',
  component: DashboardComponent,
  meta: {
    title: '机会面板'
  },
}, {
  icon: '',
  show: true,
  path: '/opportunity/list',
  component: ListComponent,
  meta: {
    title: '机会列表'
  },
}];