#cs
usc 客服系统。

```
{
  pApp: '父菜单',
  pCode: '父AppCode',
  iUrl: 'icon路径',
  url: '相对路径',
  pr: '顺序',
  show: '是否显示（int）',
  baseUrl: 'URL的Base部分',
  code: '',
  app: '',
  cn: '中文名',
  en: '英文名'
}

[
  {
    meta: {
      title: ''
    },
    path: '',
    component: '', // 有这个字段，表示这是个页面，同时就不会有subMenu字段
    subMenu: [
      {
        path: '',
        component: '',
        meta: {
          title: ''
        },
      },
      {
        menuGroup: true, // 还有可能是menuGroup
        title: '',
        group: [
          {
            path: '',
            component: '',
            meta: {
              title: ''
            },
          }
        ]
      }
    ]
  }
]
```