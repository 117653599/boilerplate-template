<script>
import { Menu, MenuGroup, MenuItem, Submenu} from 'iview'
import { mapGetters } from 'vuex';

export default {
  components: {
    IMenu: Menu,
    MenuGroup,
    IMenuItem: MenuItem,
    Submenu
  },
  props: {
    theme: {
      type: String,
      default: 'light'
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    width: {
      type: String,
      default: '240px'
    },
    accordion: {
      type: Boolean,
      default: false
    },
    routes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      codePathMap: {}
    };
  },
  computed: {
    ...mapGetters([
      'breadcrumb'
    ])
  },
  methods: {
    handleSelect(name) {
      this.$router.push({path: this.codePathMap[name]});
    },
    getLink(route) {
      this.codePathMap[route.meta.code] = route.path;
      return (<span>{route.meta.title}</span>)
      // return (<router-link to={route.path}>{route.meta.title}</router-link>)
    }
  },
  render(h) {
    let menues = this.routes.map((route) => {
      if (route.component) {
        return (<i-menu-item name={route.meta.code || ''}>{this.getLink(route)}</i-menu-item>)
      } else if (!route.component) {
        let menuitems;
        menuitems = route.subMenu.map((child) => {
          if (!child.menuGroup) {
            return (<i-menu-item name={child.meta.code || ''}>{this.getLink(child)}</i-menu-item>)
          } else if (child.menuGroup) {
            let group = child.group.map((item) => {
              return (<i-menu-item name={item.meta.code || ''}>{this.getLink(item)}</i-menu-item>)
            });
            return (<Menu-group title={child.title}>{group}</Menu-group>)
          }
        });
        return (<Submenu name={route.meta.code || ''}>
          <template slot="title">
            {route.meta.title}
          </template>
          {menuitems}
        </Submenu>);
      }
    });
    let openNames = [], breadcrumb = this.breadcrumb, len = breadcrumb.length;
    if (len > 1) {
      openNames = [breadcrumb[len - 2].code];
    }
    // this.$slots.default 以及this.$route.meta.code会导致 menu组件重复渲染，原因是开始的时候this.$route.meta.code值为undefined,至于this.$slots.default为啥会导致出现重复渲染，这个我也不清楚
    return (
      <i-menu mode={this.mode} theme={this.theme} width={this.width} active-name={this.$route.meta.code} open-names={openNames} onOn-select={this.handleSelect}>
        {this.$slots.default}
        {menues}
      </i-menu>
    );
  }
}
</script>