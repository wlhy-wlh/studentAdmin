const Student = require('../models/student'),
      Admin = require('../models/admin');


module.exports = {
    // 登录块
    // 渲染登录页
    showLogin(req,res){
        res.render('login');
    },
    // 处理登录
    doLogin(req,res){

    },
    // 验证用户是否存在
    checkUser(res,req){

    }
    // 登录块 end
    
}