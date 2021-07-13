const express = require('express');
const router = express.Router();
const fs = require('fs');
// nodejs生成UID（唯一标识符）——node-uuid模块
const UUID = require('node-uuid');

//菜单数据读取事件
const readFileMenuData = (res, fn) => {
    fs.readFile('./json/menu.json', 'utf-8', (err, content) => {
        if (err) {
            res.send({
                status: 1,
                errMsg: '数据读取失败',
                data: null,
            });
        } else {
            console.log('菜单数据读取成功');
            let data = content ? JSON.parse(content) : [];
            fn(data);
        }
    });
};


//获取所有菜单
router.get('getAllMenu', (req, res) => {
    let reqData = req.body;
    readFileMenuData(res, (data) => {
        res.send({
            status: 0,
            success: 'success',
            data: data,
            errMsg: null,
        });
    });
});



module.exports = router;