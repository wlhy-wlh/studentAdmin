//  处理路由
const   express = require('express'),
        loginCtrl = require('../controllers/loginCtrl'),
        studentCtrl = require('../controllers/studentCtrl'),
        {logout} = require('../controllers/logout');

let router = express.Router();

router.use((req,res,next)=>{
    if(!req.session['s_id'] && req.url != '/login'){
        // 没有登录过
        res.redirect('/login');
        return;
    }
    next();
})



// 路有清单
router.get('/login',loginCtrl.showLogin); // 访问登录页面
router.post('/login',loginCtrl.doLogin) ; // 访问登录接口，处理登录操作
router.propfind('/login',loginCtrl.checkUser); // 访问接口 验证用户名是否存在
router.get('/',studentCtrl.shwoIndex); // 访问首页
router.get('/student/msg',studentCtrl.showList); // 获取学生列表
router.get('/student/exportExcel',studentCtrl.exportStudent); // 访问接口 处理学生数据导出
router.get('/student/search',studentCtrl.searchStudent); // 模糊搜索
router.get('/student/addStudent',studentCtrl.showAddStudent);  //访问增加学生
router.put('/student/addStudent',studentCtrl.addStudent); // 访问接口 处理增加学生
router.post('/student/:sid',studentCtrl.updateStudent); // 修改学生数据
router.delete('/student/:sid',studentCtrl.deleteStudent); // 删除学生
router.get('/logout',logout); // 退出登录
module.exports = router;