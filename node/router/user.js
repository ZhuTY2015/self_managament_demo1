const express = require('express');
const router = express.Router();
const fs = require('fs');
// nodejs生成UID（唯一标识符）——node-uuid模块
const UUID = require('node-uuid');


//用户数据读取事件
const readFileUserData = (res, fn) => {
    console.log(res);
    fs.readFile('./json/user.json', 'utf-8', (err, content) => {
        if (err) {
            res.send({
                status: 1,
                errMsg: '用户数据失败',
                data: null,
            });
        } else {
            console.log('用户数据读取成功');
            let data = content ? JSON.parse(content) : [];
            fn(data);
        }
    });
};

//操作用户数据

//获取所有菜单
router.post('/api/getUser', (req, res) => {
    let reqData = req.body;
    readFileUserData(res, (data) => {
        let total = data.length?data.length:0;
        let start = reqData.page==1?0:(reqData.page-1)*reqData.size;
        let end = reqData.page*reqData.size;
        let list = data.slice(start,end);
        console.log(start);
        console.log(end);
        console.log(reqData);
        console.log(reqData.page);

        res.send({
            status: 0,
            success: 'success',
            data: {
                list:list,
                total:total,
            },
            errMsg: null,
        });
    });
});


/*router.post('/getUser', (req, res) => {
    let reqData = req.body;
    /!*
      * page size
      * *!/
    readFileUserData(res, (data) => {
        let total = data.length?data.length:0;
        let start = reqData.page==1?0:(reqData.page-1)*reqData.size;
        let end = reqData.page*reqData.size;
        let list = data.slice(start,end);
        console.log(start);
        console.log(end);
        console.log(reqData);

        res.send({
            status: 0,
            success: 'success',
            data: {
                list:list,
                total:total,
            },
            errMsg: null,
        });
    });
});*/



module.exports = router;