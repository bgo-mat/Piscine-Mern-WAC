'use strict';
var fs = require('fs');

const myMERN_module = {
    create : function (name){
        fs.writeFile(name ,"",  function (err) {
            if (err){
                console.log("Create "+name+" : KO")
            }else{
                console.log("Create "+name+" : OK")
            };
        });
    },

    read : function (name){
        fs.readFile(name, 'utf8',(err, data) => {
            if (err) {
                console.log("Read "+name+" : KO ");
                return;
            }else{
                console.log(data)
            }
        });
    },

    update : function (name, content){
        fs.truncate(name, () => {});
        fs.writeFile(name, content, function (err) {
            if (err){
                console.log("Update "+name+" : KO")
            }else{
                console.log("Update "+name+" : OK")
            };
        });
    },

    delete : function (name){
        fs.unlink(name, (err => {
                if (err){
                    console.log("Delete "+name+" : KO")
                } else {
                    console.log("Delete "+name+" : OK")
                }
            }));
    }
}


module.exports=myMERN_module;