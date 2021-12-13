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
    const cookies = new Cookies(req.headers.cookie);
    console.log('cookies :::::::::::::::' , cookies);
    const token = cookies.get('cdt');
    console.log('token ::::::::::::' , token)
    const getDate = await axios.get(`${process.env.API_HOST}/api/articles/${id}`);
    const serverDate =  getDate.data?.data[0]

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