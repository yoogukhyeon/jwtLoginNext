import pool, { executeQuery } from "../../../config/db"
import nc from "next-connect";
const bcrypt = require('bcrypt')
const Joi = require('joi')
const handler = nc();
const qs = require('qs')
const axios = require('axios')


handler.post(async(req , res) => {
    let result = {};
    let statusCode;
    let msg = "fail";
 
    const {phone} = req.body

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
            console.log('핸드폰 인증 로직 시작')
            //인증 번호 임의 숫자
            let code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

            var formData = {
                key: '81dcnkti0wiougnzck6n1cxmbgbf3jrz',
                user_id: 'cidermics',
                sender: '02-2088-5754',
                receiver: '010-2059-5897',
                msg: '[사이다경제] ' + code + ' 입력하시면 인증이 완료됩니다.'
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
            result = {
                code : code,
                statusCode : 200,
                msg : 'success'
            }
            res.send(result)                 
        }  

        }
        
    }catch(err){
        statusCode = 500;
        throw err
    }
})












export default handler