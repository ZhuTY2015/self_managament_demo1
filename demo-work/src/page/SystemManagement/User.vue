<template>
  <div class="">
    <div class="query-box radius bg-white">
      <p class="query-title">查询条件</p>
      <div class="query-form flex justify-between padding-top-xs">
        <Form ref="queryForm" class="grid-three flex flex-wrap" :model="queryForm" :label-width="80" inline style="width: calc(100% - 150px)">
          <FormItem label="设备名称" prop="name">
            <Input type="text" v-model="queryForm.name" style="width: 100%" placeholder="设备名称"></Input>
          </FormItem>
          <FormItem label="设备名称" prop="name">
            <Input type="text" v-model="queryForm.name" style="width: 100%;" placeholder="设备名称"></Input>
          </FormItem>
          <FormItem label="故障代码" prop="codeFail">
            <Input type="text" v-model="queryForm.codeFail" style="width: 100%;"  placeholder="故障代码"></Input>
          </FormItem>
          <FormItem label="故障代码" prop="codeFail">
            <Input type="text" v-model="queryForm.codeFail" style="width: 100%;"  placeholder="故障代码"></Input>
          </FormItem>
        </Form>
        <div class="query-btn">
          <Button type="primary" @click="handleSubmit('queryForm')">重置</Button>
          <Button @click="handleSubmit('queryForm')">查询</Button>
        </div>

      </div>
    </div>
    <div class="table-box-umy margin-top-sm padding-sm radius bg-white">
      <div class="table-top-btn padding-bottom flex">
        <Button class="margin-right-xs" type="primary" @click="userInfoHandle(1)">新 增</Button>
        <Button class="margin-right-xs" @click="downloadFile()">导 出</Button>
        <Button class="margin-right-xs" @click="importFile()">导入</Button>

       <!-- <div></div>

        <input type="file" @change="importFile(this)" id="imFile" style="display: none"
               accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        <a id="downlink"></a>
        <Button @click="uploadFile()">导入</Button>
        <Button @click="downloadFile(tableData)">导出</Button>-->
      </div>
      <u-table ref="plTable" :data="tableData"
               :dialog-data="columnsDialog"
               field-title="选择显示字段" :field-sort="true"
               @show-field="bindConfirmField" @reset="bindDialogReset"
               border tooltip-effect style="width: 100%" size="mini"
               @selection-change="handleSelectionChange">
        <u-table-column type="selection" fixed></u-table-column>
        <u-table-column v-for="(item,index) in columns" :key="item.key"
                        :fixed="item.fixed" show-overflow-tooltip
                        :prop="item.key" :label="item.name"
                        :width="item.width"></u-table-column>
        <u-table-column fixed="right" label="操作" width="150">
          <template slot="header" slot-scope="scope">
            <div>操作<span style="margin-left: 10px;color:red" @click="openDialog">点我试试看</span></div>
          </template>
          <template slot-scope="scope">
            <Button type="text" class=" text-sm" size="small" @click="userInfoHandle(3)">查看</Button>
            <Button type="text" class="color-blue text-sm" size="small" @click="userInfoHandle(2)">编辑</Button>
            <Button type="text" class="color-red text-sm" size="small">删除</Button>
          </template>
        </u-table-column>
      </u-table>
      <div class=" padding-top-sm text-right">
        <Page :total="page.total" transfer
              :page-size="page.size"
              :page-size-opts="[10,20,30,40,50]"
              size="small" show-elevator show-total show-sizer
              @on-change="changePage" @on-page-size-change="changeSize" />
      </div>

    </div>
    <!--新增-编辑-查看 弹框-->
    <UserModal :paramsAll="paramsAll"></UserModal>
    <!--导出-->
    <ExportFile :exportAll="exportAll"></ExportFile>
    <!--导入-->
    <ImportExcel :importAll="importAll" @pushData="getListData"></ImportExcel>
  </div>
</template>

<script>
  import Axios from "../../util/axios";
  // import axios from "axios";

  var XLSX = require('xlsx')

  import UserModal from "./child/UserModal";
  import ExportFile from "../../components/ExportFile";
  import ImportExcel from "../../components/ImportExcel";
  export default {
    name: "User",
    components:{UserModal,ExportFile,ImportExcel},
    data(){
      return {
        paramsAll:{
          isShow:false,
          type:1
        },//新增弹框相关设置
        exportAll:{
          isShow:false,
          tHeader:[],//表头
          filterVal:[],//字段名
          tableData:[],
        },//到处相关设置
        importAll:{
          excelForm: {
            fileName: "", //文件名
            offon: false, //选择文件点击触发
            data: [], //解析后返回数据
            range: 0//表格表头从第 range+1 行开始取值 默认为0
          },
          excelColumns:[
            /*importHidden:解析时是否隐藏；importType；该字段的类型；importRequired：是否为必填项*/
            {name: '错误原因', key: 'errorReason',fixed: 'left',minWidth:130,importHidden: true  },
            {name: '中文名', key: 'name',minWidth:100, importRequired: true },
            {name: '外文名', key: 'nameEn',minWidth:100 },
            {name: '别名', key: 'nick',minWidth:100 },
            {name: '国籍', key: 'nationality',minWidth:100 },
            {name: '唯一标识', key: 'randomNumber',minWidth:100,importOnly: true, importRequired: true },
            {name: '出身地', key: 'address',minWidth:100 },
            {name: '年龄', key: 'age',minWidth:100,importType: 'number', importRequired: true },
            {name: '民族', key: 'nation',minWidth:100, importRequired: true },
            {name: '生日', key: 'birth',minWidth:100,importRequired: true },
            {name: '星座', key: 'constellation',minWidth:100 },
            {name: '血型', key: 'blood',minWidth:100 },
            {name: '身高', key: 'height',importType: 'number',minWidth:100 },
            {name: '毕业院校', key: 'school',minWidth:100 },
            {name: '经纪公司', key: 'company',minWidth:100 },
            {name: '主要成就', key: 'achievement',minWidth:100 },
            {name: '职业', key: 'occupation',minWidth:100 },
            {name: '作品集', key: 'works',minWidth:100 },
            {name: '生肖', key: 'zodiac',minWidth:100 },
            {name: '语种', key: 'languages',minWidth:100 },
            {name: '特长', key: 'specialty',minWidth:100 },
          ],
          isShow:false,
        },
        queryForm:{
          name:'',//
          codeFail:'',//
        },//查询模块相关
        page:{
          total:0,
          size:10,
          current:1,
        },//分页相关
        allColumns: [
          {name: '中文名', key: 'name',fixed: 'left',minWidth:100,state: true,disabled: false  },
          {name: '外文名', key: 'nameEn',width: 120,minWidth:120,tooltip:true,state: true,disabled: false},
          {name: '别名', key: 'nick',width: 120,minWidth:120,tooltip:true,state: true,disabled: false},
          {name: '国籍', key: 'nationality',minWidth:100,tooltip:true,state: true,disabled: false},
          {name: '唯一标识', key: 'randomNumber',minWidth:100,tooltip:true,state: true,disabled: false},
          {name: '出身地', key: 'address',width: 150,minWidth:150,tooltip:true,state: true,disabled: false},
          {name: '年龄', key: 'age',minWidth:100,tooltip:true,state: true,disabled: false},
          {name: '民族', key: 'nation',minWidth:100,tooltip:true,state: true,disabled: false},
          {name: '生日', key: 'birth',width: 120,minWidth:120,tooltip:true,state: true,disabled: false},
          {name: '星座', key: 'constellation',minWidth:100,tooltip:true,state: true,disabled: false},
          {name: '血型', key: 'blood',minWidth:100,tooltip:true,state: true,disabled: false},
          {name: '身高', key: 'height',minWidth:100,tooltip:true,state: true,disabled: false},
          {name: '毕业院校', key: 'school',minWidth:150,tooltip:true,state: true,disabled: false},
          {name: '经纪公司', key: 'company',width: 100,minWidth:100,tooltip:true,state: true,disabled: false},
          {name: '主要成就', key: 'achievement',width: 200,minWidth: 200,tooltip:true,state: true,disabled: false},
          {name: '职业', key: 'occupation',width: 100,minWidth:100,tooltip:true,state: true,disabled: false},
          {name: '作品集', key: 'works',width: 180,minWidth:200,tooltip:true,state: true,disabled: false},
          {name: '生肖', key: 'zodiac',width: 80,minWidth:80,tooltip:true,state: true,disabled: false},
          {name: '语种', key: 'languages',width: 150,minWidth:150,tooltip:true,state: true,disabled: false},
          {name: '特长', key: 'specialty',width: 100,minWidth:100,tooltip:true,state: true,disabled: false},
        ],//表格--全部的列
        columns: [],//页面显示的列
        columnsDialog: [
          {name: '中文名', key: 'name',state: true,disabled: true  },
          {name: '外文名', key: 'nameEn',state: true,disabled: true},
          {name: '别名', key: 'nick',state: true,disabled: true},
          {name: '国籍', key: 'nationality',state: true,disabled: false},
          {name: '随机数', key: 'randomNumber',state: true,disabled: false},
          {name: '出身地', key: 'address',state: true,disabled: false},
          {name: '年龄', key: 'age',state: true,disabled: false},
          {name: '民族', key: 'nation',state: true,disabled: false},
          {name: '生日', key: 'birth',state: true,disabled: false},
          {name: '星座', key: 'constellation',state: true,disabled: false},
          {name: '血型', key: 'blood',state: true,disabled: false},
          {name: '身高', key: 'height',state: true,disabled: false},
          {name: '毕业院校', key: 'school',state: true,disabled: false},
          {name: '经纪公司', key: 'company',state: true,disabled: false},
          {name: '主要成就', key: 'achievement',state: true,disabled: false},
          {name: '职业', key: 'occupation',state: true,disabled: false},
          {name: '作品集', key: 'works',state: true,disabled: false},
          {name: '生肖', key: 'zodiac',state: true,disabled: false},
          {name: '语种', key: 'languages',state: true,disabled: false},
          {name: '特长', key: 'specialty',state: true,disabled: false},
        ],
        tableData:[

        ],//表格数据
        tableAll:[
          {
            name: '佟丽娅 ',
            nameEn: 'Tong Liya、 Liliya',
            code:this.createCode(),
            nick: '丫丫/美丫/小丸子',
            randomNumber:'dhfkshkhsd',
            nationality: '中国',
            address: '新疆伊犁察布查尔',
            age: 38,
            nation: '锡伯族',
            birth: '1983年8月8日',
            constellation: '狮子座',
            blood: 'A型',
            height: '164.5 cm',
            school: '中央戏剧学院',
            company: '佟丽娅工作室',
            achievement: '锡伯族形象大使、第28届中国电视金鹰奖观众喜爱的女演员、第21届上海国际电影节最受传媒关注女主角、第13届华鼎奖中国百强电视剧最佳女演员奖等',
            occupation: '演员、舞者',
            works: '平凡的世界、超时空同居、北京爱情故事、宫锁心玉',
            zodiac: '猪',
            languages: '锡伯语、汉语、维吾尔语、英语',
            specialty: '舞蹈',
          }
        ],
        imFile: '', // 导入文件el
        outFile: '',  // 导出文件el
      }
    },
    mounted() {
      this.columns = this.allColumns;
      this.imFile = document.getElementById('imFile');
      this.outFile = document.getElementById('downlink');
      this.$nextTick(()=>{
        this.getListData();
      })
    },
    methods:{
      //导出
      downloadFile() {
        let list = this.allColumns;
        let filterVal = [];
        let tHeader = [];
        list.forEach(item=>{
          filterVal.push(item.key)
          tHeader.push(item.name)
        })
        this.exportAll.isShow = true;
        this.exportAll.tableData = this.tableData;
        this.exportAll.tHeader = tHeader;
        this.exportAll.filterVal = filterVal;
      },
      //导入
      importFile(){
        this.importAll.isShow = true
      },
      //表格按钮操作---用户信息弹框
      userInfoHandle(tp){
        this.paramsAll.isShow = true;
        this.paramsAll.type = tp;
      },

      //打开表格侧边弹框
      openDialog () {
        this.$refs.plTable.plDialogOpens()
      },
      //获取随机code
      createCode() {
        let code = "";
        ////所有候选组成验证码的字符，当然也可以用中文的
        let codeChars = [2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 26; i++) {
          let dx = String.fromCharCode(65 + i); //输出专A-Z  26个大写字母
          let xx = String.fromCharCode(97 + i); //输出a-z  26个小属写字母
          if (dx !== "I" && dx !== "O") {
            codeChars.push(dx);
          }
          if (xx !== "i" && xx !== "o" && xx !== "l") {
            codeChars.push(xx);
          }
        }
        //循环组成验证码的字符串
        for (let i = 0; i < 6; i++) {
          //获取随机验证码下标
          let charNum = Math.floor(Math.random() * 54);
          //组合成指定字符验证码
          code += codeChars[charNum];
        }
        return code;
      },
      //查询按钮
      handleSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.queryForm);
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      //获取数据
      getListData(list){
        /*if(list) {
          list.forEach(item => {
            this.tableAll.push(item)
          })
        }
        this.page.total = this.tableAll.length;
        console.log(this.tableAll);
        if (this.tableAll.length > 10) {
          this.tableData = this.tableAll.slice((this.page.current - 1) * this.page.size, this.page.current * this.page.size);
        } else {
          this.tableData = this.tableAll;
        }*/
        let reqData = {
          "page":1,
          "size":10
        }
        console.log(this.qs.stringify(reqData));
        Axios.post(demoSetting.url+"/user/getUser",this.qs.stringify(reqData)).then((res) => {
          console.log(res);
          /*if(res.status === 0){

          }else{


          }*/

        }).catch((err=>{
          console.log(err);
          this.$Message.error("程序错误")
        }))
      },
      //分页
      changePage(val){
        this.page.current = val;
        this.getListData();
      },
      //改变分页展示条数
      changeSize(val){
        this.page.size = val;
        this.getListData();
      },
      //表格选择
      handleSelectionChange(val){
        console.log(val);
      },
      //表格右侧弹框--操作每一项时
      bindAmendField(row,index){
      },
      //表格右侧弹框--确定按钮
      bindConfirmField(arr){
        this.columns =[];
        let temp = [];
        let ary = [];
        let newAry = [];
        arr.forEach(item=>{
          if(item.state){
            ary.push(item)
          }
        })
        /*for(let i in ary){
          temp[ary[i].key] = true;
        }
        for (let k in this.columns){
          if(!temp[this.columns[k].key]){
            newAry.push(this.columns[k])
          }
        }*/
        ary.forEach(sub=>{
          this.allColumns.forEach(item=>{
            if(item.key === sub.key){
              newAry.push(item)
            }
          })

        })

        this.$nextTick(()=>{
          this.columns = newAry;
          this.$forceUpdate();
        })

      },
      //表格右侧弹框--重置
      bindDialogReset(arr){
        this.columns = this.allColumns;
      },
    }
  }
</script>

<style scoped>

</style>
