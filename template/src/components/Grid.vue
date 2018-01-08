<template>
  <div>
    <slot></slot>
    <div :page="page" class="page-wrapper">
      <Page :total="total" :current="current" v-bind="_pageProps" ref="pager" @on-page-size-change="handlePageSizeChange" @on-change="handlePageChange"></Page>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      store: {
        type: Object,
        required: true
      },
      page: {
        type: Boolean,
        default: true
      },
      total: Number,
      pageProps: Object
    },
    data() {
      return {
        current: 1,
        pageSize: 0
      };
    },
    created() {
      if (this.page) {
        this.store.on('search', ()=> {
          this.current = 1;
        });
      }
    },
    computed: {
      _pageProps() {
        return Object.assign({
          'size': 'small',
          'show-total': true,
          'show-elevator': true,
          'show-sizer': true,
          'page-size': 20,
          'page-size-opts': [20, 40, 60, 100]
        }, this.pageProps);
      }
    },
    methods: {
      handlePageSizeChange(pageSize) {
        // todo pagesize的改变会让current变成1，但是不知道会不会出发pageChange事件
        this.store.setPageSize(pageSize);
        this.pageSize = pageSize;
        this.store.emit('pageChange', this.getStartAndLimit(this.current, pageSize));
      },
      handlePageChange(current) {
        this.current = current;
        this.store.emit('pageChange', this.getStartAndLimit(current, this.pageSize ||this.$refs.pager.pageSize));
      },
      getStartAndLimit(current, pageSize) {
        return {
          start: (current - 1) * pageSize,
          limit: current * pageSize
        };
      }
    }
  }
</script>

<style scoped>
  .page-wrapper {
    float: right;
    padding-top: 20px;
    padding-bottom: 30px;
  }
</style>