var express = require('express');
var userRouter = express.Router();
const mongoClient =  require('mongodb').MongoClient;
const mongoOperations =  require('../models/mongoOperation');

const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const passportLocal =  require('../passportLocal');
const authenticate = require('../auth');
/* GET users listing. */

userRouter.route('/login',passport.authenticate('local'))
      .get((req,res,next)=>{
            res.send("Operation not supported");
      })
      .post((req,res,next)=>{
            mongoOperations.connect('expensesplit','users').then((db)=>{
                                var token =authenticate.getToken({_id:req.body.username});
                                req.statusCode = 200;
                                res.json({token:token,status:true});
                  })
                  .catch((err)=> next(err))
              
      })

userRouter.route('/signup')
      .get((req,res,next)=>{
            res.send("Operation not supported");
      })
      .post((req,res,next)=>{       

            mongoOperations.connect('expensesplit','users').then((db)=>{

                                          if(!req.body.usersname && !req.body.password && !req.body.name){
                                                
                                                const error = new Error("Please Provide Both Username or Password!");
                                                next(error);
                                          }
                                          else{
                                          
                                                const user ={
                                                      username:req.body.username,
                                                      name:req.body.name,
                                                      password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8),null)
                                                }
                                                db.findOne({username:req.body.username})
                                                .then((result)=>{
                                                            if(result){
                                                                  const err = new Error("User already exist"); 
                                                                  next(err);
                                                            }
                                                            else{
                                                                  db.insertOne(user)
                                                                  .then((result)=>{
                                                                        res.json({status:true})
                                                                  })
                                                            }
                                                })
                                                .catch(err => next(err));
                                          }
            })
            .catch(err => next(err))
      })

module.exports = userRouter;
