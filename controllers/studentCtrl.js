const Student = require('../models/student'),
      Admin = require('../models/admin'),
      formidable = require('formidable');
      

module.exports = {
    shwoIndex(req,res){
        let page = req.query.page ? req.query.page : 1;
        // console.log(req.session);
        Admin.checkUser({username:req.session.s_id},(result)=>{
            res.render('index',{data:result.data});
        })
    },
    showList(req,res){
        let page = req.query.page ? req.query.page : 1;
        Student.findPageData(page,(results)=>{
            res.send(results);
        })
    },
    updateStudent(req,res){
        let sid = req.params.sid;
        let form = formidable();
        form.parse(req,(err,fields)=>{
            // console.log(fields)
            Student.updateStudent(sid,fields,(results)=>{
                // console.log(results);
                res.send(results);
            });
        })

    },
    searchStudent(req,res){
        // console.log(req.query);
        Student.findStudentNames(req.query.search,(results)=>{
            res.send(results);
        })

    },
    showAddStudent(req,res){
        Admin.checkUser({username:req.session.s_id},(result)=>{
            res.render('addStudent',{data:result.data});
        })
    },
    addStudent(req,res){
        let form = formidable();
        form.parse(req,(err,fields)=>{
            // console.log(fields)
            if(err){
                res.send({error:0,msg:'数据接收失败'});
                return;
             }
            Student.addStudent(fields,(results)=>{
                res.send(results);
            });
        })
    },
    deleteStudent(req,res){
        Student.deleteOne({sid:req.params.sid},(err)=>{
            if(err){
                res.send({error:0,msg:'删除失败'});
                return;
            }
            res.send({error:1,msg:'删除成功'});
        })
    },
    exportStudent(req,res){
       let name = req.query.name;
        Student.exportExcel(name,(data)=>{
            // console.log(data);
            res.send(data);
        });
    }
}