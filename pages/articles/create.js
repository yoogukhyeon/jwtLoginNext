import Header from "../../components/header"
import ArticleForm from "../../components/articles/ArticleForm"
import authAtom from "../../stores/authAtom"
import { useAtom } from "jotai"
import Cookies from 'universal-cookie';
export default function CreatePage(){
    const [auth , setAuth] = useAtom(authAtom);
    console.log("auth" , auth)
    return(
        <Header>
            {auth.user && (
                 <ArticleForm />
            )}
        </Header>
    )
}


export const getServerSideProps = async ({req ,res , resolvedUrl}) => {
    const cookies = new Cookies(req.headers.cookie);
    const token = cookies.get('cdt');
   
    if(token){
        return {
            props: {

            }
        }
    }else{
        return {
            redirect : {
                destination : '/auth/sign-in?ref=' + resolvedUrl,
                permanent : false
            }
        }
    }
}