const emailRegex = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
const passRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);

let Validate = {}
Validate.ValidateEmail = async(email) => 
{
  console.log('In func '+ email);
 if (emailRegex.test(email))
  {
    return (true)
  }
  else
    return (false)
}
Validate.ValidatePassword = async(password)=>{
  if(password.length < 8){
    return 'To small password(at least 8 character)';
  }
  else if(password.length>15){
    return 'To Large Password(maximum 15 characters)';
  }
  else if(passRegex.test(password)){
    return '';
  }
  else{
    return 'Password contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character';
  }
}
export default Validate;