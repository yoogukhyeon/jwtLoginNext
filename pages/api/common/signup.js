import pool, { executeQuery } from "../../../config/db"
import nc from "next-connect";
const bcrypt = require('bcrypt')
const Joi = require('joi')
const handler = nc();



handler.post(async(req , res) => {
    let result = {};
    let statusCode;
    let msg = "fail";
    const email = req.body.email;
    const password = req.body.password;
    const passwordChk = req.body.passwordChk;
    const name = req.body.name;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const agree1 = req.body.agree1;
    const agree2 = req.body.agree2;
    let yyyy = req.body.yyyy;
    let mm = req.body.mm;
    let dd = req.body.dd;
    mm = mm >= 10 ? mm : '0' + mm;
    dd = dd >= 10 ? dd : '0' + dd;
    const birth = yyyy + mm + dd;

    let userChk = new Object();
    userChk.email = email;
    userChk.password = password;
    userChk.passwordChk = passwordChk;
    userChk.name = name;
    userChk.phone = phone;
    userChk.gender = gender;
    userChk.birth = birth;
 


    try{

        const schema = Joi.object({
            email : Joi.string().email({minDomainSegments: 2, tlds: true}),
            password : Joi.string().pattern(new RegExp(/^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+={}]).*$/)),
            passwordChk : Joi.ref('password'),
            name : Joi.string().pattern(new RegExp(/^[가-힣]{2,4}|[a-zA-Z]{2,12}/)),
            phone: Joi.string().min(1).max(11).pattern(new RegExp(/^[0-9]+$/)),
            gender: Joi.string().valid('W', 'M').required(),
            birth : Joi.string().max(8).pattern(new RegExp(/^[0-9]+$/))
        });

        const value = await schema.validateAsync(userChk);
        console.log('value' , value)

        if(value.error){
            //catch 넘어감
        }else{
            var saltRounds = 10;
            var myPlaintextPassword = password;
            var hashPw;

            //비밀번호 암호화 
            await bcrypt.genSalt(saltRounds , async (err , salt) => {
                await bcrypt.hash(myPlaintextPassword , salt , async (err , hash) => {
                    hashPw = hash
                    console.log("hashPw" , hashPw)

                    let signUpSql = ""
                    signUpSql += "INSERT INTO cid_n_member(mem_email, mem_pwd , mem_name, mem_nick_name , mem_phone , mem_birth , mem_gender , mem_agree1 , mem_agree2 ) "
                    signUpSql += "values (? , ? , ? , ? , ? , ? , ? , ? , ? ) ";

                    const signUpData = await executeQuery(signUpSql , [email , hashPw , name , name , phone , birth , gender , agree1 , agree2 ]);

                    result = {
                        statusCode : 200,
                        msg : "success",
                    }

                    res.send(result)
                })
            })

        }

    }catch(err){
        statusCode = 500;
        throw err
    }
})












export default handler