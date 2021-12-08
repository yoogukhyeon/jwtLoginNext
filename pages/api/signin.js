import pool, { executeQuery } from "../../config/db"
import nc from "next-connect";
const handler = nc();
const bcrypt = require('bcrypt');
handler.post( async (req , res) => {
    let result = {}
    let statusCode 
    let msg = ""

    const {email , password} = req.body;
    console.log(email , password)
    try{
        let signIn = "";
        signIn = "select * from sample_sign_up where email = ?"
        const signInData = await executeQuery(signIn , [email])

        if(!signInData[0].email || !bcrypt.compareSync(password , signInData[0].password)){
            console.log('아이디/비밀번호가 일치하지 않습니다');
            msg = "fail";
        }else{
            console.log('아이디/비밀번호가 일치합니다.')          
            msg = "success"
        }

        result = {
            msg : msg
        }
        
        res.send(result)

    }catch(e){
        res.statusCode = 500;
        throw err
    }
})



export default handler