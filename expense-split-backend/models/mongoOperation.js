const mongoCLient =  require('mongodb').MongoClient;
module.exports = {
   mongoURL: 'mongodb://localhost:27017/expensesplit',
    connect: (dbName,collection)=>{
                return new Promise((resolve,reject)=>{

                mongoCLient.connect('mongodb://localhost:27017',{useNewUrlParser:true},(err,db)=>{

                                if(err){
                                            reject(err);
                                }
                                        else {

                                            const dbname = db.db(dbName);
                                            const collect =  dbname.collection(collection);
                                            resolve(collect);
                                        }

                })

    })
    } 
}