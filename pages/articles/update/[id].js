import Header from "../../../components/header"
import ArticleUpdate from "../../../components/articles/ArticlsUpdate"
import axios from "axios"
import Cookies from 'universal-cookie';

export default function ViewPage({id , article}){
  
    return <Header>
        <ArticleUpdate id={id } article={article}/>

    </Header>
}

export const getServerSideProps = async ({params , req , res , resolvedUrl}) => {
    const {id} = params;
    console.log("id" , id)
    const cookies = new Cookies(req.headers.cookie);
    const token = cookies.get('cdt');
    const getDate = await axios.get(`http://localhost:4000/api/articles/${id}`);
    console.log("getDate" , getDate)
    const serverDate =  getDate.data?.data[0]
    console.log("serverDate" , serverDate)
    if(token){
        return {
            props : {
                id : params.id,
                article : {
                    ...serverDate
                }
            }
        }
    }else{
        return{
            redirect : {
                destination : '/auth/sign-in?ref=' + resolvedUrl,
                permanent : false
            }
        }
    }
}