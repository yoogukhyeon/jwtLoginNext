import { Formik } from "formik"
import axios from "axios"
import { useRouter } from "next/router"
const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const passwordRegExp = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+={}]).*$/

export default function SignUp(){
    const router = useRouter();

    return(
        <>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>

                <Formik
                    initialValues = {{
                        name : "",
                        email : "",
                        password : "",
                    }}
                    validate={values => {
                        const errors = {};
                        if(values.name.length > 6){
                            errors.name = '7자리 내로 이름을 입력해주세요.'
                        }
                        if(!values.name){
                            errors.name = '이름은 필수 입력항목 입니다.'
                        }
                        if(!emailRegExp.test(values.email)){
                            errors.email = '이메일 형식이 올바르지 않습니다.'
                        }
                        if(!passwordRegExp.test(values.password)){
                            errors.password = '비밀번호에 특수문자를 포함해주세요.'
                        }
                        if(!values.password){
                            errors.password = '비밀번호는 필수입력 항목입니다.'
                        }

                        return errors;
                    }}
                    onSubmit={values => {
                            console.log('values' , values)

                            axios.post('http://localhost:3000/api/signup' ,values)
                                .then(res => {
                                    console.log(res)
                                    alert('회원가입을 축하드립니다.')
                                    router.push('/auth/sign-in')
                                })
                                .catch(err => {
                                    console.log(err)
                                    alert(err.res?.data?.message ?? err.message ?? '서버와 통신에 실패했습니다.')
                                })
                    }}
                >
                    {( {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        handleSubmit
                    }) => {
                        return <form onSubmit={handleSubmit}>
                                    
                    <div>
                    <label htmlFor="name" className="text-xl py-2">이름</label>
                     <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-2 outline-none"
                        name="name"
                        id="name"
                        placeholder="Full Name" 
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        <p className="text-danger pl-2">{errors.name && touched.name && errors.name}</p>
                    </div>
                    <div>
                    <label htmlFor="email" className="text-xl py-2">이메일</label>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-2 outline-none"
                        id="email"
                        name="email"
                        placeholder="Email" 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        </div>
                        <p className="text-danger pl-2">{errors.email && touched.email && errors.email}</p>
                    <div>
                    <label htmlFor="password" className="text-xl py-2">비밀번호</label>
                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-2 outline-none"
                        id="password"
                        name="password"
                        placeholder="Password" 
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    <p className="text-danger pl-2 mb-3">{errors.password && touched.password && errors.password}</p>
                      </div>
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-black text-white hover:bg-black-dark focus:outline-none my-1"
                    >회원가입</button>
                    </form>
                    }}
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

                <div className="text-grey-dark mt-6 mb-6">
                    이미 회원가입을 하셨나요?  
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                         로그인
                    </a>
                </div>
            </div>
        </div>
        </>      
    )
}