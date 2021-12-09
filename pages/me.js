import { useAtom } from "jotai"
import Header from "../components/header"
import authAtom from "../stores/authAtom"
export default function me(){
    const [auth , setAuth] = useAtom(authAtom);

    return(
        <Header>
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
        </Header>
    )
}