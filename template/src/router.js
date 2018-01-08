import customerRoutes from '@/modules/customer/routes';
import opportunityRoutes from '@/modules/opportunity/routes';

// 自定义格式的路由数据
let routerData = [
  {
    meta: {
      title: '客户'
    },
    subMenu: customerRoutes
  }, {
    meta: {
      title: '机会'
    },
    subMenu: opportunityRoutes
  }
];

/**
 * 生成vue-router格式的路由item,加上了菜单code
 * @param {自定义的菜单选项} router 
 */
let generateRoute = (router, code) => {
  return {
    path: router.path,
    component: router.component,
    meta: Object.assign({ code }, router.meta)
  };
};

/**
 * 生成vue-router配置，只适合2级导航，如果遇到4级导航，请拆分成多个二级菜单，进行处理
 * @param {自定义的菜单数据} routerData 
 */
let getRoutes = (portalMenuMap) => {
  let routes = [];
  routerData.forEach((item) => {
    // todo 这边的算法有问题，适合2级导航，如果是四级导航，就傻逼了，得再想办法处理
    if (item.component && portalMenuMap[item.path]) { // 如果是页面，并且有权限查看
      routes.push(generateRoute(item, portalMenuMap[item.path].code));
    } else {
      item.subMenu.forEach((element) => {
        if (element.menuGroup) {
          element.group.forEach((value) => {
            if (portalMenuMap[value.path]) {
              routes.push(generateRoute(value, portalMenuMap[value.path].code));
            }
          });
        } else {
          if (portalMenuMap[element.path]) {
            routes.push(generateRoute(element, portalMenuMap[element.path].code));
          }
        }
      });
    }
  });
  return routes;
};

/**
 * 获取菜单数据结构，清洗掉飞菜单的路由，以及没有权限查看的路由
 * @param {菜单与url映射表} portalMenuMap 
 */
let getMenuData = function(portalMenuMap) {
  let result = [];
  routerData.forEach(routerItem => {
    if (!routerItem.subMenu) {
      let menuItem = portalMenuMap[routerItem.path];
      if (menuItem && menuItem.show) { // 判断是否应该放到菜单项里面
        result.push({
          icon: menuItem.icon,
          path: routerItem.path,
          meta: generateMeta(routerItem, menuItem),
          component: true
        });
      }
    } else {
      let subMenuCode = getSubMenuCode(routerItem.subMenu, portalMenuMap);
      if (subMenuCode) {
        let tmp = {
          // icon: routerItem.icon,
          path: routerItem.path,
          meta: Object.assign({code: subMenuCode}, routerItem.meta),
          component: !!routerItem.component,
          subMenu: []
        };
        routerItem.subMenu.forEach(subMenuItem => { // 循环子菜单
          let menuItem = portalMenuMap[subMenuItem.path]
          if (menuItem && !subMenuItem.menuGroup && menuItem.show) { // 如果不是分组的菜单，并且要展示，同时该用户还有权限查看。
            tmp.subMenu.push({
              icon: menuItem.icon || subMenuItem.icon,
              path: menuItem.url || routerItem.path,
              meta: generateMeta(subMenuItem, menuItem),
              component: !!subMenuItem.component
            });
          }
          if (subMenuItem.menuGroup) { // 如果是分组的子菜单
            let group = {
              title: subMenuItem.title,
              menuGroup: true
            }
            let newGroup = [];
            subMenuItem.group.forEach(groupItem => {
              let menuItem = portalMenuMap[groupItem.path]
              if (menuItem && menuItem.show) { // 如果要展示出来，同时该用户有权限查看
                newGroup.push({
                  icon: menuItem.icon,
                  path: menuItem.url || groupItem.path,
                  meta: generateMeta(groupItem, menuItem),
                  component: true
                });
              }
            });
            if (newGroup.length) { // 如果该子菜单分组下有要展示的菜单
              group.group = newGroup;
              tmp.subMenu.push(group);
            }
          }
        });
        result.push(tmp);
      }
    }
  });
  return result;
}

/**
 * 生成meta数据
 * @param {*} routerItem 
 * @param {*} menuItem 
 */
let generateMeta = function(routerItem, menuItem) {
  return Object.assign(routerItem.meta, {code: menuItem.code, title: menuItem.cn, en_title: menuItem.en})
}

/**
 * 获取父菜单的code
 * @param {子菜单列表} subMenu 
 * @param {菜单与url映射表} portalMenuMap 
 */
let getSubMenuCode = function(subMenu, portalMenuMap) {
  let code = null;
  subMenu.find((item) => {
    if (!item.menuGroup && portalMenuMap[item.path]) {
      code = portalMenuMap[item.path].pCode;
      return true
    }
    if (item.menuGroup) {
      item.group.find(element => {
        if (portalMenuMap[element.path]) {
          code = portalMenuMap[element.path].pCode;
          return true;
        }
      });
    }
    return false;
  });
  return code;
}

export {
  getRoutes,
  getMenuData
};

// 兴趣 机会 能力
// MBTI模型