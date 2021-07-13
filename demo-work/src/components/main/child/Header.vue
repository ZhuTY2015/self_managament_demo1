<template>
  <div class="flex justify-between align-center">
    <div class="flex align-center">
      <Icon class="pointer" type="md-reorder" size="24" @click.native="bindCollapsible" :class="collapsible?'rotate':''" title="折叠" />
      <Icon class="pointer padding-left" title="刷新" type="md-refresh" size="20" @click.native="bindRefresh" />
    </div>
    <div class="flex align-center">
      <div class="avatar-box padding-right-sm">
        <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
        <span>国王与乞丐</span>
      </div>
      <Badge dot style="line-height: 1">
        <Icon class="pointer" type="md-notifications-outline" size="24"  @click="showDrawer = true" />
      </Badge>
      <Dropdown trigger="click" transfer>
        <Icon class="pointer padding-left-sm" type="md-power" size="20" />
        <DropdownMenu slot="list">
          <DropdownItem  class="text-center" @click.native="bindLogout">注销</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <!--右侧抽屉-->
    <Drawer class-name="drawer-style" v-model="showDrawer" width="350">
      <div slot="header">
        <Tabs v-model="drawerTab">
          <TabPane label="最新消息" name="tab_1"></TabPane>
          <TabPane label="历史消息" name="tab_2"></TabPane>
        </Tabs>
      </div>
      <div class="" v-if="drawerTab == 'tab_1'">
        <ul>
          <li class="flex flex-wrap padding-bottom-sm" v-for="item in 4" :key="item">
            <div class="margin-right-xs">
              <i class="circle sm bg-red"></i>
            </div>
            <div style="width: calc(100% - 20px)">
              <p>收到一条新的推送，请及时处理哦！</p>
              <p class="text-right text-sm color-gray">2021-03-15 12:34:40</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="" v-if="drawerTab == 'tab_2'">
        <li class="" v-for="item in 3" :key="item">
          <div class="padding-bottom-sm color-gray">
            <p>收到一条新的推送，请及时处理哦！</p>
            <p class="text-right text-sm">2021-03-01 12:34:40</p>
          </div>
        </li>
      </div>
    </Drawer>
  </div>
</template>

<script>
  export default {
    name: "Header",
    inject:['reload'],
    computed:{
      collapsible(){
        return this.$store.state.collapsible;
      },
    },
    data(){
      return {
        showDrawer:false,//抽屉显示
        drawerTab:'tab_1'
      }
    },
    mounted() {


    },
    methods:{
      //点击折叠图标，进行左侧菜单的折叠与打开
      bindCollapsible(){
        this.$store.commit('setMenuCollapsible', {
          collapsible:!this.collapsible
        });
      },
      //刷新页面
      bindRefresh(){
        this.reload();
      },
      //注销用户---退出登录
      bindLogout(){
        this.$router.push("/Login");
        sessionStorage.clear();
      }
    }
  }
</script>

<style scoped>
  .rotate{
    transform: rotate(-90deg);
  }

</style>
