import { Formik } from "formik"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import Cookies from 'universal-cookie';
import Header from '../../components/header'
import { useAtom } from "jotai";
import authAtom from "../../stores/authAtom";
const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export default function SignIn(){
    const router = useRouter();
    const [auth , setAuth] = useAtom(authAtom);
    return(
        <Header>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    
                    
                    <Formik
                        initialValues={{
                            email : '',
                            password : ''
                        }}
                        validate={values => {
                            const errors = {}
                            if(!emailRegExp.test(values.email)){
                                errors.email = "정확한 형식의 이메일을 입력해주세요."
                            }
                            if(!values.email){
                                errors.email = "이메일을 입력해주세요."
                            }
                            if(!values.password){
                                errors.password = "비밀번호를 입력해주세요."
                            }

                            return errors
                        }}
                        onSubmit={(values , {setSubmitting}) => {
                            console.log(values)
                            axios.post(`${process.env.API_HOST}/api/signin` , values)
                                 .then(res => {
                           
                                   
                                    if(res.data.msg === "success"){
                                        alert('로그인 성공')
                                        //받아온 토큰값 쿠키 값으로
                                        
                                        const token = res.data.data.token;
                                        const cookies = new Cookies();
                                        cookies.set('cdt', token, {path: '/'})
                                        
                                        //setAuth(auth => ({...auth , token}))
                                        axios(process.env.API_HOST + '/api/auth', {
                                            'method' : 'get',
                                            'headers' : {
                                              'Authorization' : `Bearer ${token}`
                                            }            
                                          }).then(res => setAuth(auth => ({...auth , token:token, user : res.data.data})))
                                          .catch(err => {
                                              console.error(err)
                                          }).finally(() => setAuth(auth => ({...auth , loaded : true})))
                                        router.push(router.query.ref ?? '/')
                                    }
                                    if(res.data.msg === "fail"){
                                        alert('회원정보가 없습니다.')
                                        router.reload()
                                    }
                                 }).catch(err => {
                                     console.warn(err)
                                     alert(err.res?.data?.message ?? err.message ?? '서버와 통신에 실패했습니다.')
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
                            isSubmitting,
                        }) => {
                            return  <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="text-xl py-2">이메일</label>
                                <input 
                                    type="email"
                                    className="block border border-grey-light w-full p-3 rounded mb-2 outline-none"
                                    id="email"
                                    name="email"
                                    placeholder="email" 
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                            
                                />
                                <p className="text-danger pl-2 mb-3">{errors.email && touched.email && errors.email}</p>
                            </div>

                            <div>
                                <label htmlFor="password" className="text-xl py-2">비밀번호</label>
                                <input 
                                    type="password"
                                    className="block border border-grey-light w-full p-3 rounded mb-2 outline-none"
                                    id="password"
                                    name="password"
                                    placeholder="password" 
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className="text-danger pl-2 mb-3">{errors.password && touched.password && errors.password}</p>
                            </div>
                            <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-black text-white hover:bg-black-dark focus:outline-none my-1"
                            >{isSubmitting ? '로그인중' : '로그인'}</button>
                        </form>
                        }}
                    </Formik>
                  
                </div>

                <div className="text-grey-dark mt-6 mb-6">
                    계정이 없으신가요?  
                    <Link href="/auth/sign-up">
                    <a className="no-underline border-b border-blue text-blue">
                        회원가입
                    </a>
                    </Link>
                </div>
            </div>
        </div>
        </Header>   
    )
}