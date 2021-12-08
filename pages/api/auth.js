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

        // 첫번쨰 방식
        /* if(authToken){
            const token = authToken.split('Bearer ')[1];
            console.log(token);
            
        }*/

        // 두번쨰 방식
        if(authToken.startsWith('Bearer ')){
            const token = authToken.split(' ')[1];
            
            jwt.verify(token , jwtSecretKey , async (err , decoded) => {
                if(err){
                    console.error(err)
                }else{
                    console.log(decoded)
                    const email = decoded.email;
                    console.log(email);

                    let tokenSql = ""
                    tokenSql += "select no , name , email , "
                    tokenSql += "date_format(reg_date , '%Y-%m-%d') as regDate "
                    tokenSql += "from sample_sign_up where email = ? and token = ? "
            
                    let siupUpData = await executeQuery(tokenSql , [email , token]);

                    console.log(siupUpData)

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