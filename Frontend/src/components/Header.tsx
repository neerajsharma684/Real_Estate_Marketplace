import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () =>{
    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to={"/"}>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-blue-500">Neeraj</span>
                    <span className="text-green-500">Estate</span>
                </h1>
                </Link>
                <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input type="search" placeholder="Search..." className="bg-transparent outline-none w-24 sm:w-64"/>
                    <FaSearch className="text-gray-500"/>
                </form>
                <ul className="flex gap-4">
                    <Link to={"/"}>
                        <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
                    </Link>
                    <Link to={"/about"}>
                        <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
                    </Link>
                    <Link to={"/signin"}>
                        <li className="text-slate-700 hover:underline">Sign In</li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header;