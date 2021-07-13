<template>
  <div>
    <Modal v-model="paramsAll.isShow" width="750" :closable="false"
      :title="modalTitle" :mask-closable="false" footer-hide>
      <div>
        <Form ref="submitForm" class="dialog-form grid-two flex flex-wrap" :disabled="paramsAll.type==3?true:false"
              :model="formData" :label-width="75" :rules="formRule">
          <FormItem label="姓名" prop="name">
            <Input type="text" v-model="formData.name" clearable style="width: 100%" placeholder="请输入中文名"></Input>
          </FormItem>
          <FormItem label="外文名" prop="nameEn">
            <Input type="text" v-model="formData.nameEn" clearable style="width: 100%;" placeholder="请输入外文名"></Input>
          </FormItem>
          <FormItem label="别名" prop="nick">
            <Input type="text" v-model="formData.nick" clearable style="width: 100%;" placeholder="请输入别名"></Input>
          </FormItem>
          <FormItem label="国籍" prop="nationality">
            <Input type="text" v-model="formData.nationality" clearable style="width: 100%;" placeholder="请输入国籍"></Input>
          </FormItem>
          <FormItem label="出身地" prop="birthPlace">
            <Input type="text" v-model="formData.birthPlace" clearable style="width: 100%;" placeholder="请输入出身地"></Input>
          </FormItem>
          <FormItem label="年龄" prop="age">
            <InputNumber :max="399" :min="1" v-model="formData.age" style="width: 100%;" placeholder="请输入年龄"></InputNumber>
          </FormItem>
          <FormItem label="民族" prop="nation">
            <Select v-model="formData.nation" clearable style="width: 100%;" placeholder="请选择民族">
              <Option v-for="item in nationAry" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="生日" prop="birthday">
            <DatePicker type="date" clearable v-model="formData.birthday" placeholder="请选择生日" style="width: 100%"></DatePicker>
          </FormItem>
          <FormItem label="星座" prop="starSign">
            <Select v-model="formData.starSign" clearable style="width: 100%;" placeholder="请选择星座">
              <Option v-for="item in starSignAry" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="血型" prop="bloodType">
            <Select v-model="formData.bloodType" clearable style="width: 100%;" placeholder="请选择血型">
              <Option v-for="item in bloodTypeAry" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="身高" prop="height">
            <div class="flex justify-between input-number-box">
              <InputNumber :max="399" :min="0" v-model="formData.height" style="width: calc(100% - 35px);" :precision="1" placeholder="请输入身高"></InputNumber>
              <span class="input-number-append">cm</span>
            </div>
          </FormItem>
          <FormItem label="毕业院校" prop="school">
            <Input type="text" clearable v-model="formData.school" style="width: 100%;" placeholder="请输入毕业院校"></Input>
          </FormItem>
          <FormItem label="经济公司" prop="company">
            <Input type="text" clearable v-model="formData.company" style="width: 100%;" placeholder="请输入经济公司"></Input>
          </FormItem>
          <FormItem label="职业" prop="occupation">
            <Input type="text" clearable v-model="formData.occupation" style="width: 100%;" placeholder="请输入职业"></Input>
          </FormItem>
          <FormItem label="成就" prop="achievement" style="width: calc(100% - 20px);">
            <Input type="textarea" clearable v-model="formData.achievement" style="width: 100%;" placeholder="请输入成就"></Input>
          </FormItem>
          <FormItem label="作品" prop="works" style="width: calc(100% - 20px);">
            <Input type="textarea" clearable v-model="formData.works" style="width: 100%;" placeholder="请输入作品"></Input>
          </FormItem>
          <FormItem label="生肖" prop="zodiac">
            <Select v-model="formData.zodiac" clearable style="width: 100%;" placeholder="请选择生肖">
              <Option v-for="item in zodiacAry" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="语种" prop="languages">
            <Input type="text" clearable v-model="formData.languages" style="width: 100%;" placeholder="请输入语种"></Input>
          </FormItem>
          <FormItem label="特长" prop="specialty" style="width: calc(100% - 20px);">
            <Input type="textarea" clearable v-model="formData.specialty" style="width: 100%;" placeholder="请输入特长"></Input>
          </FormItem>
        </Form>
      </div>
      <div class="text-right margin-top-sm" style="width: calc(100% - 20px);">
        <Button @click="close">关闭</Button>
        <Button type="primary" v-if="paramsAll.type!=3" @click="submitForm('submitForm')">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "UserModal",
    props:["paramsAll"],
    data(){
      return {
        formData:{
          name:'',//中文名
          nameEn:'',//外文名
          nick:'',//昵称别名
          nationality:'',//国籍
          birthPlace:'',//出身地
          age:null,//年龄
          nation:'',//民族
          birthday:'',//生日
          starSign:'',//星座
          bloodType:'',//血型
          height:null,//身高
          school:'',//毕业院校
          company:'',//经纪公司
          achievement:'',//主要成就
          occupation:'',//职业
          works:'',//作品集
          zodiac:'',//生肖
          languages:'',//语种
          specialty:'',//特长
        },
        nationAry:["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族",
          "白族","土家族","哈尼族","哈萨克族","傣族","黎族","僳僳族","佤族","畲族","高山族","拉祜族","水族","东乡族",
          "纳西族","景颇族","柯尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族",
          "普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族",
          "鄂伦春族",'赫哲族',"门巴族","珞巴族","基诺族"],//民族
        starSignAry:["白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座","摩羯座","水瓶座","双鱼座"],//星座
        bloodTypeAry:["A型","B型","AB型","O型","RH阳性","RH阴性"],//星座
        zodiacAry:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
        formRule:{
          name: [
            { required: true, message: '中文名不能为空', trigger: 'blur' }
          ],
          age: [
            { required: true, type:'number', message: '年龄不能为空', trigger: 'blur' }
          ],
          nation: [
            { required: true, message: '民族不能为空', trigger: 'change' }
          ],
          birthday: [
            { required: true, type:'date', message: '生日不能为空', trigger: 'change' }
          ],
        },//表单验证规则
      }
    },
    computed:{
      modalTitle(){
        let title = '';
        switch (this.paramsAll.type) {
          case 1:title='新增用户'
                break;
          case 2:title='编辑用户信息';
            break;
          case 3:title='查看用户信息';
            break;
        }
        return title;
      },
    },
    mounted() {

    },
    methods:{
      //提交表单
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form  = this.formData;
            console.log(form);
          } else {
            this.$Message.warning('请完善表单信息!');
          }
        })
      },
      //关闭弹框
      close(){
        this.paramsAll.isShow = false;
        this.$refs["submitForm"].resetFields();
      },

    }
  }
</script>

<style scoped>

</style>
