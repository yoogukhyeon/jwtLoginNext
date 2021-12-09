import {atom} from "jotai";


//상태생성 
const authAtom = atom({
    loaded: false,
    token: null,
    user: null
})

export default authAtom;