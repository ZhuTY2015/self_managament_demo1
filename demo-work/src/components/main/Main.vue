<template>
<!--  <MainWrap></MainWrap>-->
  <MainWrap>
    <keep-alive :include="keepAliveRouter">
      <router-view v-if="isRouterAlive" />
    </keep-alive>
  </MainWrap>
</template>

<script>
  import MainWrap from "./MainWrap";
  export default {
    name: "Main",
    components:{MainWrap},
    provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
      return {
        reload: this.reload
      }
    },
    data(){
      return {
        keepAliveRouter:[],
        isRouterAlive: true,//控制视图是否显示的变量
      }
    },
    methods:{
      //刷新
      reload () {
        this.isRouterAlive = false;            //先关闭，
        this.$nextTick(function () {
          this.isRouterAlive = true;         //再打开
        })
      },
    },
    watch: {
      $route(to, from) {
        /*let str = sessionStorage.getItem("keepName");
        if (str) {
          this.keepAliveRouter = JSON.parse(str);
        } else {
          this.keepAliveRouter = [];
        }*/
      }
    },
  }
</script>

<style scoped lang="less">

</style>
