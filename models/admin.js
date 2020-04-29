const mongoose = require('mongoose');

// 1.声明schema
let adminSchema = new mongoose.Schema({
    username: String, // 用户名
    password: String, // 密码
    posttime : Number, // 注册时间
    lastLoginTime :Number // 最后一次登录时间
});

// 初始化admin类
var Admin = mongoose.model('Admin',adminSchema);

// 导出
module.exports = Admin;