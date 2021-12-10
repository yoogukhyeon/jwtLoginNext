import Header from "../../components/header"
import ArticleView from "../../components/articles/ArticleView"
import { useRouter } from "next/router"


export default function ViewPage({id}){

    console.log("id:::::" , id)

    return <Header>
        <ArticleView id={id}/>
    </Header>
}




export const getServerSideProps = ({params}) => {
    return {
        props : {
            id : params.id
        }
    }
}