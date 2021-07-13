<template>
   <div>
     <input type="file" ref="upload" id="file" @change="changeReadFile" accept=".xls, .xlsx" v-show="false" />
     <Modal :width="650" v-model="importAll.isShow" title="Excel数据导入" :closable="false" footer-hide :mask-closable="false">
       <div class="text-right padding-bottom-sm">
         <Button type="primary" @click="importExcel" size="small" >导入</Button>
       </div>
       <div class="import-scroll">
         <u-table ref="plTable" :data="importData" border tooltip-effect style="width: 100%" size="mini" max-height="300">
           <u-table-column v-for="(item,index) in importAll.excelColumns" :key="item.key"
                           :fixed="item.fixed" show-overflow-tooltip :min-width="item.minWidth"
                           :prop="item.key" :label="item.name" :class="item.color"
                           :width="item.width">
             <template slot-scope="scope">
               <span v-if="item.name=='错误原因'" class="color-red">{{ scope.row[importAll.excelColumns[index].key] }}</span>
               <span v-else>{{ scope.row[importAll.excelColumns[index].key] }}</span>
             </template>
           </u-table-column>
         </u-table>
       </div>
       <div class="text-right padding-top-sm">
         <Button @click="close" >关闭</Button>
         <Button type="primary" @click="importSubmit">确定</Button>
       </div>

     </Modal>
   </div>
</template>

<script>
  import $ from 'jquery'
  import XLSX from "xlsx";
  export default {
    name: "ImportExcel",
    props:["importAll"],
    data(){
      return {
        importData:[],
      }
    },
    methods:{
      //导入-选择文件
      importExcel(){
        this.$refs["upload"].click();
      },
      //读取文件以及验证
      changeReadFile(e) {
        const files = e.target.files;
        if (files.length <= 0) {
          //如果没有文件名
          return false;
        } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
          this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
          return false;
        }
        const fileReader = new FileReader();
        fileReader.onload = ev => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: "binary"
            });
            const wsname = workbook.SheetNames[0]; //取第一张表
            let range = this.importAll.excelForm.range ? this.importAll.excelForm.range : 0;
            const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], {
              range: range
            });
            //生成json表格内容
            this.importAll.excelForm.fileName = files[0].name;
            this.importAll.excelForm.data = ws;
            this.validData(ws, files[0].name)
            this.$refs.upload.value = "";
          } catch (ev) {
            return false;
          }
        };
        fileReader.readAsBinaryString(files[0]);

      },
      //验证
      validData(data,name) {
        let arr = []
        let result = {
          fileName: name,
          value: true,
          length: data.length,
          errorLength: 0,
          tableData: [],
          originData: data
        }
        data.forEach((obj,j)=>{
          let tableRow ={
            errorReason: ''
          }
          let newObj = {}
          for(let key in obj) {
            newObj[this.trimData(key)] = obj[key]
          }
          arr.push(newObj)
          this.importAll.excelColumns.forEach((col,i)=>{
            if (!col.importHidden) {
              tableRow[col.key] = newObj[col.name] === undefined ? '' : newObj[col.name]
              if (col.importRequired&&tableRow[col.key] === '') {
                tableRow.errorReason += `${col.name}不能为空！`
                result.value = false
                return true
              }
              if(col.importType==='number' && isNaN(tableRow[col.key])) {
                //isNaN 检查是否为非数字值--true非数字  false为数字
                tableRow.errorReason += `${col.name}必须为数字！`
                result.value = false
                return true
              }
              if(col.importOnly&&j>0&&arr[j-1][col.name]===arr[j][col.name]) {
                tableRow.errorReason += `${col.name}与第${j}条重复！`
                result.value = false
                return true
              }
              if(col.importText&&col.importText.indexOf(tableRow[col.key])===-1) {
                tableRow.errorReason += `${col.name}的值为"${col.importText.join('、')}"之一！`
                result.value = false
                return true
              }
            }
          })
          if(tableRow.errorReason!=='') {
            result.errorLength++
          }
          result.tableData.push(tableRow)
        })
        /*$.each(data, (j, obj) => {
          let tableRow ={
            errorReason: ''
          }
          let newObj = {}
          for(let key in obj) {
            newObj[this.trimData(key)] = obj[key]
          }
          arr.push(newObj)
          $.each(this.importAll.excelColumns, (i, col) => {
            if (!col.importHidden) {
              tableRow[col.key] = newObj[col.name] === undefined ? '' : newObj[col.name]
              if (col.importRequired&&tableRow[col.key] === '') {
                tableRow.errorReason += `${col.name}不能为空！`
                result.value = false
                return true
              }
              if(col.importType==='number'&& !isNaN(tableRow[col.key])) {
                tableRow.errorReason += `${col.name}必须为数字！`
                result.value = false
                return true
              }
              if(col.importOnly&&j>0&&arr[j-1][col.name]===arr[j][col.name]) {
                tableRow.errorReason += `${col.name}与第${j}条重复！`
                result.value = false
                return true
              }
              if(col.importText&&col.importText.indexOf(tableRow[col.key])===-1) {
                tableRow.errorReason += `${col.name}的值为"${col.importText.join('、')}"之一！`
                result.value = false
                return true
              }
            }
          })
          if(tableRow.errorReason!=='') {
            result.errorLength++
          }
          result.tableData.push(tableRow)
        })*/
        this.importData = result.tableData;
        // this.$emit("getExcelData", result);
      },
      //去掉回车空格
      trimData(key) {
        if (typeof key === 'undefined') return
        let result = key.replace(/\s+/g, "")
        result = result.replace(/<\/?.+?>/g, "")
        result = result.replace(/[\r\n]/g, "");
        return result
      },
      //关闭
      close(){
        this.importAll.isShow = false;
        this.importData = [];
      },
      //确定
      importSubmit(){
        let list = this.importData;
        console.log(list);
        if(list.length<=0){
          this.$Message.warning('请导入表格数据!');
          return;
        }
        for(let i = 0;i<list.length;i++){
          if(list[i].errorReason){
            this.$Message.warning('请完善表格重新导入!');
            return;
          }
        }
        this.$Message.success('导入成功!');
        this.$emit("pushData",list);
        this.close();
      },
    }
  }
</script>

<style scoped>
  .import-scroll{

  }

</style>
