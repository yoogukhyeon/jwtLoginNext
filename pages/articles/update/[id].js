import Header from "../../../components/header"
import ArticleUpdate from "../../../components/articles/ArticlsUpdate"
import axios from "axios"
export default function ViewPage({id , article}){
    return <Header>
        <ArticleUpdate id={id } article={article}/>

    </Header>
}

export const getServerSideProps = async ({params}) => {
    const {id} = params;

    const getDate = await axios.get(`${process.env.API_HOST}/api/articles/${id}`);
    const serverDate =  getDate.data?.data[0]
    return {
        props : {
            id : params.id,
            article : {
                ...serverDate
            }
        }
    }
}