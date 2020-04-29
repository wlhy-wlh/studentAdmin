// 启动入口文件
const express = require('express'),
      mongoose = require('mongoose'),
      cookieSession = require('cookie-session');

// 连接数据库 端口号不需要写 sm为数据库名称 
mongoose.connect('mongodb://localhost/sm',{useNewUrlParser:true,useUnifiedTopology:true});

let app = express();

app.set('view engine','ejs');

app.use(cookieSession({
    name:'sess_id',
    keys:['key1'],
    maxAge: 30 * 60 * 1000 // 30min 
}))

// 路有清单

// 处理静态资源
app.use(express.static('public'));

app.listen(3000);

