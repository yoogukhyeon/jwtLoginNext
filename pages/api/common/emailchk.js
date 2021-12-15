import pool, { executeQuery } from "../../../config/db"
import nc from "next-connect";
const bcrypt = require('bcrypt')
const Joi = require('joi')
const handler = nc();



handler.post(async(req , res) => {
    let result = {};
    let statusCode;
    let msg = "fail";
 
    const {email} = req.body


    try{
        let emailChkSql = "";
        emailChkSql += "select mem_email from cid_n_member where mem_email = ? limit 1"
        const emailChkDate = await executeQuery(emailChkSql , [email]);
        const emailChk = emailChkDate[0]?.mem_email

        
       if(emailChk){
        result = {
            msg : 'fail'
        }
        res.send(result)
       }else{
        result = {
            msg : 'success'
        }
        res.send(result)
       }
        
    }catch(err){
        statusCode = 500;
        throw err
    }
})












export default handler