'use strict';
var fs = require('fs');

const myMERN_module = {
    create : function (name, res){
        fs.writeFile(name ,"",  function (err) {
            if (err){
                res.json({
                    message: "Create "+name+" : KO"
                })
            }else{
                res.json({
                    message: "Create "+name+" : OK"
                })
            };
        });
    },

    read : function (name, res){
        fs.readFile(name, 'utf8',(err, data) => {
            if (err) {
                res.json({
                    message: "Read "+name+" : KO "
                })
            }else{
                res.json({
                    message: data
                })
            }
        });
    },

    update : function (name, content, res){
        fs.truncate(name, () => {});
        fs.writeFile(name, content, function (err) {
            if (err){
                res.json({
                    message: "Update "+name+" : KO"
                })
            }else{
                res.json({
                    message: "Update "+name+" : OK"
                })
            };
        });
    },

    delete : function (name, res){
        fs.unlink(name, (err => {
                if (err){
                    res.json({
                        message:"Delete "+name+" : KO"
                    })
                } else {
                    res.json({
                        message:"Delete "+name+" : OK"
                    })
                }
            }));
    }
}


module.exports=myMERN_module;