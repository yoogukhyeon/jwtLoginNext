import { Formik } from "formik"
import axios from "axios"
import { useAtom } from "jotai"
import authAtom from "../../stores/authAtom"
import { useRouter } from "next/router"
const nameRegExp = /^[가-힣\s]+$/
const phoneExp = /^[0-9]+$/
export default function PrtnerView(){
    const router = useRouter()
    return(
        <div className="container">
            <h1 className="font-bold mb-3 text-xl">입사 & 채용</h1>
            <hr />

            <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-4"
    >
      <div
        className="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
          mt-3
        "
      >
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
           입사 & 채용 
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          문의를 남겨 주세요.
        </div>

        <div className="mt-10">

            <Formik
                initialValues={{
                    
                    name : "",
                    phone : "",
                    sort : "",
                    content : ""
                }}
                validate={values => {
                    const errors = {}
                
                    if(!values.name){
                        errors.name = "이름을 입력해주세요."
                    }else if(!nameRegExp.test(values.name)){
                        values.name = " "
                        errors.name = "한글이름만 입력가능 합니다."
                    }

                    if(!values.phone){
                        errors.phone = "핸드폰 번호를 입력해주세요.";
                    }else if(values.phone.length >= 12){
                        values.phone = " "
                        errors.phone = "12자리 이하로 핸드번 번호를 입력해주세요.";
                        
                    }else if(!phoneExp.test(values.phone)){
                        errors.phone = "숫자만 입력가능 합니다.";
                    }

                    if(!values.sort){
                        errors.sort = "문의 유형을 선택해주세요.";
                    }

                    if(!values.content){
                        errors.content = "내용을 입력해주세요."
                    }
                   
                    return errors;
                }}
                onSubmit={values => {
                    axios.post(`${process.env.API_HOST}/api/partner/partnerInsert` , values)
                         .then(res => {
                            if(res.data === "success"){
                                alert('문의내용 접수를 완료했습니다.')
                                router.reload()
                            }

                            if(res.data === "fail"){
                                alert('문의정보를 정확히 입력해주세요.')
                                return false
                            }
                           
                         }).catch(err => {
                             console.error(err)
                         })
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                }) => (
                             <form onSubmit={handleSubmit}> 
                             <div className="flex flex-col mb-3">
                               <label
                                 htmlFor="name"
                                 className="mb-1 text-xs tracking-wide text-gray-600"
                                 >이름:</label
                               >
                               <div className="relative">
                                 <div
                                   className="
                                     inline-flex
                                     items-center
                                     justify-center
                                     absolute
                                     left-0
                                     top-0
                                     h-full
                                     w-10
                                     text-gray-400
                                   "
                                 >
                                   <i className="fas fa-user text-blue-500"></i>
                                 </div>
                 
                                 <input
                                   id="name"
                                   type="text"
                                   name="name"
                                   className="
                                     text-sm
                                     placeholder-gray-500
                                     pl-10
                                     pr-4
                                     rounded-2xl
                                     border border-gray-400
                                     w-full
                                     py-2
                                     focus:outline-none focus:border-blue-400
                                   "
                                   value={values.name}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   placeholder="이름을 입력해주세요."
                                 />
                               </div>
                                    <p className="text-danger mt-2">{errors.name && touched.name && errors.name}</p>
                             </div>
                             <div className="flex flex-col mb-3">
                               <label
                                 htmlFor="phone"
                                 className="mb-1 text-xs tracking-wide text-gray-600"
                                 >연락처:</label
                               >
                               <div className="relative">
                                 <div
                                   className="
                                     inline-flex
                                     items-center
                                     justify-center
                                     absolute
                                     left-0
                                     top-0
                                     h-full
                                     w-10
                                     text-gray-400
                                   "
                                 >
                                   <i className="fas fa-phone text-blue-500"></i>
                                 </div>
                 
                                 <input
                                   id="phone"
                                   type="text"
                                   name="phone"
                                   className="
                                     text-sm
                                     placeholder-gray-500
                                     pl-10
                                     pr-4
                                     rounded-2xl
                                     border border-gray-400
                                     w-full
                                     py-2
                                     focus:outline-none focus:border-blue-400
                                   "
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                   placeholder="핸드폰 번호를 입력해주세요."
                                 />
                               </div>
                               <p className="text-danger mt-2">{errors.phone && touched.phone && errors.phone}</p>
                             </div>
                             <div className="relative">
                             <div className="flex flex-col mb-3">
                               <label
                                 htmlFor="password"
                                 className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                                 >입사 유형 선택:</label
                               >
                               <div className="relative">
                                 <select className="block appearance-none w-full border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded-2xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                                     name="sort"
                                     value={values.sort}
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                 >   
                                     <option>유형을 선택해주세요</option>
                                     <option value="join">입사</option>
                                     <option value="partner">제휴</option>
                                     <option value="private">개인문의</option>
                                 </select>
                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                 </div>
                                 
                             </div>
                             
                             <p className="text-danger mt-2">{errors.sort && touched.sort && errors.sort}</p>
                             </div>
                            
                             </div>
                             <div className="relative">
                             <div className="flex flex-col mb-3">
                             <label htmlFor="content" className="form-label inline-block mb-2 text-gray-700">내용:</label
                                 >
                                 <textarea
                                 className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-2xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                 id="content"
                                 rows="5"
                                 placeholder="내용을 입력해주세요."
                                 name="content"
                                 value={values.content}
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 />
                 
                                <p className="text-danger mt-2">{errors.content && touched.content && errors.content}</p>
                             </div>
                 
                             <div className="flex w-full">
                               <button
                                 type="submit"
                                 className=" flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                               >
                                 <span className="mr-2 uppercase">등록하기</span>
                                 <span>
                                   <svg
                                     className="h-6 w-6"
                                     fill="none"
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                     strokeWidth="2"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor"
                                   >
                                     <path
                                       d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                     />
                                   </svg>
                                 </span>
                               </button>
                             </div>
                             </div>
                           </form>
                )}


            </Formik>

        </div>
      </div>
  
    </div>
        </div>
    )
}