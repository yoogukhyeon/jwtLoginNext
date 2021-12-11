import {Formik} from "formik";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch"
export default function ArticleUpdate({id}){
    console.log('update id')
    console.log(id)

    const {data ,error} = useFetch(`${process.env.API_HOST}/api/articles/${id}`)
    if(error){
        return <>데이터 로드에 실패 했습니다.</>
    }
 
   const [set , setDate ] = useState([])

   useEffect(() => {
       setDate(data?.data[0])
   })
   

   const title = JSON.stringify(data?.data[0]?.title)
   console.log('123123')
   console.log(set)
    return(
        <div className="container">
            <h1 className="font-bold mb-3 text-xl">글수정</h1>

            <hr />
            <Formik 
                initialValues={{
                    title : `${title}`,
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
                            <button type="submit" className="btn btn-primary">글 올리기</button>
                        </form>
                )}
            </Formik>
        </div>
    )
}