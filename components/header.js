import { useAtom } from "jotai"
import authAtom from "../stores/authAtom"
import Link from "next/link"
export default function Header({children}){
   const [auth , setAuth] = useAtom(authAtom)

    return(<div className="container flex flex-col">
                <header className="flex flex-row justify-between py-2">
                    <Link href="/">
                        <a className="btn btn-link -ml-4">사이다경제</a>
                    </Link>
                    <div className="flex flex-row">
                        <Link href="/">
                            <a className="btn btn-link">홈</a>
                        </Link>

                        {!auth.loaded ? (
                            <a className="btn btn-link">로딩중...</a>
                        ) : (
                            <>
                            {auth.user ? (
                                <Link href="/me">
                                  <a className="btn btn-link">내정보</a>
                                </Link>
                            ) : (
                                <Link href="/auth/sign-in">
                                    <a className="btn btn-link">로그인</a>
                                </Link>
                            )}
                            </>
                        )}

                    

                      
                      
                    </div>

                </header>
            <main className="mt-5">
                {children}
            </main>
    </div>
    )
}