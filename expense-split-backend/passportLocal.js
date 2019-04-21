const mongoOperation =  require('./models/mongoOperation');
const passport = require('passport');
const bcrypt =  require('bcrypt-nodejs');
const passportlocalStrategy = require('passport-local').Strategy;

exports.local =passport.use(new passportlocalStrategy((username,password,done)=>{
            passport.serializeUser(function(user, done) {
                done(null, user.id);
            });

            passport.deserializeUser(function(username, done) {

                             mongoOperation.connect('expensesplit','users').thne((db)=>{
                                db.findOne(username)
                                    .then((err,user)=>{
                                        done(err,user)
                                    })
                            })
                            .catch(err => next(err));
            });

            mongoOperation.connect('expensesplit','users').then((db)=>{
                            db.findOne({username:username})
                            .then((err,user)=>{
                                    if(!user){
                                        return done(null,false);
                                    }
                                    else if(!bcrypt.compareSync(password,user.password)){
                                        console.log("Hello");
                                        return done(null,false);
                                    }  
                                    return done(null,user);
                            })
            })

      
        
}))