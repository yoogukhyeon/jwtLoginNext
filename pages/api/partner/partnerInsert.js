import pool, { executeQuery } from "../../../config/db"
import nc from "next-connect";
const qs = require('qs')
const moment = require('moment')
const Joi = require('joi')
const handler = nc();
const axios = require('axios')
handler.post(async(req , res) => {
    let {name , phone , sort , content} = req.body

    let result = {}
    let statusCode 
    let msg = "fail"

    let userChk = new Object();
    userChk.name = name;
    userChk.phone = phone;
    userChk.sort = sort;
    userChk.content = content

    try{
        const schema = Joi.object({
            name : Joi.string().pattern(new RegExp(/^[가-힣]{2,4}|[a-zA-Z]{2,12}/)).required(),
            phone : Joi.string().min(1).max(12).pattern(new RegExp(/^[0-9]+$/)).required(),
            sort : Joi.string().valid('join' , 'partner' , 'private').required(),
            content : Joi.string().required(),
        })

        const value = await schema.validateAsync(userChk)

        if(value.error){
            console.error('validate 테스트 통과 실패')
            //error catch 넘어감
        } else{
             console.log('validate 테스트 통과')
        let partnerSql = ""

        partnerSql += "insert into sample_partner(sp_name , sp_phone , sp_sort , sp_text) "
        partnerSql += "values "
        partnerSql += "( ? , ? , ? , ?)"
        let partnerData = await executeQuery(partnerSql , [name , phone , sort , content]);

        if(partnerData){

            console.log('문자고 로직 시작')

             let date = moment();
             date = date.format("YYYY-MM-DD")

              if(sort === "join"){
                  sort = "입사"
              }else if(sort === "partner"){
                sort = "제휴"
              }else if(sort === "private"){
                sort = "개인문의"
              }
              
              //문자 메세지 내용만들기
              let snsMsg = '';
              snsMsg += "Sample Project \n"
              snsMsg += `이름 : ${name} \n`
              snsMsg += `번호 : ${phone} \n`
              snsMsg += `유형 : ${sort} \n`
              snsMsg += `내용 : ${content} \n`
              snsMsg += `날짜 : ${date}`
              
             // axios 옵션 설정
             var formData = {
                key: '81dcnkti0wiougnzck6n1cxmbgbf3jrz',
                user_id: 'cidermics',
                sender: '02-2088-5754',
                receiver: '010-2059-5897',
                msg: snsMsg,
            };

           //비동기로 axios로 알림고api 보내기
           const doRequest = async function (){
            return new Promise( (resolve , reject) => {
              //axios 옵션 설정
              const options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    data: qs.stringify(formData),
                    url : 'https://apis.aligo.in/send/',
                };

                //axios 옵션값 실어서 데이터 파싱 성공이면 resolve(true) 실패면 reject()
                axios(options).then((res) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                })
            })
        } 
            

        let sendResult = await doRequest();
        sendResult = JSON.parse(sendResult);
     
        //최종 데이터 값 처리 
        console.log(JSON.stringify(sendResult));
        let resultCode = sendResult?.result_code;

        if(resultCode < 0){
            statusCode = 500;
            msg = sendResult.message
        }else {
            statusCode = 200
            msg = 'success' 
            res.send(msg)                   
        }  
        }
    }

    }catch(err){
        statusCode = 500;
        msg = 'fail' 
        res.send(msg)   
    }
})





export default handler
