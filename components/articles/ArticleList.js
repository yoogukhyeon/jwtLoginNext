import Link from "next/link"
import axios from "axios"
import useFetch from "../../hooks/useFetch"





export default function ArticleList({title}){
    const {data , error} = useFetch(`${process.env.API_HOST}/api/articles/articledata`)
    if(error){
        return <>데이터를 불러올 수 없습니다.</>
    }



    
 
    return(
        <div className="container">
            <h1>{title}</h1>

        
        <div className=" flex-row  justify-center mx-auto my-5">
            <div className="flex flex-col">
                <div className="w-full">
                    <div className="border-b border-gray-200 shadow">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        회원 ID
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        이름
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        제목
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        내용
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        등록날짜
                                    </th>
                                  
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                               

                            
                            {data?.data.map(article => (
                                 
                                 <tr className="whitespace-nowrap" key={article.no} >
                                   <td className="px-6 py-4 text-sm text-gray-500">
                                       {article.mem_no}
                                   </td>
                                   <td className="px-6 py-4">
                                       <div className="text-sm text-gray-900">
                                       {article.name}
                                       </div>
                                   </td>
                                   <td className="px-6 py-4">
                                       <div className="text-sm text-gray-900">
                                       {article.title}
                                       </div>
                                   </td>
                                   <td className="px-6 py-4">
                                       
                                       <div className="text-sm text-gray-900">
                                       <Link href="/">
                                       <a>{article.content}</a> 
                                       </Link>
                                       </div>
                                   </td>
                                   <td className="px-6 py-4">
                                       <div className="text-sm text-gray-900">
                                       {article.regDate}
                                       </div>
                                   </td>
                               </tr>
                            
                             ))} 


                              
                             

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


           
        </div>


        
        
        
        
        
        
        
        
        
        
        
            <div className="justify-end">
            <Link href="/articles/create">
                <a className="btn btn-primary">글 작성</a>
            </Link>
            </div>
        </div>
    )
}