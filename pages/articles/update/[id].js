import Header from "../../../components/header"
import ArticleUpdate from "../../../components/articles/ArticlsUpdate"
import axios from "axios"
export default function ViewPage({id}){
    return <Header>
        <ArticleUpdate id={id }/>

    </Header>
}

export const getServerSideProps = async ({params}) => {
    //`const serverDate = await axios.get(`${process.env.API_HOST}/api/articles/articledata`)
    //`
    //`const data = serverDate.data
    //`
    //`console.log('serverDate')
    //`console.log(data);


    return {
        props : {
            id : params.id
        }
    }
}