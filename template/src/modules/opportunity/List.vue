<template>
  <div>
    <Form v-store:form="listStore" ref="searchForm" :model="searchForm" :label-width="80">
      <Row>
        <Col span="8">
          <Form-item label="需求名称" prop="name">
            <Input v-model="searchForm.name" placeholder="请输入需求名称"></Input>
          </Form-item>
        </Col>
        <Col span="8">
          <Form-item label="销售" prop="salesman">
            <Input v-model="searchForm.salesman" placeholder="请输入所属销售人员"></Input>
          </Form-item>
        </Col>
        <Col span="8">
          <Form-item label="客服" prop="service">
            <Input v-model="searchForm.service" placeholder="请输入所属客服"></Input>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <Form-item label="状态" prop="status">
            <Select v-model="searchForm.status" placeholder="请选择状态">
              <Option value="0">未联系</Option>
              <Option value="1">需求提交</Option>
              <Option value="2">需求跟进</Option>
              <Option value="3">结束</Option>
            </Select>
          </Form-item>
        </Col>
        <Col span="8">
          <Form-item>
            <Button v-permission="10" type="primary" @click="_handleListSearch">提交</Button>
            <Button type="primary" @click="handleViewClick">查看</Button>
          </Form-item>
        </Col>
      </Row>
    </Form>
    <Grid :store="listStore" :total="listStore.total">
      <Table border :columns="columns" :data="listStore.rows" size="small"></Table>
    </Grid>
  </div>
</template>

<script>
  import Store from '@/data/store.js';
  import GridComponet from '@/components/Grid.vue';
  import listMixins from '@/mixins/list.js';
  import ModifyDialog from './ModifyDialog';
  import { Button } from 'iview';
  // import merge from 'lodash/merge';
  const merge = _.merge;
  export default {
    mixins: [listMixins],
    components: {
      Grid: GridComponet,
      ModifyDialog
    },
    data() {
      return {
        listStore: new Store(this, {
          ajax: {
            url: '/user/baseinfo'
          }
        }),
        searchForm: {
          name: '',
          salesman: '',
          service: '',
          status: '',
        },
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return (<div>
                <Button type="primary" size="small" style="margin-right: 5px" v-permission="10" onClick={this.handleViewClick.bind(this, params)}>查看</Button>
                <Button type="warning" size="small" style="margin-right: 5px" v-permission="10" onClick={this.handleModify.bind(this, params)}>编辑</Button>
                <Button type="error" size="small" style="margin-right: 5px" v-permission="11" onClick={this.handleDelete.bind(this, params)}>删除</Button>
              </div>)
            }
          }
        ],
        dialogData: {}
      }
    },
    methods: {
      generateButtons(h, bts) {
        let finalBts = [];
        Object.keys(bts).forEach( key => {
          finalBts.push(h('Button', merge(
            {
              props: {
                type: 'primary',
                size: 'small',
              },
              style: {
                marginRight: '5px'
              }
            }, bts[key]
          ), key));
        });
        return h('div', finalBts);
      },
      handleViewClick(params) {
        console.log(params);
      },
      handleModify(params) {
        let ok = false;
        let handleOk = (model) => {
          Object.assign(params.row, model);
        }
        this.$Modal.confirm({
          loading: true,
          render (h) {
            return (<ModifyDialog data={{...params.row}} ok={ok}  modalInstance={this} onOk={handleOk}></ModifyDialog>)
          },
          onOk () {
            ok = !ok
          }
        })
      },
      handleDelete() {}
    }
  }
</script>