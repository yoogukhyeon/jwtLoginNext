   //유효성 체크 

const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const passRegExp =  /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+={}]).*$/;
const spaceRegExp =  /\s/g;
const nameRegExp =  /[`~!=.,@#$%^&*|\\\'\";:\/?]/gi
const nameNumberRegExp = /[0-9]+/g

const validateForm = (values , email ) => {

    let errors = {}
    if(!values.email){
        errors.email = "이메일을 입력해주세요."
    }else if(!emailRegExp.test(values.email)){
        errors.email = "유효하지 않은 이메일주소입니다."
    }else if(spaceRegExp.test(values.email)){
        errors.email = "이메일에 공백이 포함되어 있습니다."
    }

    if(!values.password){
        errors.password = "비밀번호를 입력해주세요."
    }else if(!passRegExp.test(values.password)){
        errors.password = "비밀번호는 영문자, 숫자, 특수문자 조합을 입력해야 합니다."
    }else if(values.password.length < 9){
        errors.password = "비밀번호는 8자 이상 입력해주세요."
    }

    if(values.password != values.passwordChk){
        errors.passwordChk = "비밀번호를 다시 확인하세요."
    }

    if(!values.name){
        errors.name = "이름을 입력해주세요."
    }else if(spaceRegExp.test(values.name)){
        errors.name = "이름에 공백이 포함되어 있습니다."
    }else if(nameRegExp.test(values.name)){
        errors.name = "특수문자를 사용하실수 없습니다."
    }else if(nameNumberRegExp.test(values.name)){
        errors.name = "숫자를 사용할수 없습니다."
    }

    if(!values.phone){
        errors.phone = "휴대폰번호를 입력해주세요."
    }else if(values.phone.length > 12){
        errors.phone = "정확한 휴대폰번호를 입력해주세요."
    }

    if(email === "N"){
        errors.email = "이미 가입된 이메일입니다."
    }
    if(email === "Y"){
        errors.email = "사용 가능한 이메일 입니다."
    }

    return errors 
};

export default validateForm