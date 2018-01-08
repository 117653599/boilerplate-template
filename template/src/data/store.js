import EventProxy from 'eventproxy'
import { merge } from 'lodash'

class Store extends EventProxy {
  constructor(context, config = {}) {
    super();
    this.context = context; // 当前组件环境
    this.config = merge({
      ajax: {
        url: ''
      },
      page: true,
      pageSize: 20,
      local: false,
      autoLoad: true
    }, config);
    this._ajaxParamsName = this._getAjaxParamsName(this.config.ajax);

    this.response = null; // 请求返回的数据
    this.pageSize = this.config.pageSize;
    this.total = 0; // 总共有多少条数据
    this._rows = []; // 做缓存，适配本地分页
    this.rows = []; // 实际要展示的列表数据

    this.formComponent = null; // form组件
    this.attachEvents();
  }

  set_form(component) {
    this.formComponent = component;
    if (this.config.autoLoad) {
      this.load({
        start: 0,
        limit: this.pageSize
      });
    }
  }

  set_response(response) {
    this.response = response;
  }

  set_total(total) {
    this.total = total;
  }

  set_rows(rows) {
    this._rows = rows;
    this.rows = this.config.local? rows.slice(0, this.pageSize): rows;
  }

  setPageSize(pageSize) {
    this.pageSize = pageSize;
  }

  attachEvents() {
    this.on('search', (extParams = {}) => {
      if (this.config.page) {
        Object.assign(extParams, {
          start: 0,
          limit: this.pageSize
        });
      }
      this.load(extParams);
    });
    this.on('pageChange', (startAndLimit) => {
      if (this.config.local) {
        this.rows = this._rows.slice(startAndLimit.start, startAndLimit.limit);
      } else {
        this.load(startAndLimit);
      }
    });
  }

  load(params = {}) {
    let data = Object.assign({}, this.formComponent.model, params);
    this.emit('beforeload', data);
    // let config = 
    return this.context.$axios({
      ...this.config.ajax,
      [this._ajaxParamsName]: data
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

  _getAjaxParamsName(config) {
    if (config.method && ['POST', 'PUT', 'PATCH'].indexOf(config.method.toUpperCase()) > -1) {
      return 'data';
    } else {
      return 'params'
    }
  }
}

export default Store;