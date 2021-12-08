const {createPool} = require('mysql')

const pool = createPool({
    host : "copy1103.cjvgnltk0cex.ap-northeast-1.rds.amazonaws.com",
    user : "frank",
    password : "ss1gyk4w",
    dialect : "mysql",
    database : "cider",
})


pool.getConnection((err , conn) => {
    if(err){
        console.log('Error' , err);
    }
    console.log('connected to db now')
    conn.release();
})


const executeQuery = (query , arraParams) => {
    return new Promise((resolve , reject) => {
        try{
            pool.query(query , arraParams , (err , data) => {
                if(err){
                    console.log('error in executing the query')
                    reject(err)
                }
                resolve(data)
            })
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {executeQuery}