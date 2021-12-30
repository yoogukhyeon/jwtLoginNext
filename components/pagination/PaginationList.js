import Link from "next/link"
import axios from "axios"
import useFetch from "../../hooks/useFetch"
import { useEffect , useState } from "react"

export default function PaginationList({title}){
    const {data , error} = useFetch(`/api/signal/reportUpload?startNum=0&endNum=10`)
    
    const [currentPage , setCurrentPage] = useState(1)
    const [dataPerPage , setDataPerPage] = useState(10)
    
   console.log(data)

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
                                        날짜
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        업로드현황
                                    </th>
                                 
                                  
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {!data ? (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-2 text-lg text-gray-500 text-center">로딩중...</td>
                                    
                                    </tr>
                                ) : (
                                    data?.data?.repostList.map(pagination => (
                                    <tr key={pagination.srNo}>
                                        <td className="px-6 py-2 text-xs text-gray-500">{pagination.srNo}</td>
                                        <td className="px-6 py-2 text-xs text-gray-500">{pagination.regDate}</td>
                                        <td className="px-6 py-2 text-xs text-gray-500">{pagination.uploadReport}</td>
                             
                                    </tr>
                                    ))
                               
                                )}
                               

                        
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
         
        </div>  
    )
}