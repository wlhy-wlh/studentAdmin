const mongoose = require('mongoose');

// 1.声明schema
let StudentSchema = new mongoose.Schema({
   sid : Number, // 学生的学号
   name : String , // 名字
   sex: String , // 性别
   age : Number // 年龄
});

// 初始化Student类
var Student = mongoose.model('Student',StudentSchema);

// 导出
module.exports = Student;