import Header from "../../../components/header"
import ArticleUpdate from "../../../components/articles/ArticlsUpdate"
export default function ViewPage({id}){
    return <Header>
        <ArticleUpdate id={id }/>

    </Header>
}


export const getServerSideProps = ({params}) => {
    return {
        props : {
            id : params.id
        }
    }
}