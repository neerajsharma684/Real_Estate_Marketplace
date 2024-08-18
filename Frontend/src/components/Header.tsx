import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header = () =>{
    const user = useSelector((state: RootState) => state.user.currentUser);
    return (
        <header className="sticky top-0 left-0 w-full bg-slate-200 shadow-md z-50">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to={"/"}>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-blue-500">Neeraj</span>
                    <span className="text-green-500">Estate</span>
                </h1>
                </Link>
                <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input type="search" placeholder="Search..." className="bg-transparent outline-none w-64 sm:w-96"/>
                    <FaSearch className="text-gray-500"/>
                </form>
                <ul className="flex gap-4">
                    <Link to={"/"}>
                        <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
                    </Link>
                    <Link to={"/about"}>
                        <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
                    </Link>
                    {user ? (
                        <Link to={"/profile"}>
                            <li className="text-slate-700">Welcome, {user.name}</li>
                        </Link>
                    ):(
                    <Link to={"/signin"}> 
                        <button className="cursor-pointer relative group overflow-hidden px-4 py-1 border-green-500">
                            <span className="font-bold text-white relative z-10 group-hover:text-green-500 duration-500">Login/Signup</span>
                            <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-x-full h-full"></span>
                            <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-x-full h-full"></span>
                            <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
                            <span className="absolute delay-300 top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
                        </button>
                    </Link>)}
                </ul>
            </div>
        </header>
    )
}

export default Header;