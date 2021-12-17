import { useEffect, useState } from "react"
import styles from "./signup.module.css"
import moment from "moment"
import $ from 'jquery';
import { setIn } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import validateForm from "./vaildate"



let yyyy = moment().format('YYYY');
export default function SignUpForm(){
    const router = useRouter();
    const [inputs , setInputs] = useState({
        email : "",
        password : "",
        passwordChk : "",
        name : "",
        phone : "",
        gender : "",
        yyyy : "1985",
        mm : "",
        dd : "",
        agreeAll : "N",
        agree1 : "N",
        agree2 : "N"
    });
    const [emailChk , setEmailChk] = useState({
        emailChk : "",
    })
    const [errors , setErrors] = useState({});
    const [authCode , setAuthCode] = useState("")
    const [phoneAuth , setPhoneAuth] = useState({
        phoneAuthNumber : ""
    })
    const [phoneValue , setPhoneValue] = useState({
        phoneValue : ""
    })
    //phoneAuthNumber 
    const onAuthChange = (e) => {
        const {name , value} = e.target;
        const nextInputs = {
            ...phoneAuth,
            [name] : value
        }
        setPhoneAuth(nextInputs)
    }

    //input value 
    const onChange = (e) => {
        const {name , value} = e.target;
        const nextInputs = {
            ...inputs,
            [name] : value,
        }
        setInputs(nextInputs)
    }

    //성별 체크
    const onCheckGender = (e) => {
        const {name , value} = e.target;
        const nextInputs = {
            ...inputs,
            [name] : value,
        }
        setInputs(nextInputs)
    }

    //agree check 
    const onAgreeChk = (e) => {
        const {name , value} = e.target;
        if(name == 'agreeAll'){
            const nextInputs = {
                ...inputs,
                ['agreeAll'] : value,
                ['agree1'] : value,
                ['agree2'] : value,
            }
            setInputs(nextInputs)
        }else{
            const nextInputs = {
                ...inputs,
                [name] : value,
            }
            setInputs(nextInputs)
        }
    }

    const onEmailChk = (e) => {
        const {name , value} = e.target;
        const nextInputs = {
            ...emailChk,
            [name] : value
        }
        setEmailChk(nextInputs)
    }

    const onphoneChk = (e) => {
        const {name , value} = e.target;
        const nextInputs = {
            ...phoneChk,
            [name] : value
        }
        setPhoneValue(nextInputs)
    }
      /* remove char '-' */
	function removeChar(event) {
		event = event || window.event;
		var keyID = (event.which) ? event.which : event.keyCode;
		if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 )
			return;
		else
			event.target.value = event.target.value.replace(/[^0-9]/g, "");
	}
    



    const dYYYY = () => {
        let result = [];
        for(let i = 1900; yyyy >= i; i++){
            if (i == 1985) {
                result.push(<option key={i} value={i}>{i}</option>);
            }else {
                result.push(<option key={i} value={i}>{i}</option>);
            }
        }
        return result;
    }

    const dmm = () => {
        let result = [];
        for(let i = 1 ; 13 > i; i++){
            result.push(<option key={i} value={i}>{i}</option>)
        }

        return result;
    };


    const ddd = () => {
        let result = [];
        for(let i = 1 ; 32 > i; i++){
            result.push(<option key={i} value={i}>{i}</option>)
        }
        return result;
    };
         
    useEffect(()=>{
        if(inputs.agree2 == 'Y' && inputs.agree1 == 'Y'){
            const newAgree = {
                ...inputs,
                ['agreeAll'] : 'Y'
            }
            setInputs(newAgree);
        }else{
            const newAgree = {
                ...inputs,
                ['agreeAll'] : 'N'
            }
            setInputs(newAgree);
        }
    }, [inputs.agree1,inputs.agree2])

   
    const validateKeyUp = () => {
        setErrors(validateForm(inputs))
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(!inputs.email){
            alert("이메일을 입력해주세요.")
            return false
        }

        if(!inputs.password){
            alert("비밀번호를 입력해주세요.")
            return false
        }

        if(!inputs.name){
            alert("이름을 입력해주세요.")
            return false
        }

        if(!inputs.phone){
            alert("핸드폰번호을 입력해주세요.")
            return false
        }

        if(!inputs.gender){
            alert("성별을 선택해주세요.")
            return false
        }
        if(!inputs.mm || !inputs.dd){
            alert("생년월일을 선택해주세요.")
            return false
        }

        if(inputs.agreeAll === "N" || inputs.agree1 === 'N' || inputs.agree2 === "N"){
            alert('이용약관에 동의해주세요.')
            return false
        }

        if(!emailChk){
            alert('이메일 중복체크를 해주세요.')
            return false
        }

        if(emailChk == "N"){
            alert('중복된 이메일입니다 중복체크를 해주세요.')
            return false
        }

        if(phoneValue == "N"){
            alert('휴대폰 인증을 해주세요.')
            return false
        }

       axios.post(`/api/user/signup` , inputs)
            .then(res => {
                if(res.data.msg === "success"){  
                    router.push('/auth/sign-in')
                }
            }).catch(err => {
                console.error(err)
            })
    };

    const emailDataChk = (email , value , e) => {
        e.preventDefault();

        axios({
            method : "POST",
            url: `/api/user/emailchk`,
            data:{
                email
            }
        }).then(res => {
            let text = ""
            if(res.data.msg === "success"){
                 value = "Y"
                setEmailChk(value)
            }
            if(res.data.msg === "fail"){
               value = "N"
               setEmailChk(value)
            }
            setErrors(validateForm(inputs , value))
        }).catch(err => {
            console.error(err)
        })

    }


   
    const phoneChk = (phone , e) => {
        e.preventDefault();
        console.log(phone)
        if(!phone){
            alert("핸드폰 번호를 입력해주세요.")
            return false
        }
        
        axios({
            method : "POST",
            url : `/api/user/phonechk`,
            data : {
                phone
            }
        }).then(res => {
            console.log('res' , res)
            if(res.data.msg === "success"){
                const code = res.data.code
                setAuthCode(code)
            }
            if(res.data.msg === "fail"){
                if(confirm("이미 가입한 번호입니다. 아이디 찾기 페이지로 이동하시겠습니까?")){
                    router.push('/')
                }
            }
        }).catch(err => {
            console.error(err)
        })
    }

    
    const phoneDataChk = (auth , phoneValue , e) => {
        e.preventDefault();
        if(authCode == auth){
            phoneValue = 'Y';
            setPhoneValue(phoneValue)
            alert('인증을 완료하셨습니다.')
        }else{
            phoneValue = 'N';
            setPhoneValue(phoneValue)
            alert('인증을 실패하셨습니다.')
        }
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>회원가입</h1>
            <form className={styles.form} onSubmit={handleFormSubmit}>
            <div className={styles.mb}>
                <label htmlFor="email" className={styles.label}>이메일*</label>
                <div className={styles.formWrap}>
                    <input type="email" name="email" id="email" className={styles.input} placeholder="이메일을 입력해주세요." onChange={onChange} onKeyUp={validateKeyUp} />
                    <button type="button" 
                            className={styles.btn}
                            onClick={(e) => {emailDataChk(inputs.email, emailChk.emailChk  , e)}}
                    >중복체크</button>
                    <input type="hidden" name="emailChk" value="Y" onChange={onEmailChk} />
                                                   
                </div>
                {errors.email && <div className={styles.error}>{errors.email}</div>
                 && emailChk == "Y" ? (<div className={styles.infor}>{errors.email}</div>) : (
                    (<div className={styles.error}>{errors.email}</div>)
                 )
                }
            </div>
            <div className={styles.mb}>
                <label htmlFor="password" className={styles.label}>비밀번호*</label>
                <div className={styles.formWrap}>
                    <input type="password" name="password" id="password" className={styles.inputNo} placeholder="비밀번호를 입력해주세요." onChange={onChange} onKeyUp={validateKeyUp} />
                </div>
                {errors.password &&  <div className={styles.error}>{errors.password}</div>}
            </div>
            <div className={styles.mb}>
                <label htmlFor="passwordChk" className={styles.label}>비밀번호확인*</label>
                <div className={styles.formWrap}>
                    <input type="password" name="passwordChk" id="passwordChk" className={styles.inputNo} placeholder="비밀번호를 확인해주세요." onChange={onChange} onKeyUp={validateKeyUp} />
                </div>
                {errors.passwordChk &&  <div className={styles.error}>{errors.passwordChk}</div>}
            </div>
            <div className={styles.mb}>
                <label htmlFor="name" className={styles.label}>이름*</label>
                <div className={styles.formWrap}>
                    <input type="text" name="name" id="name" className={styles.inputNo} placeholder="이름을 입력해주세요." onChange={onChange} onKeyUp={validateKeyUp} />
                </div>
                {errors.name &&  <div className={styles.error}>{errors.name}</div>}
            </div>
            <div className={styles.mb}>
                <label htmlFor="phone" className={styles.label}>핸드폰번호*</label>
                <div className={styles.formWrap}>
                    <input type="text" name="phone" id="phone" className={styles.input} placeholder="핸드폰번호를 입력해주세요." onChange={onChange}  onKeyPress={removeChar} onKeyUp={validateKeyUp} maxLength="11"  />
                    <button type="button"  className={styles.btn} onClick={(e) => {phoneChk(inputs.phone , e)}}  >인증번호</button>
                </div>
                {errors.phone &&  <div className={styles.error}>{errors.phone}</div>}
            </div>
            <div className={styles.mb}>
                <div className={styles.formWrap}>
                    <input type="text" name="phoneAuthNumber" className={styles.input} onChange={onAuthChange} onKeyPress={removeChar} maxLength="12" />
                    <input type="hidden" name="phoneValue" value="Y" onChange={onphoneChk} />
                    <button type="button" className={styles.btn} onClick={(e) => {phoneDataChk(phoneAuth.phoneAuthNumber , phoneChk.phoneChk , e )}}>인증확인</button>
                </div>
            
            </div>
            <div className={styles.mb}>
                <label htmlFor="gender" className={styles.label}>성별*</label>
                <div className={styles.formRadio}>
                <label><input type="radio" name="gender" value="M" onChange={onCheckGender} checked={inputs.gender == 'M' ? true : false}/> 남자</label>
                <label><input type="radio" name="gender" value="W" onChange={onCheckGender} checked={inputs.gender == 'W' ? true : false}/> 여자</label>
                </div>
                {errors.gender &&  <div className={styles.error}>{errors.gender}</div>}
            </div>
            <div className={styles.mb}>
            <label htmlFor="" className={styles.label}>생년월일*</label>
                <div className={styles.selectWrap}>
                <div >
                <label htmlFor="yyyy">년</label>
                    <select id="yyyy" name="yyyy" defaultValue={1985} className={styles.selectbox} onChange={onChange}>
                        {dYYYY()}
                    </select>
                </div>
                <div >
                <label htmlFor="mm">월</label>
                    <select id="mm" name="mm" className={styles.selectbox} onChange={onChange}>
                        {dmm()}
                    </select>
                </div>
                <div >
                <label htmlFor="dd">달</label>
                    <select id="dd" name="dd" className={styles.selectbox} onChange={onChange}>
                        {ddd()}
                    </select>
                </div>
                </div>
            </div>  
            <div className={styles.mb}>
                <label htmlFor="" className={styles.label}>약관동의*</label>
                <div>
                    <label className={styles.agree}><input type="checkbox" name="agreeAll" id="agreeAll" value={inputs.agreeAll == 'Y' ? 'N' : 'Y'} onChange={onAgreeChk} checked={inputs.agreeAll == 'Y' ? true : false}/>   전체 동의</label>
                </div>
                <div>
                    <label className={styles.agree}><input type="checkbox" name="agree1" id="agree1" value={inputs.agree1 == 'Y' ? 'N' : 'Y'} onChange={onAgreeChk}  checked={inputs.agree1 == 'Y' || inputs.agreeAll == 'Y' ? true : false}/>   이용약관(필수)</label>
                </div>
                <div>
                    <label className={styles.agree}><input type="checkbox" name="agree2" id="agree2"  value={inputs.agree2 == 'Y' ? 'N' : 'Y'} onChange={onAgreeChk}  checked={inputs.agree2 == 'Y' || inputs.agreeAll == 'Y' ? true : false}/>  개인정보 처리방침(필수)</label>
                </div>
            </div>
            <button type="submit" className={styles.btnSubmit}>
                가입하기
             </button>

            </form>
        </div>
    )
}