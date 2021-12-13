import axios from "axios";
import Link from "next/link"
import {Formik} from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch"
export default function ArticleUpdate({id , article}){
    const router = useRouter();
    console.log('update id')
    console.log(id)


    console.log('article')
    console.log(article)
    return(
        <div className="container">
            <h1 className="font-bold mb-3 text-xl">글수정</h1>

            <hr />
            <Formik 
                initialValues={{
                    title : article.title,
                    content : article.content,
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
                    axios.put(`${process.env.API_HOST}/api/articles/${id}` , values)
                         .then(res => {
                            
                             if( res.data?.msg == "success"){
                                 alert('게시물 변경되었습니다.')
                                 router.back()
                             }
                         }).catch(err => {
                             console.error(err)
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
                        
                        <form onSubmit={handleSubmit} className="mt-3">
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