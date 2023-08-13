const Validation = (values)=>{
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    // const password_pattern = /^(?==.*d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/ ;

    if(values.email === "") {
        error.email = "Should Not be Empty";
    }
    else if(!email_pattern.test(values.email)){
        error.email ="Wrong email pattern";
    }
    else
        error.email = ""
    if(values.password === ""){
        error.password = "Password Should Not be Empty";
    }
    // else if(!password_pattern.test(values.password)){
    //     error.password = "Password didnt 'match";
    // }
    else{
        error.password = ""
    }
    return error;
}

export default Validation;