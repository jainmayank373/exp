
const  express = require('express');
const expenseRouter = express.Router()
const authenticate =  require('../auth');
const mongoOperations =  require('../models/mongoOperation');
var  path = require('path');
const upload =  require('../uploadFile');

expenseRouter.route('/')
.get(authenticate.verifyUSer,(req,res,next)=>{

                mongoOperations.connect('expensesplit','expense') 
                .then((db)=>{
                           db.find({user_id:req.user._id}).toArray((err,doc)=>{
                               console.log(doc[0]);
                               res.json(doc);
                              
                           })
                })
})
.post(authenticate.verifyUSer,(req,res,next)=>{
                    
                    mongoOperations.connect('expensesplit','expense') 
                    .then((db)=>{
                            req.body.user_id = req.user._id;
                           
                           
                            db.insert(req.body)
                            .then((result)=>{
                                    res.json({status:true});
                            })
                            .catch(err => next(err));
                    })
                    .catch(err => next(err));

});

expenseRouter.route('/upload')
.post(authenticate.verifyUSer,upload.single('file'),(req,res,next)=>{
                    
                    mongoOperations.connect('expensesplit','expense') 
                    .then((db)=>{
                            req.body.user_id = req.user._id;
                            var newPath =path.join(__dirname,"../");
                             console.log(newPath+req.file.path);
                             var  p =  newPath + req.file.path;
                            req.body.filePath = newPath +  req.file.path;
                           
                            db.insert(req.body)
                            .then((result)=>{
                                    res.json({status:true});
                            })
                            .catch(err => next(err));
                    })
                    .catch(err => next(err));


});


expenseRouter.route('/getFile')
.get((req,res,next)=>{
                             res.sendFile(req.query.namefile);
})


expenseRouter.route('/search')
.get(authenticate.verifyUSer,(req,res,next)=>{

                     console.log(req.params,req.param,req.query);
                     mongoOperations.connect('expensesplit','expense')
                     .then((db)=>{
                            db.find({name:req.query.name}).toArray((err,doc)=>{
                                    console.log(err,doc);
                                    if(doc){
                                        res.json(doc);
                                    }
                                    else{
                                        next(err);
                                    }
                            })
                            
                            
                     })
                     .catch(err =>  next(err))



})
module.exports = expenseRouter;