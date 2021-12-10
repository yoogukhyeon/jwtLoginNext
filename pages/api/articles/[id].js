import pool, { executeQuery } from "../../../config/db"
import nc from "next-connect";
const handler = nc();


handler.get( async(req , res) => {
    const id = req.query.id;
    let result = {}
    let statusCode 
    let msg = "fail"
    let data = {};

    console.log(id);

    try{

        let articleSql = "";
        articleSql += "select no , mem_no , title , content, (select name from sample_sign_up as ssu where ssu.no = sa.mem_no ) as name , date_format(reg_date , '%Y-%m-%d') as regDate from sample_article sa where no = ?";
        
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





export default handler