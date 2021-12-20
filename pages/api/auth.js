
import pool, { executeQuery } from "../../config/db"
import nc from "next-connect";
const handler = nc();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

handler.get( async (req , res) => {
    let result = {}
    let statusCode 
    let msg = ""
    let data = {};
    
    try{
        //받아온 토큰값 
        const authToken = req.headers.authorization;
       
        console.log("authToken" , authToken)
        // 첫번쨰 방식
        /* if(authToken){
            const token = authToken.split('Bearer ')[1];
            console.log(token);
            
        }*/
        // 두번쨰 방식
        if(authToken.startsWith('Bearer ')){
            const token = authToken.split(' ')[1];
            console.log(`token : ${token}`);
            if(token == undefined){
                result = {
                    msg : 'fail',
                }

                res.statusCode = 400;
                res.send(result)
            }
            jwt.verify(token , jwtSecretKey , async (err , decoded) => {
                if(err){
                    console.error(err)
                }else{
                    const email = decoded.email;

                    let tokenSql = ""
                    tokenSql += "select mem_no , mem_name , mem_email , "
                    tokenSql += "date_format(reg_date , '%Y-%m-%d') as regDate "
                    tokenSql += "from cid_n_member where mem_email = ? and mem_token = ? limit 1"
            
                    let siupUpData = await executeQuery(tokenSql , [email , token]);
                    siupUpData = siupUpData[0]
                    result = {
                        data : siupUpData,
                        msg : 'success',
                        token : token
                    }

                    res.statusCode = 200;
                    res.send(result)
                }
            })
        }
        
    }catch(e){
        res.statusCode = 500;
        throw err
    }
})



export default handler