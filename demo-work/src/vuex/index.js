import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state = {
  tableHeight:0,
  tagMenu:[],
  menuData:[
    {
      title:'首页',
      name:'Index',
      icon:'icon-rhome-fill',
      child:[
        { title:'首页',fatherName:'Index', name:'/HomePage',router:'/HomePage',icon:'icon-ios-planet'},
      ],
    },
    {
      title:'系统设置',
      name:'System',
      icon:'icon-LeftBar_Setting',
      child:[
        { title:'用户管理',fatherName:'System', name:'/User',router:'/User',icon:'icon-yonghuguanli'},
        { title:'角色管理',fatherName:'System', name:'/Role',router:'/Role',icon:'icon-jiaoseguanli'},
        { title:'权限管理',fatherName:'System', name:'/Power',router:'/Power',icon:'icon-quanxianguanli'},
      ],
    },
    {
      title:'采集box管理',
      name:'Collection',
      icon:'icon-LeftBar_MachineMaintenance',
      child:[
        { title:'参数配置',fatherName:'Collection', name:'/params',router:'',icon:'icon-canshushezhi-05'},
        { title:'设备关联',fatherName:'Collection', name:'/Relation',router:'',icon:'icon-guanlian'},
      ],
    },
    {
      title:'设备管理',
      name:'Facility',
      icon:'icon-shebeiguanli1',
      child:[
        { title:'设备类型',fatherName:'Facility', name:'/FacilityType',router:'',icon:'icon-shebei',},
        { title:'设备台账',fatherName:'Facility', name:'/FacilityBill',router:'',icon:'icon-LeftBar_Finance',},
      ],
    },
    {
      title:'知识库',
      name:'Knowledge',
      icon:'icon-zhishikugongju',
      child:[
        { title:'知识积累',fatherName:'Knowledge', name:'/KnowledgeBuild',router:'',icon:'icon-zhishichanquan',},
        { title:'故障记录',fatherName:'Knowledge', name:'/Fault',router:'',icon:'icon-2jiankangzhishi',},
      ],
    },
    {
      title:'报表查询',
      icon:'icon-LeftBar_Statistics',
      name:'Report',
      child:[
        { title:'故障分析表',fatherName:'Report', name:'/FaultAnalysis',router:'/FaultAnalysis',icon:'icon-LeftBar_MaritimeAffairs',},
        { title:'故障明细查询',fatherName:'Report', name:'/FaultDetailReport',router:'',icon:'icon-jilu',},
        { title:'实时采集数据',fatherName:'Report', name:'/RealTimeReport',router:'',icon:'icon-shishichaobiao',},
        { title:'历史采集数据',fatherName:'Report', name:'/HistoryReport',router:'',icon:'icon-lishishuju',},
        { title:'设备点检记录',fatherName:'Report', name:'/FacilityReport',router:'',icon:'icon-icon_mangdianjiance',},
      ],
    },

  ],
  openMenu:["Index"],
  collapsible:false,//左侧是否展开收起
};
const getters = {

}
const mutations = {
  //获取菜单数据
  getMenuData(state,payload){
    state.menuData = payload;
  },
  // 获取菜单打开
  getMenuDftOpen(state){
    let arr = JSON.parse(sessionStorage.getItem("openAry"))?JSON.parse(sessionStorage.getItem("openAry")):["Index"];
    state.tagMenu = arr;
  },
  //菜单默认打开
  setMenuDftOpen(state,payload){
    let arr = JSON.parse(sessionStorage.getItem("openAry"))?JSON.parse(sessionStorage.getItem("openAry")):["Index"];
    console.log(JSON.parse(sessionStorage.getItem("openAry")));
    if(!arr.includes(payload.fatherName)){
      arr.push(payload.fatherName)
    }
    state.openMenu = arr;
    sessionStorage.setItem("openAry",JSON.stringify(arr));
  },
  //获取tag
  getTagMenus(state){
    let arr = JSON.parse(sessionStorage.getItem("tagMenu"));
    arr = arr ? arr : [];
    state.tagMenu = arr;
  },
  //tag标签操作 新增 删除
  handleTagMenu(state,payload){
    let type = payload.typeHandle;
    //type 1：添加或者点击以存在的tag 2：删除全部  3：删除
    let list = state.menuData;
    // let arr = state.tagMenu;
    let arr = JSON.parse(sessionStorage.getItem("tagMenu"))?JSON.parse(sessionStorage.getItem("tagMenu")):[];
    if(type==1) {
      if(payload.router=='/HomePage'){
        return;
      }
      let isHave = arr.find(item => {
        return item.to == payload.router;
      });
      if(!isHave){
        arr.push({
          name: payload.name,
          to: payload.router,
          fatherName: payload.fatherName
        })
      }
    }
    if(type==2){
      arr = [];
    }
    if(type==3){
      let ind = -1;
      arr.forEach((item,index) => {
        if (item.to  == payload.router) {
          ind = index
        }
      })
      arr.splice(ind,1);
    }


    state.tagMenu = arr;
    sessionStorage.setItem("tagMenu",JSON.stringify(arr));
  },
  //左侧是否展开收起
  setMenuCollapsible(state,payload){
    state.collapsible = payload.collapsible;
  },

};


const actions = {

};


export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
