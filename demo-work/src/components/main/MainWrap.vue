<template>
  <Layout class="layout-box">
    <Sider hide-trigger :width="collapsible?80:240" class="slider-box"  v-model="collapsible">
      <MenuNav style="height: 100%;"></MenuNav>
    </Sider>
    <Layout class="content-layout">
      <Header class="header-box bg-white" >
        <Headers></Headers>
      </Header>
      <Content >
        <TagNav></TagNav>
        <div class="content-wrapper">
          <div class="wrapper-scroll">
            <slot></slot>
          </div>

        </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
  import MenuNav from "./child/MenuNav";
  import Headers from "./child/Header";
  import TagNav from "./child/TagNav";
  import axios from "axios";
  // import Axios from "../../util/axios";
  import "@/../static/js/config.js";//需要先挂载到window中，也就是在index.html中需要先引入
  export default {
    name: "MainWarp",
    data(){
      return {}
    },
    prop:[],
    components:{MenuNav,Headers,TagNav},
    computed:{
      collapsible(){
        return this.$store.state.collapsible;
      },
    },
    mounted() {
      this.getMenuData();

    },
    methods:{
      //获取菜单
      getMenuData(){
        axios.post(demoSetting.url + "/api/menu/getAllMenu").then(res => {
          console.log(res);
        });


        console.log(demoSetting.url+"/api/menu/getAllMenu");
        /*Axios.get(demoSetting.url+"/api/menu/getAllMenu").then((res) => {
          console.log(res);
          if(res.status === 0){
            console.log(res.data);
            this.$store.commit('getMenuData', res.data);//
            this.$store.commit("setMenuDftOpen",{fatherName:'Index'});//当前打开
          }else{
            this.$Message.error(res.errMsg)

          }

        }).catch((err=>{
          console.log(err);
          this.$Message.error("程序错误")
        }))*/
      }

    },
    watch:{

    },
  }
</script>

<style scoped>
  .layout-box{
    min-height: 100vh;
  }
  .slider-box{
    background: #002B6A;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
    background-color: #03357F !important;
  }
  .header-box.ivu-layout-header{
    background: #FFFFFF;
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    min-width:800px;
  }
  .content-wrapper{
    max-height: calc(100vh - 110px);
    /*max-height: 80vh;*/
    overflow: auto;
    position: relative;
  }
  .wrapper-scroll{
    margin: 20px 20px 0 20px;
  }
  .content-layout.ivu-layout{
    overflow-x: auto !important;
  }

</style>
