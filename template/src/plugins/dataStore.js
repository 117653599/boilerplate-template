import EventProxy from 'eventproxy'
class Store extends EventProxy {
  constructor(context, config = {}) {
    super();
    this.context = context; // 当前组件环境
    this.config = Object.assign({
      axiosConfig: {
        url: '',
        method: 'get'
      },
      page: true,
      local: false,
      autoLoad: true
    });

    this.response = null; // 请求返回的数据
    this.total = 0; // 总共有多少条数据
    this._rows = []; // 做缓存，适配本地分页
    this.rows = []; // 实际要展示的列表数据

    this.formComponent = null; // form组件
    this.pagerComponent = null; // 分页组件
    // this.searchButtons = [];
  }

  // componentInited() {
  //   if (this.formComponent && (!this.config.page || this.pagerComponent)) {
  //     if (this.config.autoLoad) {
  //       this.load();
  //     }
  //   }
  // }

  set_form(component) {
    this.formComponent = component;
    this.emit('init_form', component);
  }

  set_pager(component) {
    this.pagerComponent = component;
    this.emit('init_pager', component);
    this.pagerComponent.$on('on-change', (current) => {
      if (!this.config.local) {
        this.load();
      } else {
        let startAndLimit = this.getStartAndLimit();
        this.rows = this._rows.slice(startAndLimit.start, startAndLimit.limit);
      }
    });
  }

  set_response(response) {
    this.response = response;
  }

  set_total(total) {
    this.total = total;
  }

  set_rows(rows) {
    this._rows = rows;
    this.rows = this.config.local? rows.slice(0, this.pagerComponent.currentPageSize): rows;
  }

  // set_button(component) {
  //   this.searchButtons.push(component);
  // }

  attachEvents() {
    this.on('search', (extParams) => {
      this.pagerComponent.currentPage = 1;
      this.load(extParams);
    });
    // 在组件初始化完成的时候进行数据请求
    if (this.config.page) {
      this.all('init_form', 'init_pager', () => {
        this._componentInit();
      });
    } else {
      this.on('init_form', () => {
        this._componentInit();
      });
    }
  }

  _componentInit() {
    if (this.config.autoLoad) {
      this.load();
    }
  }

  getStartAndLimit() {
    if (!this.config.page) {
      return {};
    }
    let start = (this.pagerComponent.currentPage - 1) * this.pagerComponent.currentPageSize;
    let limit = this.pagerComponent.currentPage * this.pagerComponent.currentPageSize;
    return {
      start,
      limit
    };
  }

  load(params = {}) {
    let data = Object.assign({}, this.formComponent.model, params, this.getStartAndLimit());
    this.emit('beforeload', data);
    return this.context.$axios({
      method: this.config.axiosConfig.method,
      url: this.config.axiosConfig.url,
      data
    }).then((response) => {
      let result = response.data;
      if (result.success) {
        this.set_response(result);
        this.emit('afterload', result);
      } else {
        this.emit('fail', result);
      }
    });
  }
}

export default Store;