import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  interface FormData {
    username?: string;
    email?: string;
    password?: string;
  }
  const [formData, setFormData] = useState<FormData>({});
  const [emailValid, setEmailValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const validateEmail = (email:string) =>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  const handleChange = (e: any) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value
  })
  if (e.target.id === 'cnf-password') {
    setPasswordsMatch(e.target.value === formData.password);
  }
  if(e.target.id === 'email'){
    setEmailValid(validateEmail(e.target.value));
  }
}

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Name" className="border p-3 rounded-lg" id="username" onChange={handleChange}/>
        <input type="email" placeholder="email@gmail.com" className={`border outline-none p-3 rounded-lg ${!emailValid ? 'border-red-500' : ''}`} id="email" onChange={handleChange} />
        <div className="bg-white p-3 rounded-lg flex items-center">
          <input type={showPassword ? "text" : "password"} placeholder="password" className="bg-transparent outline-none flex-grow" id="password" onChange={handleChange} />
          <span onClick={()=>setShowPassword(!showPassword)}>
            {showPassword ? <FaEye className="text-gray-500 cursor-pointer" /> : <FaEyeSlash className="text-gray-500 cursor-pointer" />}
          </span>
        </div>
        <div className={`bg-white p-3 rounded-lg flex items-center ${!passwordsMatch ? 'border-red-500 border-2':''}`}>
          <input type={showPassword ? "text" : "password"} placeholder="confirm password" className="outline-none flex-grow" id="cnf-password" onChange={handleChange} />
          <span onClick={()=>setShowPassword(!showPassword)}>
            {showPassword ? <FaEye className="text-gray-500 cursor-pointer" /> : <FaEyeSlash className="text-gray-500 cursor-pointer" />}
          </span>
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign up</button>
      </form>
      <div className="mt-5">
        <p>Have an account?</p>
        <Link to="/signin" className="text-blue-500">Login</Link>
      </div>
    </div>
  )
}

export default SignUp;