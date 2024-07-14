import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const ForgotPassword = () => {
  interface FormData {
    email?: string;
    password?: string;
    confirmPassword?: string;
  }

  const [formData, setFormData] = useState<FormData>({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [showField, setShowField] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    if (e.target.id === 'password' || e.target.id === 'confirmPassword') {
      setPasswordCheck(false);
    }
    if (e.target.id === 'confirmPassword') {
      setPasswordsMatch(e.target.value === formData.password);
    }
    if (e.target.id === 'password') {
      setPasswordValid(validatePassword(e.target.value));
      setPasswordsMatch(e.target.value === formData['confirmPassword']);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.password) {
      try {
        const res = await fetch('/api/forgotPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (res.status === 400) return alert('User Not Found');
        else if (res.status === 200) setShowField(true);
      }
      catch (error) {
        console.error('Error during fetch:', error);
      }
    }
    else {
      if(passwordValid === false) return alert('Invalid Password');
      else if (passwordsMatch === false) return alert('Passwords do not match');
      else {
      try{
        const res = await fetch('/api/forgotPassword', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)  
          });
        if(res.status === 200){
          console.log('Password changed successfully');
          alert('Password changed successfully');
          navigate('/signin');
        }
        else{
          console.log('Password change failed');
          alert('Password change failed');
        }

      }catch(err){
        console.error('Error during fetch:', err);
      }}
    }
  }
  const password = () => {
    return (
      <div className="flex flex-col gap-4">
        <div className={`bg-white p-3 rounded-lg flex items-center ${passwordCheck ? 'border-red-500 border-2' : ''}`}>
        <input type={showPassword ? "text" : "password"} placeholder="New Password" className="bg-transparent outline-none flex-grow" id="password" onChange={handleChange} />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEye className="text-gray-500 cursor-pointer" /> : <FaEyeSlash className="text-gray-500 cursor-pointer" />}
          </span>
        </div>
        <div className={`bg-white p-3 rounded-lg flex items-center ${!passwordsMatch ? 'border-red-500 border-2':''}`}>
        <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" className="outline-none flex-grow" id="confirmPassword" onChange={handleChange} />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEye className="text-gray-500 cursor-pointer" /> : <FaEyeSlash className="text-gray-500 cursor-pointer" />}
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Forgot Password</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="email" placeholder="abc@gmail.com" className="border p-3 rounded-lg" id="email" onChange={handleChange} />
        {showField ? password() : null}

        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">Submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword;