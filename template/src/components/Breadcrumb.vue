<script>
  import { Breadcrumb, BreadcrumbItem } from 'iview';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      Breadcrumb,
      BreadcrumbItem
    },
    computed: {
      ...mapGetters([
        'breadcrumb'
      ])
    },
    render(h) {
      let result = [];
      if (this.breadcrumb.length > 2 || this.breadcrumb.length === 2 && this.breadcrumb[0].url) {
        this.breadcrumb.forEach((item) => {
          if (item.url) {
            result.push(<Breadcrumb-item href={item.url}>{item.cn}</Breadcrumb-item>);
          }
        });
        return (
          <Breadcrumb>
            {result}
          </Breadcrumb>
        )
      }
    }
  }
</script>