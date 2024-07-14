import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  interface FormData {
    email?: string;
    password?: string;
  }

  const [formData, setFormData] = useState<FormData>({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    if(e.target.id === 'password'){
      setPasswordCheck(false);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.password || formData.password.length < 8) {
      setPasswordCheck(true);
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3000/api/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      console.log('Response status:', res.status); // Log response status
  
      if (res.status === 200) {
        // Handle successful login
        console.log('Login successful');
        navigate('/')
      } else {
        // Handle login failure
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
    return (
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="abc@gmail.com" className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
          <div className={`bg-white p-3 rounded-lg flex items-center ${passwordCheck ? 'border-red-500 border-2':''}`}>
          <input type={showPassword ? "text" : "password"} placeholder="password" className="bg-transparent outline-none flex-grow" id="password" onChange={handleChange}/>
          <span onClick={()=>setShowPassword(!showPassword)}>
            {showPassword ? <FaEye className="text-gray-500 cursor-pointer" /> : <FaEyeSlash className="text-gray-500 cursor-pointer" />}
          </span>
        </div>
        <div className="flex">
          <div className="flex-1">
            <Link className="font-light text-xs text-blue-500" to="/forgot-password">Forgot Password?</Link>
          </div>
          <div>
            <p className="text-sm">Don't have an account?</p>
            <Link className=" text-base text-blue-500" to="/signup">Sign Up</Link>
          </div>
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Login</button>
        </form>
      </div>
    );
  }
  export default SignIn;