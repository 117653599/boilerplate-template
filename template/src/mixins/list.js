export default {
  created() {
    this.listStore.on('beforeload', this._beforeListLoad);
    this.listStore.on('afterload', this._afterListLoad);
  },
  beforeDestroy() {
    this.listStore.removeAllListeners();
  },
  methods: {
    _beforeListLoad(params) {},
    _afterListLoad(response) {
      this.listStore.set_rows(this._set_rows? this._set_rows(response): response.data.rows);
      this.listStore.set_total(this._set_total? this._set_total(response): response.data.total);
    },
    _handleListSearch() {
      this.listStore.formComponent.validate((valid) => {
        if (valid) {
          this.listStore.emit('search');
        } else {
          this.$Message.error('表单验证失败!');
        }
      });
    }
  }
}