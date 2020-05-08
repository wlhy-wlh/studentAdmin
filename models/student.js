const mongoose = require('mongoose'),
      fs = require('fs'),
      path = require('path'),
      nodeXlsx = require('node-xlsx');

mongoose.set('useFindAndModify', false);

// 1.声明schema
let StudentSchema = new mongoose.Schema({
   sid : Number, // 学生的学号
   name : String , // 名字
   sex: String , // 性别
   age : Number // 年龄
});

StudentSchema.statics = {
   findPageData:async function(page,cb){
      let pageSize = 4;
      let start = (page -1) * pageSize;
      let count = await this.find().countDocuments();
      this.find({}).skip(start).limit(pageSize).exec((err,res)=>{
         if(err){
            cb({error:0});
            return;
         }
         cb({
            error:1,
            data:res,
            count
         });
      })
   },
   updateStudent(sid,data,cb){
      this.findOneAndUpdate({sid},{$set:data},(err)=>{
         if(err){
            cb({'error':0,msg:'修改失败'});
            return;
         }
         cb({'error':1,msg:'修改成功'})
      })
   },
   findStudentNames(search,cb){
      let reg = new RegExp(search,'g');
      // let reg = eval(`/${search}/g`);
      this.find(
         {name:reg},
         // {name:{$regex:reg,$options:'$g'}},
         (err,res)=>{
         if(err){
            cb({error:0,data:null});
            return;
         }
         cb({error:1,data:res});
      })
   },
   exportExcel(name,cb){
      this.find({},(err,results)=>{
         if(err){
            cb({error:0,msg:'数据读取失败'});
            return;
         }
         var datas = []; // 存储excel表的格式
         var col = ['_id','sid','name','sex','age']; // 列
         
         datas.push(col);
         // 内容
         results.forEach((item)=>{
            var arrInner = [];
            arrInner.push(item._id);
            arrInner.push(item.sid);
            arrInner.push(item.name);
            arrInner.push(item.sex);
            arrInner.push(item.age);
            datas.push(arrInner);
         })
         // 把数据转换为 二进制的excel
         var buffer = nodeXlsx.build([
            {name:'1902',data:datas} // name 为 sheet名 data为数据  可以导多个sheet
         ]);
         let urlLib = path.join(__dirname,'../');
         // console.log(urlLib);
         fs.writeFile(`${urlLib}/public/excel/${name}.xlsx`,buffer,{flag:'w'},(er)=>{
            if(err){
               cb({error:0,msg:'excel导出失败'});
               return;
            }
            cb({error:1,msg:`excel/${name}.xlsx`});
         })
      })
   },
   addStudent(data,cb){
      this.find({},{sid:1}).sort({sid:-1}).limit(1).exec((err,results)=>{
         // console.log(results.sid);
         if(err){
            cb({error:0,msg:'保存失败'});
            return;
         }
         let sid = results.length>0? Number(results[0]['sid'])+1 : 10001;
         new Student({
            ...data,
            sid,
         }).save(err=>{
            if(err){
               cb({error:0,msg:'保存失败'});
               return;
            }
            cb({error:1,msg:'保存成功'});
         })
      })
   }
}
// 初始化Student类
var Student = mongoose.model('Student',StudentSchema);

// 导出
module.exports = Student;