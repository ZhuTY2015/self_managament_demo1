<template>
  <div>
    <Modal v-model="exportAll.isShow" title="Excel数据导出" :closable="false" footer-hide :mask-closable="false">
      <Form ref="excelForm" :model="excelForm" :rules="excelRule" :label-width="110">
        <FormItem prop="range" label="导出数据范围">
          <RadioGroup v-model="excelForm.range" size="small">
            <Radio :label="1">当前页数据</Radio>
            <Radio :label="2">所有页数据</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem prop="name" label="Excel文件名称">
          <Input v-model="excelForm.name" maxlength="15" placeholder="请输入Excel文件名称"></Input>
        </FormItem>
      </Form>
      <div class="btn-box text-right">
        <Button @click="close">关闭</Button>
        <Button type="primary" @click="excelSubmit('excelForm')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'ExportFile',
    props: ["exportAll"],
    components: {},
    data() {
      return {
        excelForm: {
          range: 1,
          name: '',
        },
        excelRule: {
          range: [
            {required: true, type: 'number', message: '请选择数据范围', trigger: 'change'}
          ],
          name: [
            {required: true, message: 'Excel文件名称不能为空', trigger: 'blur'},
          ]
        },
        autoWidth: true,
        bookType: 'xlsx'
      }
    },
    methods: {
      close() {
        this.exportAll.isShow = false;
        this.$refs["excelForm"].resetFields();
      },
      excelSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = this.excelForm;
            //导出当前页
            if(form.range == 1) {
              import('@/util/Export2Excel').then(excel => {
                const tHeader = this.exportAll.tHeader;//表头
                const filterVal = this.exportAll.filterVal;//字段名
                const list = this.exportAll.tableData;
                const data = this.formatJson(filterVal, list);
                excel.export_json_to_excel({
                  header: tHeader,
                  data,
                  filename: form.name,
                  autoWidth: this.autoWidth,
                  bookType: this.bookType
                })
              })
              this.exportAll.isShow = false;
            }else{
              this.$Message.warning('正在完善中，请等待!');
            }
          } else {
            this.$Message.warning('请完善信息!');
          }
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          return v[j]
        }))
      },
    },
    mounted() {
    },
  }
</script>

<style scoped>

</style>
