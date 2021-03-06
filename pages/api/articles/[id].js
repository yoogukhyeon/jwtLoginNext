import pool, { executeQuery } from "../../../config/db"
import nc from "next-connect";
const handler = nc();


handler.get( async(req , res) => {
    const id = req.query.id;
    console.log("id" , id)
    let result = {}
    let statusCode 
    let msg = "fail"
    let data = {};

    console.log(id);

    try{

        let articleSql = "";
        articleSql += "select no , mem_no , title , content, date_format(reg_date , '%Y-%m-%d') as regDate from sample_article sa where no = ?";
        
        let articleData = await executeQuery(articleSql , [id])
        console.log("articleData" , articleData)
        result ={
            data : articleData,
            msg : "success"
        }

        res.statusCode = 200;
        res.send(result)
    }catch(err){
        res.statusCode = 500;
        throw err
    }

})



handler.delete(async (req , res) => {

        const id = req.query.id
        console.log(id)
        let result = {}
        let statusCode 
        let msg = "fail"
        let data = {};
    
        try{

            let articleSql = "";
            articleSql += "delete from sample_article where no = ?";
            
            let articleData = await executeQuery(articleSql , [id])
            
            result ={
                data : articleData,
                msg : "success"
            }
    
            res.statusCode = 200;
            res.send(result)

        }catch(err){
            res.statusCode = 500;
            throw err
        }
})


handler.put(async (req , res) => {
    const id = req.query.id;
    console.log("id" , id)
    const {title , content} = req.body
    let result = {}
    let statusCode 
    let msg = "fail"
    let data = {};

    console.log(req.body)

    try{
        let articleSql = '';
        articleSql += "update sample_article set title = ? , content = ? where no = ?";

        let articleData = await executeQuery(articleSql , [title , content , id])

        result ={
            data : articleData,
            msg : "success"
        }

        res.statusCode = 200;
        res.send(result)
    }catch(err){
        res.statusCode = 500;
        throw err
    }
})


export default handler