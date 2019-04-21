const passport = require('passport');
const mongoOpe = require('./models/mongoOperation');
const jwt = require('jsonwebtoken');
const jwtStrategy =  require('passport-jwt').Strategy;
const extractJwt =  require('passport-jwt').ExtractJwt;
var config ={};
 config.secretKey="1234567890-1234567890";
 
exports.getToken =  (user)=>{
            return   jwt.sign(user,config.secretKey,{
                expiresIn:3600
            });
}

opts= {}
opts.jwtFromRequest =  extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.authenticat = passport.use(new jwtStrategy(opts,(jwt_payload,done) => {
            console.log("HELLO JWT",jwt_payload);
            mongoOpe.connect('expensesplit','users').then((db)=>{
                            db.findOne({username:jwt_payload._id})
                            .then((user,err)=>{
                                console.log(err,user);
                                    if(!user){
                                            done(err,false);
                                    }
                                    else if(user){
                                            done(null,user);
                                        }
                                    else{
                                            done(null,false)
                                    }
                            })
                                .catch((err) => console.log(err))
            })
           

}));

exports.verifyUSer = passport.authenticate('jwt',{session:false});