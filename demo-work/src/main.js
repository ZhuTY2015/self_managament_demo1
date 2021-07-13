// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'view-design/dist/styles/iview.css';
// import './my-theme/index.less';//更换颜色
import '../static/css/reset.css'
import '../static/css/common.css'
import store from './vuex'
import Qs from 'qs'
Vue.prototype.qs = Qs

//引入viewUI
import ViewUI from 'view-design';
Vue.use(ViewUI);

//引入 umy-table
import {UTable, UTableColumn} from 'umy-ui';
import 'umy-ui/lib/theme-chalk/index.css';
Vue.use(UTable)
Vue.use(UTableColumn)

//引入v-charts
import VCharts from 'v-charts';
Vue.use(VCharts);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
