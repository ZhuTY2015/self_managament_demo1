<template>
  <div class="container-box">
    <Row :gutter="10">
      <Col span="4" style="min-width:200px;">
        <Card :bordered="false" class="left-card">
          <div>
            ew
          </div>
        </Card>
      </Col>
      <Col span="20" style="max-width:calc(100% - 200px);" >
        <Card style="height: calc(100vh - 130px);">
          <i class="triangle-border-down yellow"></i>
          <i class="triangle-border-down blue"></i>
          <i class="triangle-border-up yellow"></i>
          <i class="triangle-right gray"></i>
          <i class="triangle-left gray"></i>
          <br>
          <span class="square-box"><i class="square blue"></i></span>

          <span class="square-box"><i class="square gray"></i></span>
          <span class="square-box"><i class="square yellow"></i></span>
          <span class="today-icon"><i class="iconfont icon-qizi"></i></span>
          <div class="flex process-box">
            <span>进场前</span>
            <ul class="line-box">
              <li class="line"></li>
            </ul>
          </div>




        </Card>
      </Col>
    </Row>

  </div>
</template>

<script>
  export default {
    name: "FaultAnalysis",
    data(){
      return {
        enterBeforeData:[
          {
            status:1,//1:蓝色三角 2：黄色三角 3：蓝色方块 4：黄色方块 5：红色方块 6：小红旗
            date:'2021-01-12',
            desc:'立项，任务分解',
            cls:'',//类名
          }
        ],
      }
    },

  }
</script>

<style scoped lang="less">
  .left-card{
    height: 100%;
    overflow: auto;
  }
  .process-box{
    width: 100%;
    span{
      width: 50px;
    }
  }
  .line-box{
    width: 100%;
    .line{
      height: 100px;
      border-top:2px solid #e2e2e2;
      position: relative;
      &:nth-child(odd){
        border-right: 2px solid #e2e2e2;
      }
      &:nth-child(even){
        border-left: 2px solid #e2e2e2;
      }
      &:last-child{
        border-left: none;
        border-right: none;
        border-radius:0;
      }
      &:nth-child(odd):last-child:after{
        content: '';
        position: absolute;
        right: -2px;
        top: -9px;
        display:inline-block;
        border-style:solid;
        border-width: 8px 0 8px 14px;
        border-color:transparent transparent transparent #e2e2e2;/*透明 透明 透明 灰*/
      }
      &:nth-child(even):last-child:after{
        content: '';
        position: absolute;
        left: -2px;
        top: -9px;
        display:inline-block;
        border-style:solid;
        border-width:8px 14px 8px 0;
        border-color:transparent #e2e2e2 transparent transparent;/*透明 灰 透明 透明 */
      }
    }

  }


</style>
