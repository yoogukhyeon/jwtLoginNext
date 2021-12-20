import pool, { executeQuery } from "../../config/db"
import nc from "next-connect";
const handler = nc();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecretKey = process.env.JWT_SECRET_KEY;


handler.post( async (req , res) => {
    let result = {}
    let statusCode 
    let msg = ""
    let data = {};
    const {email , password} = req.body;
    console.log(email , password)
    try{
        let signIn = "";
        signIn = "select * from cid_n_member where mem_email = ?"
        const signInData = await executeQuery(signIn , [email])
        const no = signInData[0].mem_no;
        
        console.log("signdata" , signInData)
        console.log("email" , signInData[0].mem_email)

        if(!signInData[0].mem_email || !bcrypt.compareSync(password , signInData[0].mem_pwd)){
            console.log('아이디/비밀번호가 일치하지 않습니다');
            msg = "fail";
        }else{
            console.log('아이디/비밀번호가 일치합니다.')          
            msg = "success"

            //로그인 성공시 토큰 생성
            let token = jwt.sign({email : email} , jwtSecretKey , {expiresIn : '10d'})
            console.log('123123' , token)
            //토큰 생성후 데이터 베이스 저장
            let signToken = "";
            signToken = "update cid_n_member set mem_token = ? where mem_email = ? and mem_no = ?"
            const signTokenData = await executeQuery(signToken , [token , email , no])
            console.log('token 데이터 삽입 성공')

            //token 값 보내주기
            data = {token : token}
        }

    

        result = {
            data : data,
            msg : msg
        }
        
        res.send(result)

    }catch(e){
        res.statusCode = 500;
        throw err
    }
})



export default handler