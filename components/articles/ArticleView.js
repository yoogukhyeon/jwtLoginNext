import useFetch from "../../hooks/useFetch"

export default function ArticleView({id}){
    const {data ,error} = useFetch(`${process.env.API_HOST}/api/articles/${id}`)
    if(error){
        return <>데이터 로드에 실패 했습니다.</>
    }

    return(
        <div className="container">
            <h1 className="font-bold mb-3 text-xl">글보기</h1>
            <hr />

            <figure className="bg-gray-100 rounded-xl p-8 mt-3">
           
            <div className="pt-6 space-y-4">
                <div>
                    제목 : {data?.data[0].title}
                </div>
                <blockquote>
                <p className="text-lg">
                    내용 : {data?.data[0].content}
                </p>
                </blockquote>
                <figcaption>
                <div className="mb-1 mt-3">
                    작성자 : {data?.data[0].name}
                </div>
                <div>
                   작성일자 : {data?.data[0].regDate}
                </div>
                </figcaption>
            </div>
        </figure>
        </div>   
    )
}