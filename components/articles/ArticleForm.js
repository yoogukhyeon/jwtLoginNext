import {Formik} from "formik";
import Link from "next/link"
import axios from "axios";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import authAtom from "../../stores/authAtom";
export default function ArticleForm(){
    const router = useRouter();

    const [auth , setAuth] = useAtom(authAtom)
  
    return(
        <div className="container mb-2">
            <h1 className="font-bold text-xl">글 작성하기</h1>


            <Formik 
                initialValues={{
                    no : auth.user.no,
                    title : '',
                    content : '',
                }}
                validate={values => {
                    let errors = {};
                    if(!values.title){
                        errors.title = "제목을 입력해주세요."
                    }
                    if(!values.content){
                        errors.content = "내용을 입력해주세요."
                    }
                    return errors
                }}
                onSubmit={values => {
                    console.log('values' , values);
                    axios.post(`${process.env.API_HOST}/api/articles` , values)
                         .then(res => {
                             console.log("응답 데이터")

                             if(res.data.result.msg === "success"){
                                 alert('게시물 작성 완료했습니다.')
                                router.back()
                             }

                         }).catch(err => {
                             console.error(err)
                             alert(err.res?.data?.message ?? err.message ?? '서버와 통신에 실패했습니다.')
                         })



                }}

            >
                {({values,
                   errors,
                   touched,
                   handleChange,
                   handleBlur,
                   handleSubmit,
                   isSubmitting
                }) => (
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">제목</label>
                                <input type="text" 
                                       name="title" 
                                       id="title" 
                                       className="form-control" 
                                       value={values.title} 
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                />
                                <p className="text-danger mt-2">{errors.title && touched.title && errors.title}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">내용</label>
                                <textarea type="text" 
                                          name="content" 
                                          id="content" cols='40' 
                                          rows='10' 
                                          className="form-control" 
                                          value={values.content}
                                          onChange={handleChange}
                                          onBlur={handleBlur}     
                                />
                                 <p className="text-danger mt-2">{errors.content && touched.content && errors.content}</p>
                            </div>
                            <div className="flex flex-row justify-between ">
                            <Link href="/articles">
                                <a className="btn btn-info text-white">뒤로가기</a>
                            </Link>
                            <button type="submit" className="btn btn-primary">글 올리기</button>
                            </div>
                          
                        </form>
                )}
            </Formik>

        </div>
    )
}