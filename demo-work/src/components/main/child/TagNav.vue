<template>
  <div class="tag-nav-box flex justify-between align-center bg-white">
    <div class="tag-left flex align-center justify-between">
<!--      <Icon type="ios-rewind" />-->
      <Icon type="ios-rewind" class="arrow-icon left pointer padding-left-xs" size="18" @click="handleTagClick(240)" />
      <div class="tag-list-box" ref="scrollOuter">
        <div ref="scrollBody" class="tab-scroll"
             :style="{'left':tagBodyLeft+'px'}"
             @DOMMouseScroll="handleTagScroll"
             @mousewheel="handleTagScroll">
          <span>
            <span class="gray-line margin-right-xs"></span>
            <Tag style="border: none;" class="pointer"
                 @click.native="handleTagBtn('home')"
                 :color="'/HomePage'==$route.path?'primary':'default'">首页</Tag>
          </span>
          <span v-for="(item,index) in tagMenu" :key="index">
            <span class="gray-line" :class="index==0?'margin-right-xs':'margin-lr-xs'"></span>
            <Tag style="border: none;" closable @on-close="handleClose(item)" class="pointer"
                 :color="item.to==$route.path?'primary':'default'"
                 @click.native="handleTagBtn(item)">{{item.name}}</Tag>
          </span>
        </div>
      </div>

      <Icon type="ios-rewind" class="arrow-icon right pointer" @click="handleTagClick(-240)" size="18" />

    </div>
    <div class="right-box padding-right-xs">
      <span class="gray-line margin-right-xs"></span>
      <Dropdown trigger="click" transfer>
        <span class="pointer">关闭操作<Icon type="md-arrow-dropdown" size="20" /></span>
        <DropdownMenu slot="list">
          <DropdownItem  class="text-center" @click.native="handleDropDown(1)">关闭当前</DropdownItem>
          <DropdownItem  class="text-center" @click.native="handleDropDown(2)">关闭全部</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TagNav",
    props:[],
    data(){
      return {
        tagBodyLeft:0,
      }
    },
    computed:{
      tagMenu() {
        return this.$store.state.tagMenu;
      },
    },
    mounted() {
      this.$store.commit('getTagMenus');
    },
    methods:{
      //tag 鼠标滚动事件
      handleTagScroll(e) {
        var type = e.type;
        let delta = 0;
        if (type === "DOMMouseScroll" || type === "mousewheel") {
          delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
        }
        this.handleTagClick(delta);
      },
      //点击tag左右箭头事件
      handleTagClick(offset) {
        const outerWidth = this.$refs.scrollOuter.offsetWidth; //wrap宽
        const bodyWidth = this.$refs.scrollBody.offsetWidth; //content宽
        if (offset > 0) {
          this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
        } else {
          if (outerWidth < bodyWidth) {
            if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
              this.tagBodyLeft = this.tagBodyLeft;
            } else {
              this.tagBodyLeft = Math.max(
                this.tagBodyLeft + offset,
                outerWidth - bodyWidth
              );
            }
          } else {
            this.tagBodyLeft = 0;
          }
        }
      },
      //点击tag标签事件
      handleTagBtn(item){
        if(item=='home'){
          this.$router.push('/HomePage');
          this.$store.commit('setMenuDftOpen', {fatherName: "Index"});
        }else{
          this.$router.push(item.to);
          this.$store.commit('setMenuDftOpen', {fatherName: item.fatherName});
        }

      },
      //删除
      handleClose(item){
        this.$router.push("/HomePage");
        this.$store.commit('handleTagMenu', {
          typeHandle: 3, router: item.router, name: item.title, currPath: item.router
        });
      },
      //关闭操作
      handleDropDown(tp){
        if(tp==1){
          this.$router.push("/HomePage");
          this.$store.commit('handleTagMenu', {
            typeHandle: 3, router: this.$route.path, currPath: this.$route.path
          });
        }
        if(tp==2){
          this.$router.push("/HomePage");
          this.$store.commit('handleTagMenu', {
            typeHandle: 2,
          });
        }
      }
    }
  }
</script>

<style scoped>
  .tag-nav-box{
    box-shadow: 0 0 2px 2px #f0f0f0;
    color: #666666;
    /*padding: 5px 10px;*/
    position: relative;
  }
  .tag-left{
    width:calc(100% - 105px);
  }
  .tag-list-box{
    position: absolute;
    left: 40px;
    right: 145px;
    top: 8px;
    bottom: 0;
  }
  .tab-scroll{
    position: absolute;
    left: 0;
    overflow: visible;
    white-space: nowrap;
  }
  .tag-list-box::-webkit-scrollbar {
    display: none;
  }
  .arrow-icon{
    width: 40px;
  }
  .arrow-icon.right{
    padding-left: 5px;
    transform: rotate(-180deg);
  }
  .arrow-icon.left{
    padding-right: 5px;
  }
  .arrow-icon,.right-box{
    position: relative;
    z-index: 5;
    background: #FFFFFF ;
    height: 40px;
    line-height: 40px;
  }
  .right-box{
    width: 105px;
  }
  .gray-line{
    display: inline-block;
    width: 1px;
    height: 16px;
    background: #999999;
    position: relative;
    top: 4px;
  }


</style>
