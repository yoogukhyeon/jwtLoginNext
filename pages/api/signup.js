import pool, { executeQuery } from "../../config/db"
import nc from "next-connect";
const bcrypt = require('bcrypt')
const Joi = require('joi')
const handler = nc();


handler.post( async (req, res) => {
    let result = {}
    let statusCode 
    
    console.log(req.body)
    const {name , email , password} = req.body

    let userChk = new Object();
    userChk.name = name;
    userChk.email = email;
    userChk.password = password;

    try{
        //유효성 체크 
        const schema = Joi.object({
            name : Joi.string().min(1).max(7).pattern(new RegExp(/^[가-힣a-zA-Z]+$/)).required(),
            email : Joi.string().email({minDomainSegments : 2 , tlds: true}).required(),
            password : Joi.string().pattern(new RegExp(/^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+={}]).*$/)).required()
        })

        const value = await schema.validateAsync(userChk);

        if(value.error){
            //catch error처리
        }else{
            const saltRounds = 10;
            const myPlaintextPassword = password;
            let hashPw
    
            //비밀번호 암호화
            await bcrypt.genSalt(saltRounds, async function(err, salt) {
               await bcrypt.hash(myPlaintextPassword, salt, async function(err, hash) {
                    hashPw = hash
                    console.log(hashPw)
                    let siupSql = ""
                    siupSql += "INSERT INTO cid_n_member(name , email , password) values ( ? , ? , ?)"
            
                    let siupUpData = await executeQuery(siupSql , [name , email , hashPw]);

                    result = {
                        data : siupUpData,
                        statusCode : 200
                    }
                    res.send(result)
                });
            });
        }
    }catch(err){
        statusCode = 500;
        throw err
    }  
})


export default handler