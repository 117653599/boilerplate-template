<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex">
      <Col :span="spanLeft" class="layout-menu-left">
        <left-menu theme="dark" width="auto" :routes="menuData">
          <div class="layout-logo-left"></div>
        </left-menu>
      </Col>
      <Col :span="spanRight">
        <ws-header>
          <i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </i-button>
        </ws-header>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view transition transition-mode="out-in"></router-view>
          </div>
        </div>
        <ws-footer></ws-footer>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { getMenuData } from './router.js';
  import LeftMenu from '@/components/Menu';
  import Footer from '@/components/Footer';
  import Header from '@/components/Header';
  export default {
    components: {
      LeftMenu,
      WsFooter: Footer,
      WsHeader: Header
    },
    data() {
      return {
        menuData: getMenuData(this.$store.getters.menuMap),
        spanLeft: 5,
        spanRight: 19
      }
    },
    computed: {
      iconSize() {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    methods: {
      toggleClick() {
        if (this.spanLeft === 5) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 5;
          this.spanRight = 19;
        }
      }
    }
  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .layout-content {
    min-height: 700px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  
  .layout-content-main {
    padding: 10px;
  }
  
  .layout-menu-left {
    background: #464c5b;
  }
  
  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  
  .layout-hide-text .layout-text {
    display: none;
  }
  
  .ivu-col {
    transition: width .2s ease-in-out;
  }
</style>