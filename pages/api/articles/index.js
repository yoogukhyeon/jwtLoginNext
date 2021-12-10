import pool, { executeQuery } from "../../../config/db"
import nc from "next-connect";
const handler = nc();


//데이터 넣기
handler.post( async (req , res) => {
    let result = {}
    let statusCode 
    let msg = "fail"
   
    const {no , title , content} = req.body
 
    try{
        let articleSql = ""
        articleSql += "INSERT INTO sample_article(mem_no , title , content) values (? , ? , ?)"
        let articleData = await executeQuery(articleSql , [no , title , content]);

        console.log("articleData")
        console.log(articleData)
        result = {
            msg : "success",
            statusCode : 200,
        }

        res.send({result})
    }catch(err){
        statusCode = 500;
        throw err
    }
})






export default handler