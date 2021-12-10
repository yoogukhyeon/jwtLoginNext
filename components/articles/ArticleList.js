import Link from "next/link"
export default function ArticleList({title}){
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
                                        ID
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Name
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Email
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Created_at
                                    </th>
                                  
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        1
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            Jon doe
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">jhondoe@example.com</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        2021-1-12
                                    </td>
                                
                                </tr>
                             

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