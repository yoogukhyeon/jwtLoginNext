import { useAtom } from "jotai"
import Header from "../components/header"
import authAtom from "../stores/authAtom"
import Cookies from 'universal-cookie';
export default function Me(){
    const [auth , setAuth] = useAtom(authAtom);

    return(
        <Header>
            {auth.user ? (
                <>
            <div>
                <dl>
                   <dt>이메일</dt>
                   <dd>{auth.user?.email}</dd>
                   <dt>이름</dt>
                   <dd>{auth.user?.name}</dd>
                   <dt>가입일자</dt>
                   <dd>{auth.user?.regDate}</dd>
                </dl>
            </div>
                </>
            ) : (
                <>로그인 해주세요</>
            )}
         
        </Header>
    )
}


export const getServerSideProps = async ({req , res , resolvedUrl}) => {
    const cookies = new Cookies(req.headers.cookie)
    console.log('cookies')
    console.log(cookies)
    const token = cookies.get('cdt');
    console.log(token)
    if(token){
        return {
            props: {

            }
        }
    }else{
        return {
            redirect :{
                destination : '/auth/sign-in?ref=' + resolvedUrl,
                permanent : false
            }
           

        }
    }

}






