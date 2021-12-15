import pool, { executeQuery } from "../../../config/db"
import nc from "next-connect";
const bcrypt = require('bcrypt')
const Joi = require('joi')
const handler = nc();



handler.post(async(req , res) => {
    let result = {};
    let statusCode;
    let msg = "fail";
 
    const {phone} = req.body

    console.log(phone)
    try{
        let phoneChksql = "";
        phoneChksql += "select mem_phone from cid_n_member where mem_phone = ? limit 1"
        const phoneChkData = await executeQuery(phoneChksql , [phone]);
        const phoneChk = phoneChkData[0]?.mem_phone
        
        if(phoneChk){
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