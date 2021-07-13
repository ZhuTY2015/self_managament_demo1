const express=require('express');
const app=express();
const fs=require('fs');

const bodyParser = require('body-parser'); //加载body-parser数据处理模块
app.use(bodyParser.json({limit: '50mb'})); //设置中间件的请求数据格式
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true })); //设置编码格式扩展

//设置跨域请求头
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 加载中间件     express.static(静态文件夹)
// app.use(express.static('public'))

app.listen(3339,'127.0.0.1',(req,res)=>{
    console.log('服务器已启动')
})




// 菜单-相关数据操作
const menu=require('./router/menu');
app.use('api/menu', menu);

const user=require('./router/user');
app.use('api/user', user);