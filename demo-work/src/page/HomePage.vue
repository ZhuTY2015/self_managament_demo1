<template>
  <div class="home-box">
    <!--<div class="query-box radius bg-white">
      <p class="query-title">查询条件</p>
      <div class="query-form flex flex-wrap padding-top-xs">
        <Form ref="queryForm" :model="queryForm" :label-width="80" inline style="width: calc(100% - 150px)">
          <FormItem label="设备名称" prop="name" class="flex">
            <Input type="text" v-model="queryForm.name" style="width: 200px;" placeholder="设备名称"></Input>
          </FormItem>
          <FormItem label="故障代码" prop="codeFail">
            <Input type="text" v-model="queryForm.codeFail" style="width: 200px;"  placeholder="故障代码"></Input>
          </FormItem>
        </Form>
        <div class="query-btn">
          <Button type="primary" @click="handleSubmit('queryForm')">重置</Button>
          <Button @click="handleSubmit('queryForm')">查询</Button>
        </div>

      </div>
    </div>
    <div class="table-box margin-top-sm padding-sm radius bg-white">
      <Table border :columns="columns" :data="tableData" size="small" width="100%" ></Table>
      <div class=" padding-top-sm text-right">
        <Page :total="page.total" transfer
              :page-size="page.size"
              :page-size-opts="[10,20,30,40,50]"
              size="small" show-elevator show-total show-sizer
              @on-change="changePage" @on-page-size-change="changeSize" />
      </div>
    </div>-->
    <div class="top-flex-box flex justify-between align-center margin-bottom-sm">
      <div class="top-items bg-white radius padding-sm">
        <p class="text-lg">{{currDateTxt}}，<span class="color-orange text-xlg">管理员</span></p>
        <div class="color-gray padding-top-xs text-sm ">哈哈哈，哈哈哈</div>
      </div>
      <div class="top-items bg-white radius padding-sm">
        <p class="text-lg">采集数量 <span class="color-orange text-xlg">2690</span></p>
        <div class="color-blue padding-top-xs text-sm ">本月：233</div>
      </div>
      <div class="top-items bg-white radius padding-sm">
        <p class="text-lg">设备数量 <span class="color-orange text-xlg">3201</span></p>
        <div class="color-blue padding-top-xs text-sm ">本月：569</div>
      </div>
      <div class="top-items bg-white radius padding-sm">
        <p class="text-lg">设备数量 <span class="color-orange text-xlg">3201</span></p>
        <div class="color-blue padding-top-xs text-sm ">本月：569</div>
      </div>
    </div>
    <div class="bottom-box flex justify-between">
      <!--左侧-->
      <div class="bottom-item left ">
        <!---->
        <div class="bg-white radius padding-top-xs" style="width:100%;height: 49%">
          <ve-histogram ref="vueBar" :data="histogram.chartData"
                        :colors="histogram.colors" :settings="histogram.setting"
                        :extend="histogram.extend" :judge-width="true"
                        width="100%" height="100%" ></ve-histogram>
        </div>
        <div class="bg-white radius padding-top-xs margin-top-sm" style="width:100%;height: calc(51% - 20px)">
          <ve-line ref="vueLine" :data="lineChart.chartData"
                   :settings="lineChart.setting" :colors="lineChart.colors"
                   :extend="lineChart.extend" :judge-width="true"
                   width="100%" height="100%" ></ve-line>
        </div>

      </div>
      <!--右侧-->
      <div class="bottom-item right">
        <div class="bg-white radius text-center" style="width:100%;height: 49%">
          <ve-pie ref="pieChart" :data="pieChart.chartData"
                  width="100%" height="100%"
                  :judge-width="true" :extend="pieChart.extend"
                  :settings="pieChart.setting"></ve-pie>
        </div>
        <div class="bg-white radius padding-top-xs margin-top-sm" style="width:100%;height: calc(51% - 20px)">
          <ve-radar ref="vueRadar" :data="radar.chartData" :settings="radar.setting"
                    :judge-width="true" :extend="radar.extend"
                    width="100%" height="100%"></ve-radar>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import "@/../static/js/config.js";
  export default {
    name: "HomePage",
    data(){
      return {
        grid: {
          left:10,
          right:10,
          bottom: 10
        },//图标grid设置（距离外层div的上下左右距离）
        legendSet:{
          top:'10',
          right:'15',
        },//图例相关设置
        tooltipChart:{
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.9)',//提示框背景
          textStyle: {
            color: '#303031',
            lineHeight: 25,
            fontSize: 12,
          },//提示框文字设置
          padding: 5,
          extraCssText: 'box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.15);',
        },//图标提示框样式
        histogram:{
          colors:["#afb4db","#d9d6c3","#abc88b"],//颜色组
          chartData:{
            columns: ['日期', '访问用户', '下单用户','回购用户'],
            rows: [
              { '日期': '1月', '访问用户': 120, '下单用户': 115,'回购用户':101},
              { '日期': '2月', '访问用户': 80, '下单用户': 50,'回购用户':45  },
              { '日期': '3月', '访问用户': 200, '下单用户': 185,'回购用户':166  },
              { '日期': '4月', '访问用户': 90, '下单用户': 90,'回购用户':80  },
              { '日期': '5月', '访问用户': 169, '下单用户': 151,'回购用户':145  },
              { '日期': '6月', '访问用户': 55, '下单用户': 44,'回购用户':33  },
              { '日期': '7月', '访问用户': 124, '下单用户': 123,'回购用户':88  },
              { '日期': '8月', '访问用户': 250, '下单用户': 198,'回购用户':125  },
              { '日期': '9月', '访问用户': 125, '下单用户': 171,'回购用户':165  },
              { '日期': '10月', '访问用户': 60, '下单用户': 90,'回购用户':50  },
              { '日期': '11月', '访问用户': 199, '下单用户': 99,'回购用户':89  },
              { '日期': '12月', '访问用户': 156, '下单用户': 123,'回购用户':105  },
            ],
          },//柱状图数据
          setting:{
            yAxisName:["数量","",],//左右坐标轴标题
          },//柱状图配置项
          extend:{
            grid: {
              left:10,
              right:10,
              bottom: 10
            },//图标grid设置（距离外层div的上下左右距离）
            legend:{
              top:'10',
              right:'15',
            },//图例相关设置
            tooltip:{
              trigger: 'axis',
              backgroundColor: 'rgba(255,255,255,0.9)',//提示框背景
              textStyle: {
                color: '#303031',
                lineHeight: 25,
                fontSize: 12,
              },//提示框文字设置
              padding: 5,
              extraCssText: 'box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.15);',
            },//图标提示框样式
          }
        },//柱状图相关设置
        lineChart:{
          colors:["#379AF4","#FFB400","#EC551F"],//颜色组
          chartData:{
            columns: ['日期', '访问用户', '下单用户','回购用户'],
            rows: [
              { '日期': '1月', '访问用户': 120, '下单用户': 115,'回购用户':101},
              { '日期': '2月', '访问用户': 80, '下单用户': 50,'回购用户':45  },
              { '日期': '3月', '访问用户': 200, '下单用户': 185,'回购用户':210  },
              { '日期': '4月', '访问用户': 90, '下单用户': 90,'回购用户':80  },
              { '日期': '5月', '访问用户': 169, '下单用户': 151,'回购用户':145  },
              { '日期': '6月', '访问用户': 55, '下单用户': 44,'回购用户':33  },
              { '日期': '7月', '访问用户': 124, '下单用户': 123,'回购用户':88  },
              { '日期': '8月', '访问用户': 250, '下单用户': 198,'回购用户':125  },
              { '日期': '9月', '访问用户': 125, '下单用户': 171,'回购用户':165  },
              { '日期': '10月', '访问用户': 60, '下单用户': 90,'回购用户':50  },
              { '日期': '11月', '访问用户': 199, '下单用户': 99,'回购用户':89  },
              { '日期': '12月', '访问用户': 156, '下单用户': 123,'回购用户':105  },
            ],
          },//柱状图数据
          setting:{
            yAxisName:["数量","",],//左右坐标轴标题
            area:true,
            areaStyle: {
              normal: {
                opacity: '0.1', //改变区域颜色
              },
              /*color:{
                type:'linear',
                colorStops:[
                  {
                    offset: 0,
                    x:0, y:0, x2:0, y2:1,
                    color: 'rgba(254,106,172,0.6)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,139,119,0.1)' // 100% 处的颜色
                  },
                ],
                globalCoord: false // 缺省为 false
              },/!*渐变*!/*/
            },
          },//柱状图配置项
          extend:{
            grid: {
              left:10,
              right:10,
              bottom: 10
            },//图标grid设置（距离外层div的上下左右距离）
            legend:{
              top:'10',
              right:'15',
            },//图例相关设置
            tooltip:{
              trigger: 'axis',
              backgroundColor: 'rgba(255,255,255,0.9)',//提示框背景
              textStyle: {
                color: '#303031',
                lineHeight: 25,
                fontSize: 12,
              },//提示框文字设置
              padding: 5,
              extraCssText: 'box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.15);',
            },//图标提示框样式
          }
        },//折线图相关设置
        pieChart: {

          chartData: {
            columns: ['日期', '用户'],
            rows: [
              { '日期': '1月', '用户': 120 },
              { '日期': '2月', '用户': 80  },
              { '日期': '3月', '用户': 200 },
              { '日期': '4月', '用户': 90  },
              { '日期': '5月', '用户': 169 },
              { '日期': '6月', '用户': 55  },
              { '日期': '7月', '用户': 124 },
              { '日期': '8月', '用户': 250 },
              { '日期': '9月', '用户': 125 },
              { '日期': '10月', '用户': 60 },
              { '日期': '11月', '用户': 19 },
              { '日期': '12月', '用户': 156 },
            ],
          },
          setting:{
            labelLine:{
              show:true,
              length:2,
              length2:2,
              smooth:0.5,
            },
          },
          extend:{
            grid: {
              left:10,
              right:10,
              bottom: 10
            },//图标grid设置（距离外层div的上下左右距离）
            legend:{
              show:false,
            },
            tooltip:{
              trigger: 'axis',
              backgroundColor: 'rgba(255,255,255,0.9)',//提示框背景
              textStyle: {
                color: '#303031',
                lineHeight: 25,
                fontSize: 12,
              },//提示框文字设置
              padding: 5,
              extraCssText: 'box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.15);',
            },//图标提示框样式
          }
        },//饼图相关设置
        histogram2:{
          chartData:{
            columns: ['日期', '访问用户', '下单用户','回购用户'],
            rows: [
              { '日期': '1月', '访问用户': 120, '下单用户': 115,'回购用户':101},
              { '日期': '2月', '访问用户': 80, '下单用户': 50,'回购用户':45  },
              { '日期': '3月', '访问用户': 200, '下单用户': 185,'回购用户':166  },
              { '日期': '4月', '访问用户': 90, '下单用户': 90,'回购用户':80  },
              { '日期': '5月', '访问用户': 169, '下单用户': 151,'回购用户':145  },
              { '日期': '6月', '访问用户': 55, '下单用户': 44,'回购用户':33  },
              { '日期': '7月', '访问用户': 124, '下单用户': 123,'回购用户':88  },
            ],
          },//柱状图数据
        },//K线图相关设置
        radar:{
          chartData:{
            columns: ["type","calc", "space", "memory",],
            rows: [
              {type: "计算力", calc: 3, space: 5, memory: 2},
              {type: "记忆力", calc: 3, space: 2, memory: 4},
              {type: "空间力", calc: 4, space: 4, memory: 4},
              // {date: "1/4", incomeOne: 1723, incomeTwo: 1423, incomeThree: 0.49, totalRevenue: 131,},
              // {date: "1/5", incomeOne: 3792, incomeTwo: 3492, incomeThree: 0.323, totalRevenue: 321,},
              // {date: "1/6", incomeOne: 4593, incomeTwo: 4293, incomeThree: 0.78, totalRevenue: 221,},
            ]
          },
          setting:{
            labelMap: {
              totalRevenue: "总收益",
              incomeOne: "收益1",
              incomeTwo: "收益2",
              incomeThree: "收益3",
            },
            areaStyle: {
              //   type: "default",
              opacity: 0.8,
            },
          },
          extend:{
            areaStyle:{
              color:"transparent"
            }
          }
        },
      }
    },
    computed:{
      currDateTxt(){
        let now = new Date();
        let hour = now.getHours();
        let desc = '';
        if(hour < 6){
          desc = "凌晨好";
        } else if (hour < 9){
          desc = "早上好";
        } else if (hour < 12){
          desc = "上午好";
        } else if (hour < 14){
          desc = "中午好";
        } else if (hour < 17){
          desc = "下午好";
        } else if (hour < 19){
          desc = "傍晚好";
        } else if (hour < 22){
          desc = "晚上好";
        } else {
          desc = "夜里好";
        }
        return desc;
      },
    },
    mounted() {
      this.$nextTick(()=>{
        // this.$refs['vueBar'].echarts.resize();
        // this.$refs['vueLine'].echarts.resize();
        // this.$refs['pieChart'].echarts.resize();
        // this.$refs['vueRadar'].echarts.resize();

      })
    },
    methods:{


    }

  }
</script>

<style scoped>
  .top-flex-box .top-items{
    width: 24%;
  }
  .bottom-box{
    height: calc(100vh - 255px);
  }
  .bottom-item{
  }
  .bottom-item.left{
    width: 73%;
  }
  .bottom-item.right{
    width: 26%;
  }
</style>
