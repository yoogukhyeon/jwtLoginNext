import moment from "moment"
import { useEffect } from "react";
import {Formik,Field} from "formik"
let yyyy = moment().format('YYYY');
var yyyyHtml = '';
var mmHtml = '';
var ddHtml = '';







export default function SignUpForm(){

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


    return(
        <div className="container">
             <h1 className="font-bold mb-3 text-xl">입사 & 채용</h1>
            <hr />
            <div className="bg-grey-lighter min-h-screen flex flex-col mt-3">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">회원가입</h1>

                    <Formik
                        initialValues={{
                            email : "",
                            password :  "",
                            passwordChk : "",
                            name : "",
                            email : "",
                            gender : "",
                            yyyy :"1985",
                            mm : "1",
                            dd : "1",
                            agreeAll : "",
                            agree1 : "",
                            agree2 : ""
                        }}
                        validate = {values => {
                         
                        }}
                        onSubmit = {values => {
                            if(!values.gender){
                                alert('성별을 선택해주세요.')
                                return false
                            }
                            console.log('values' , values)
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
                                        <label htmlFor="email" className="text-sm py-2">이메일*</label>
                                        <span className="input-group-prepend flex flex-row">
                                            <input 
                                            type="email"
                                            className="block border border-grey-light w-13 p-3 rounded mb-4"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="이메일" />
                
                                                <button className="btn btn-info block border border-grey-light w-13 p-3 rounded mb-4 text-white font-bold" type="button">중복확인</button>
                                            
                                                <input type="hidden" name="emailChk" value="" />
                                            </span>         
                                    </div>
                
                                    <div className="input-group mb-0 ">
                                        <label htmlFor="password" className="text-sm py-2">비밀번호*</label>
                                        <input 
                                            type="password"
                                            className="block border border-grey-light w-full p-3 rounded mb-4"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="password" />       
                                    </div>
                
                
                                    <div className="input-group mb-0 ">
                                        <label htmlFor="passwordChk" className="text-sm py-2">비밀번호확인*</label>
                                        <input 
                                            type="password"
                                            className="block border border-grey-light w-full p-3 rounded mb-4"
                                            name="passwordChk"
                                            value={values.passwordChk}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="passwordChk" />       
                                    </div>
                           
                                    <div className="input-group mb-0 ">
                                        <label htmlFor="name" className="text-sm py-2">이름*</label>
                                        <input 
                                            type="name"
                                            className="block border border-grey-light w-full p-3 rounded mb-4"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="passwordChk" />  
                                                
                                    </div>
                                     
                                    <div className="input-group mb-0 ">
                                        <label htmlFor="phone" className="text-sm py-2">핸드폰번호*</label>
                                        <span className="input-group-prepend flex flex-row">
                                           
                                            <input 
                                            type="text"
                                            className="block border border-grey-light w-13 p-3 rounded mb-4"
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}  
                                            placeholder="-없이 숫자만 입력." />
                
                                            <button className="btn btn-info block border border-grey-light w-13 p-3 rounded mb-4 text-white font-bold" type="button">인증번호</button>
                                            
                                    
                                            </span>    
                
                
                                            <span className="input-group-prepend flex flex-row">
                                           
                                            <input 
                                            type="text"
                                            className="block border border-grey-light w-13 p-3 rounded mb-4"
                                            name="phoneChk"
                                            placeholder="인증번호" />
                                            
                                            <button className="btn btn-info block border border-grey-light w-13 p-3 rounded mb-4 text-white font-bold" type="button">인증확인</button>
                                            </span>       
                                    </div>
                
                
                                    <div className="input-group mb-0 flex flex-col">
                                            <label className="control-label text-lg-left pt-2">성별*</label>
                                                         
                
                                            <span className="input-group-prepend  ">
                                                <div className="btn bg-slate-600 block border border-grey-light w-13 p-3 rounded mb-4 text-white font-bold" data-toggle="buttons">
                                                    <label className="btn gen-btn">
                                                       {/*  <input type="radio" name="gender" 
                                                            value={values.gender} 
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                        /> 남 */}
                                                            남
                                                        <Field type="radio" name="gender" value="M" />
                                                    </label>
                                                    <label className="btn gen-btn">
                                                       {/*  <input type="radio" name="gender" 
                                                                value="W"     
                                                               onChange={handleChange}
                                                               onBlur={handleBlur}            
                                                        />  */}
                                                        여
                                                        <Field type="radio" name="gender" value="W" />
                                                    </label>
                                                </div>  
                                             </span>   
                                    </div>
                
                                    
                                <div className="input-group mb-0 flex flex-col">                
                                <label className="control-label text-lg-left pt-2">생년월일*</label>
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
                                        <div>
                                            <div className="form-check">
                                            <input className="form-check-input appearance-none h-4 w-4 border border-black-300 rounded-sm  checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                                                   type="checkbox" 
                                                   value="y" 
                                                   id="agreeAll" 
                                                   name="agreeAll"
                                                   value={values.agreeAll}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}  
                                                   />
                                            <label className="form-check-label inline-block text-gray-800" htmlFor="agreeAll">
                                                전체 동의
                                            </label>
                                            </div>
                                            <div className="form-check">
                                            <input className="form-check-input appearance-none h-4 w-4 border border-black-300 rounded-sm  checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                                                   type="checkbox" 
                                                   value="y" 
                                                   name="agree1" 
                                                   id="agree1"
                                                   value={values.agree1}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur} 
                                                   />
                                            <label className="form-check-label inline-block text--800" htmlFor="agree1">
                                                이용약관(필수)
                                            </label>
                                            </div>
                                            <div className="form-check">
                                            <input className="form-check-input appearance-none h-4 w-4 border border-black-300 rounded-sm  checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                                                   type="checkbox" 
                                                   value="y" 
                                                   name="agree2" 
                                                   id="agree2"
                                                   value={values.agree2}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur} 
                                                   />
                                            <label className="form-check-label inline-block text--800" htmlFor="agree2">
                                                개인정보 처리방침(필수)
                                            </label>
                                            </div>
                                        </div>
                                    </div>
                                        <button
                                            type="submit"
                                            className="w-full text-center py-3 rounded bg-black text-white hover:bg-black-dark focus:outline-none my-1"
                                        >회원가입</button>
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