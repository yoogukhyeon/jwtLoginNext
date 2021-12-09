import { useAtom } from "jotai"
import authAtom from "../stores/authAtom"
import Link from "next/link"
import { useCallback } from "react"
import Cookies from 'universal-cookie';
import axios from "axios";
import { useRouter } from "next/router";
export default function Header({children}){
   const router = useRouter()
   const [auth , setAuth] = useAtom(authAtom)

    const logOut = useCallback(() => {
        const cookies = new Cookies();
        cookies.remove('cdt')
        setAuth( auth => ({...auth, token : null, user : null}))
        delete axios.defaults.headers.common.Authorization;
        router.push('/')
    }, [])

   console.log(auth)

    return(<div className="container flex flex-col">
                <header className="flex flex-row justify-between py-2">
                    <Link href="/">
                        <a className="btn btn-link -ml-4">사이다경제</a>
                    </Link>
                    <div className="flex flex-row">
                        <Link href="/">
                            <a className="btn btn-link">홈</a>
                        </Link>
                        <Link href="/me">
                                <a className="btn btn-link">내정보</a>
                        </Link>
                    
                        {!auth ? (
                            <a className="btn btn-link">로딩중...</a>
                        ) : (
                            <>
                            {auth.user ? (
                                  <button className="btn btn-danger" onClick={logOut}>로그아웃</button>
                            ) : (
                                <Link href="/auth/sign-in">
                                    <a className="btn btn-link">로그인</a>
                                </Link>
                            )}
                            </>
                        )}
                    
                                
                        {!auth.user && (
                              <Link href="/auth/sign-up">
                              <a className="btn btn-link">회원가입</a>
                            </Link>
                        )}
                      
                      
                    </div>

                </header>
            <main className="mt-5">
                {children}
            </main>
    </div>
    )
}