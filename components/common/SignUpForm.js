import moment from "moment"
import { useEffect, useState } from "react";
import {Formik,Field} from "formik"
import $ from 'jquery';
import axios from "axios";
import { useRouter } from "next/router";

const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const passRegExp =  /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+={}]).*$/;
const spaceRegExp =  /\s/g;
const nameRegExp =  /[`~!=.,@#$%^&*|\\\'\";:\/?]/gi
const nameNumberRegExp = /[0-9]+/g
let yyyy = moment().format('YYYY');
var yyyyHtml = '';
var mmHtml = '';
var ddHtml = '';


export default function SignUpForm(){
    const router = useRouter()
    const [data , setDate] = useState('');
    useEffect(() => {
        for(let i = 1900; yyyy >= i; i++){
            yyyyHtml += '<option value="' + i + '">' + i + '</option>';
            if (i == 1985) {
                yyyyHtml += '<option value="' + i + '" selected>' + i + '</option>';
            }
        }
        
        for (var i = 1; 13 > i; i++) {
            mmHtml += '<option value="' + i + '">' + i + '</option>';
        }
        
        for (var i = 1; 32 > i; i++) {
            ddHtml += '<option value="' + i + '">' + i + '</option>';
        }


        const y = document.getElementById('yyyy')
        const m = document.getElementById('mm')
        const d = document.getElementById('dd')
        y.innerHTML = yyyyHtml
        m.innerHTML = mmHtml
        d.innerHTML = ddHtml
    }, [])


    const emailChk = (email , emailValue  , e) => {
        e.preventDefault();
      
        console.log('emailValue' , emailValue)
        axios({
            method:"POST",
            url: `${process.env.API_HOST}/api/common/emailchk`,
            data:{
                email
            }
            })
             .then(res => {
                 let text = ""
                 if(res.data.msg === "success"){
                     text = "?????? ????????? ????????? ?????????."
                     const eee = emailValue = "Y"
                     setDate(eee)
                    
                 }
                 if(res.data.msg === "fail"){
                    text = "?????? ????????? ??????????????????."
                    const sss = emailValue = "N"
                    setDate(sss)
               
                 }
                 $('.email-text-error').text(text)
             }).catch(err => {
                 console.log(err)
             })
    }

    const phoneChk = (phone , e) => {
        e.preventDefault();
        console.log('phone', phone)

        axios({
            method : "POST",
            url: `${process.env.API_HOST}/api/common/phonechk`,
            data : {
                phone
            }
        }).then(res => {
            console.log('res' , res)
        }).catch(err => {
            console.error(err)
        })
    }

    return(
        <div className="container">
             <h1 className="font-bold mb-3 text-xl">?????? & ??????</h1>
            <hr />
            <div className="bg-grey-lighter min-h-screen flex flex-col mt-3">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">????????????</h1>

                    <Formik
                        initialValues={{
                            email : "",
                            emailValue : "",
                            password :  "",
                            passwordChk : "",
                            name : "",
                            phone : "",
                            gender : "",
                            yyyy : "1985",
                            mm : "",
                            dd : "",
                            agreeAll : "N",
                            agree1 : "N",
                            agree2 : "N"
                        }}

                        validate = {values => {
                             const errors = {}
                             if(!values.email){
                                 errors.email = "???????????? ??????????????????."
                             }else if(!emailRegExp.test(values.email)){
                                 errors.email = "???????????? ?????? ????????????????????????."
                             }else if(spaceRegExp.test(values.email)){
                                 errors.email = "???????????? ????????? ???????????? ????????????."
                             }
                         

                            if(!values.password){
                                 errors.password = "??????????????? ??????????????????."
                             }else if(!passRegExp.test(values.password)){
                                 errors.password = "??????????????? ?????????, ??????, ???????????? ????????? ???????????? ?????????."
                             }else if(values.password.length < 9){
                                 errors.password = "??????????????? 8??? ?????? ??????????????????."
                             }
                            if(values.password != values.passwordChk){
                                 errors.passwordChk = "??????????????? ?????? ???????????????."
                             }
                            if(!values.name){
                                 errors.name = "????????? ??????????????????."
                             }else if(spaceRegExp.test(values.name)){
                                 errors.name = "????????? ????????? ???????????? ????????????."
                             }else if(nameRegExp.test(values.name)){
                                 errors.name = "??????????????? ??????????????? ????????????."
                             }else if(nameNumberRegExp.test(values.name)){
                                 errors.name = "????????? ???????????? ????????????."
                             }
                             if(!values.phone){
                                 errors.phone = "??????????????? ????????? ??????????????????."
                             }else if(values.phone.length > 12){
                                 errors.phone = "????????? ?????????????????? ??????????????????."
                             }

                           
                            
                            const agreeAll = document.getElementById('agreeAll')
                            const agree1 = document.getElementById('agree1')
                            const agree2 = document.getElementById('agree2')
                            
                            agreeAll.addEventListener("click" , () => {
                                if($(agreeAll).prop('checked' , true)){
                                    $(agree1).prop("checked" , true)
                                    $(agree2).prop("checked" , true)
                                    values.agreeAll = "Y"
                                    values.agree1 = "Y"
                                    values.agree2 = "Y"
                                   
                                    
                                }else{
                                    $(agree1).prop("checked" , false)
                                    $(agree2).prop("checked" , false)
                                    values.agreeAll = "N"
                                    values.agree1 = "N"
                                    values.agree2 = "N"
                                }
                            })
                            return errors;
                          
                        }}
                        onSubmit = {values => {
                        	if(!values.gender){
                                alert('????????? ??????????????????.')
                                return false
                            }
                            if(!values.mm || !values.dd){
                                alert('??????????????? ??????????????????.')
                                return false
                            }
                            if(values.agree1 === "N" || values.agree1.length === 0 ){
                                alert('??????????????? ??????????????????.')
                                return false
                            }
                            if(values.agree2 === "N" || values.agree2.length === 0){
                                alert('???????????? ??????????????? ??????????????????.')
                                return false
                            }

                            if(data === 'N'){
                                alert('????????? ??????????????? ????????????.')
                                return false
                            }

                         
                            console.log('values' , values)
                            
                            axios.post(`${process.env.API_HOST}/api/common/signup` , values)
                                 .then(res => {
                                     console.log("res :::::::" , res);
                                     router.push('/')
                                 }).catch(err => {
                                     console.error(err)
                                 })
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-0 ">
                                        <label htmlFor="email" className="text-sm py-2">?????????*</label>
                                        <span className="input-group-prepend flex flex-row">
                                            <input 
                                            type="email"
                                            className="block border border-grey-light w-13 p-3 rounded mb-4"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="?????????" />
                                            <button className="btn btn-info block border border-grey-light w-13 p-3 rounded mb-4 text-white font-bold" 
                                                    type="button"
                                                    onClick={(e) => {emailChk(values.email , values.emailValue   , e)}}
                                                    >????????????</button>                                          
                                           

                                            <Field   
                                                    type="hidden" 
                                                    id="emailValue"
                                                    name="emailValue" 
                                                    value={values.emailValue}
                                                    onChange={handleChange}
                                            
                                                    />
                                        </span>  
                                            <div className="text-danger w-full">{errors.email && touched.email && errors.email}</div>  
                                            <div className="email-text-error text-info w-full"></div> 
                                    </div>
                
                                    <div className="input-group mb-0 ">
                                        <label htmlFor="password" className="text-sm py-2">????????????*</label>
                                        <input 
                                            type="password"
                                            className="block border border-grey-light w-full p-3 rounded mb-4"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="password" />    

                                            <div className="text-danger w-full">{errors.password && touched.password && errors.password}</div>  
                                            
                                    </div>
                
                                    <div className="input-group mb-0 ">
                                        <label htmlFor="passwordChk" className="text-sm py-2">??????????????????*</label>
                                        <input 
                                            type="password"
                                            className="block border border-grey-light w-full p-3 rounded mb-4"
                                            name="passwordChk"
                                            value={values.passwordChk}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="passwordChk" />   
                                            <div className="text-danger w-full">{errors.passwordChk && touched.passwordChk && errors.passwordChk}</div>      
                                    </div>
                                    <div className="input-group mb-0 ">
                                        <label htmlFor="name" className="text-sm py-2">??????*</label>
                                        <input 
                                            type="name"
                                            className="block border border-grey-light w-full p-3 rounded mb-4"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="????????? ??????????????????." />  
                                        <div className="text-danger w-full">{errors.name && touched.name && errors.name}</div>     
                                    </div>
                                    <div className="input-group mb-0 ">
                                        <label htmlFor="phone" className="text-sm py-2">???????????????*</label>
                                        <span className="input-group-prepend flex flex-row">
                                           
                                            <input 
                                            type="text"
                                            className="block border border-grey-light w-13 p-3 rounded mb-4"
                                            id="phone"
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}  
                                            placeholder="-?????? ????????? ??????." />
                
                                            <button className="btn btn-info block border border-grey-light w-13 p-3 rounded mb-4 text-white font-bold" 
                                                    type="button"
                                                    onClick={(e) => {phoneChk(values.phone , e)}}        
                                            >????????????</button>
                                            
                                        
                                            </span>    
                                            <div className="text-danger w-full">{errors.phone && touched.phone && errors.phone}</div> 
                
                                            <span className="input-group-prepend flex flex-row">
                                           
                                            <input 
                                            type="text"
                                            className="block border border-grey-light w-13 p-3 rounded mb-4"
                                            name="phoneChk"
                                            placeholder="????????????" />
                                             <input type="hidden" name="phoneChk" value="N" />
                                            <button className="btn btn-info block border border-grey-light w-13 p-3 rounded mb-4 text-white font-bold" type="button">????????????</button>
                                            </span>       
                                    </div>
                
                
                                    <div className="input-group mb-0 flex flex-col">
                                            <label className="control-label text-lg-left pt-2">??????*</label>
                                                         
                
                                            <span className="input-group-prepend  ">
                                                <div className="btn bg-slate-600 block border border-grey-light w-13 p-3 rounded mb-4 text-white font-bold" data-toggle="buttons">
                                                    <label className="btn gen-btn">
                                                            ???
                                                        <Field type="radio" name="gender" value="M" />
                                                    </label>
                                                    <label className="btn gen-btn">
                                                        ???
                                                        <Field type="radio" name="gender" value="W" />
                                                    </label>
                                                </div>  
                                             </span>   
                                             
                                    </div>
                
                                    
                                <div className="input-group mb-0 flex flex-col">                
                                <label className="control-label text-lg-left pt-2">????????????*</label>
                                <div className="flex flex-wrap -mx-3 mb-2">
                                
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="yyyy">
                                    yyyy
                                </label>
                                <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 pl-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="yyyy" 
                                        name="yyyy"
                                        value={values.yyyy}
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                        >
                                    
                
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="mm">
                                    mm
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 pl-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                            id="mm" 
                                            name="mm"
                                            value={values.mm}
                                            onChange={handleChange}
                                            onBlur={handleBlur} 
                                            >
                
                
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dd">
                                    dd
                                </label>
                                <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 pl-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="dd" 
                                        name="dd"
                                        value={values.dd}
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                        >
                                    
                
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                                                        

                       

                                    <div className="flex justify-center mt-3 mb-5">
                                        <div className="w-full ">
                                            <div className="form-check">
                                            <label className="form-check-label inline-block w-98 text-gray-800">
                                                  
                                                    ?????? ??????
                                              <Field className="form-check-input appearance-none h-4 w-4 border border-black-300 rounded-sm  checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                                                    type="checkbox" 
                                                    id="agreeAll"
                                                    name="agreeAll" 
                                                    value="Y" 
                                                    />
                                            </label>
                                            </div>
                                            <div className="form-check">
                                            <label className="form-check-label inline-block w-98 text-gray-800">
                                                ????????????(??????)
                                            <Field className="form-check-input appearance-none h-4 w-4 border border-black-300 rounded-sm  checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                                                  type="checkbox" 
                                                  name="agree1" 
                                                  id="agree1"
                                                  value="Y"
                                                  />
                                            </label>
                                            </div>
                                            <div className="form-check">
                                            <label className="form-check-label inline-block w-98 text-gray-800">
                                                ???????????? ????????????(??????)
                                              <Field className="form-check-input appearance-none h-4 w-4 border border-black-300 rounded-sm  checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                                                    type="checkbox" 
                                                    name="agree2"
                                                    id="agree2" 
                                                    value="Y"
                                                    />
                                              </label>
                                            </div>
                                        </div>
                                    </div>
                                        <button
                                            type="submit"
                                            className="w-full text-center py-3 rounded bg-black text-white hover:bg-black-dark focus:outline-none my-1"
                                        >????????????</button>
                                </form>
                        )}


                    </Formik>

                
                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>
                </div>
            </div>
        </div>
            
        </div>
    )
}