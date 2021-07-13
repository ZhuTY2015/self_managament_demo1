<template>
  <div>
    <div class="flex align-center color-white padding-sm">
      <Avatar style="background-color: #87d068" icon="ios-person" />
      <p class="padding-left-xs" v-if="!collapsible">Demo 平台</p>
    </div>
    <div class="menu-scroll">
      <Menu theme="dark" ref="navmenu" :active-name="$route.path" class="self-menu" v-if="!collapsible"
            :open-names="openMenu">
            <Submenu  v-for="(item,index) in menuData" :key="index" :name="item.name">
              <template slot="title">
                <div>
                  <i class="iconfont" :class="item.icon"></i>
                  <span v-show="item.child&&item.child.length>0">{{item.title}}</span>
                </div>
              </template>
              <template  v-if="item.child&&item.child.length>0">
                <MenuItem @click.native="handleMenu(subItem)" :name="subItem.name" v-for="(subItem,subSInd) in item.child" :key="subSInd">
                  <i  class="iconfont" :class="subItem.icon"></i>
                  <span>{{subItem.title}}</span>
                </MenuItem>
              </template>
            </Submenu>
      </Menu>
      <div v-else>
        <Dropdown class="margin-bottom" trigger="click" transfer v-for="(item,index) in menuData" :key="index" placement="right">
          <Icon class="pointer padding-left-sm color-white" :type="item.icon" size="30" />
          <DropdownMenu slot="list">
            <DropdownItem  class="text-center" :selected="item.router==$route.path"
                           v-for="(subItem,subInd) in item.child"
                           :key="subInd"
                           @click.native="handleMenu(subItem)">{{subItem.title}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MenuNav",
    data(){
      return {

      }
    },
    mounted() {
      this.$store.commit('getMenuDftOpen');
      this.$nextTick(() => {
        this.$refs.navmenu.updateOpened();
        this.$refs.navmenu.updateActiveName();
      });
    },
    computed:{
      menuData(){
        return this.$store.state.menuData;
      },
      openMenu(){
        this.$nextTick(() => {
          this.$refs.navmenu.updateOpened();
          this.$refs.navmenu.updateActiveName();
        });
        return this.$store.state.openMenu;
      },
      collapsible(){
        return this.$store.state.collapsible;
      },
    },
    methods:{
      //点击选择操作菜单
      handleMenu(item){
        if(item.router) {
          this.$router.push({path: item.router, query: {}});
          this.$store.commit('handleTagMenu', {
            typeHandle: 1, router: item.router, name: item.title, fatherName: item.fatherName
          });
          this.$store.commit('setMenuDftOpen', {fatherName: item.fatherName});
          this.$nextTick(() => {
            this.$refs.navmenu.updateOpened();
            this.$refs.navmenu.updateActiveName();
          });
        }

      },
    }
  }
</script>

<style scoped lang="less">
  .self-menu/deep/.ivu-menu{
    background: #002B6A !important;
  }
  .self-menu/deep/ .ivu-menu-submenu-title{
    background: #03357F !important;
    padding: 10px 24px !important;
  }
  .self-menu/deep/ .ivu-menu-item{
    padding: 10px 35px !important;
  }
  .menu-scroll{
    max-height: calc(90vh);
    overflow-y: auto;
    overflow-x: hidden;
  }
  /*滚动条隐藏*/
  .menu-scroll::-webkit-scrollbar{
    display: none;
  }
</style>
