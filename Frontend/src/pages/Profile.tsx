import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { signout } from "../redux/user/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  interface FormData {
    oldEmail: string;
    email: string;
    phone: string;
    telegram: string;
    whatsapp: string;
    password: string;
    confirmPassword: string;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.user.loading);
  useEffect(() => {
    if (isLoading) {
      <Loader />;
    } else if (!user) {
      navigate("/signin");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        oldEmail: user.email,
        email: user.email,

      }));
    }
  }, [isLoading, navigate]);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const [contactUpdate, setContactUpdate] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    oldEmail: String(user?.email),
    email: String(user?.email),
    phone: String(user?.phone),
    telegram: String(user?.telegram),
    whatsapp: String(user?.whatsapp),
    password: "",
    confirmPassword: "",
  });
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordMatchCheck = () => {
    if (formData.password === formData.confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }
  const passwordValid = () => {
    const validPattern = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    const isPasswordValid = formData.password.length >= 8 && validPattern.test(formData.password);
    const isConfirmPasswordValid = formData.confirmPassword.length >= 8 && validPattern.test(formData.confirmPassword);
    if (isPasswordValid && isConfirmPasswordValid) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }
  }
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };
  const handleSignOut = () => {
    dispatch(signout());
    navigate("/signin");
  };

  const handleUpdate = async () => {
    if (!passwordUpdate && !contactUpdate) {
      try{
        const res = await fetch("http://localhost:3000/api/update-email", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        console.log("Updated Email");
        navigate("/signin");
      }
    }catch (error) {
      console.log("Error Updating Email");
    }
  }
  else if (passwordUpdate && !contactUpdate) {
    passwordMatchCheck();
    passwordValid();
    if (passwordCheck && passwordMatch) {
      try{
        const res = await fetch("http://localhost:3000/api/update-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        console.log("Updated Password");
        navigate("/signin");
      }
    }catch (error) {
      console.log("Error Updating Password");
    }
  }
    console.log(formData);
  };
  }
  function newPassword() {
    return (
      <div className="flex flex-col gap-2">
        <div className="bg-white rounded-lg flex items-center border">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="border-none p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <span onClick={() => setShowPassword(!showPassword)} className="mr-2">
            {showPassword ? (
              <FaEye className="text-gray-500 cursor-pointer" />
            ) : (
              <FaEyeSlash className="text-gray-500 cursor-pointer" />
            )}
          </span>
        </div>
        <div className="bg-white rounded-lg flex items-center border">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="border-none p-3 rounded-lg"
            id="confirmPassword"
            onChange={handleChange}
          />
          <span onClick={() => setShowPassword(!showPassword)} className="mr-2">
            {showPassword ? (
              <FaEye className="text-gray-500 cursor-pointer" />
            ) : (
              <FaEyeSlash className="text-gray-500 cursor-pointer" />
            )}
          </span>
        </div>
      </div>
    );
  }
  function contact() {
    return (
      <div className="flex flex-col gap-2">
        <div className="bg-white rounded-lg flex items-center gap-2">
        <p className="font-bold">Phone</p>
          <input
            type="number"
            placeholder="Phone Number"
            className="border p-3 rounded-lg"
            id="phone"
            onChange={handleChange}
            defaultValue={user?.phone}
          />
          
        </div>
        <div className="bg-white rounded-lg flex items-center gap-2">
        <p className="font-bold">WhatsApp</p>
          <input
            type="number"
            placeholder="WhatsApp Number"
            className="border p-3 rounded-lg"
            id="whatsapp"
            onChange={handleChange}
            defaultValue={user?.whatsapp}
          />
        </div>
        <div className="bg-white rounded-lg flex items-center gap-2">
        <p className="font-bold">Telegram</p>
          <input
            type="text"
            placeholder="telegram id"
            className="border p-3 rounded-lg"
            id="telegram"
            onChange={handleChange}
            defaultValue={user?.telegram}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="bg-white flex flex-col items-center rounded-lg my-5 p-4 shadow-md">
        <img
          src="https://i.imgur.com/t9HFQvX.png"
          alt="Profile"
          className="w-36 h-36 rounded-full border-4 border-gray-300 shadow-md mb-4"
        />
        <p className="font-medium text-lg">Welcome, {user?.name}</p>
        <div className="flex items-center gap-2 my-2">
          <p className="font-bold">Email</p>
          <input
            type="email"
            placeholder="abc@gmail.com"
            className={`border p-3 rounded-lg ${passwordUpdate ? "bg-gray-200" : ""}`}
            id="email"
            defaultValue={user?.email}
            onChange={handleChange}
            readOnly={passwordUpdate}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="border p-3 rounded-lg"
            id="updatePassword"
            onChange={() => setPasswordUpdate(!passwordUpdate)}
          />
          <p>Update Password</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="border p-3 rounded-lg"
            id="updatePassword"
            onChange={() => setContactUpdate(!contactUpdate)}
          />
          <p>Update Contact Details</p>
        </div>
        {passwordUpdate ? newPassword() : null}
        {contactUpdate ? contact() : null}
        <button
          className="bg-blue-500 text-white p-3 rounded-lg w-full mt-4"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white p-3 rounded-lg w-full mt-4"
          onClick={handleSignOut}
        >
          SignOut
        </button>
      </div>
      <div className="bg-white flex flex-col items-center rounded-lg my-5 p-4 shadow-md">
      <p className="font-medium text-lg">Actions</p>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg w-full mt-4"
          onClick={() => navigate("/create-listing")}
        >
          Create Listing
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg w-full mt-4"
          onClick={() => navigate("/show-listings")}
        >
          Show Listings
        </button>
      </div>
    </div>
  );
};
export default Profile;
