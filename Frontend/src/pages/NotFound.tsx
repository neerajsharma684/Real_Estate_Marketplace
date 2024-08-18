import { useNavigate } from 'react-router-dom';
import deadpool from '../assets/deadpool-dance-bye-bye-bye.gif';

const NotFound = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/");
    }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          You Found a Hidden Easter Egg!
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          This page doesn’t exist, but you found it anyway! 🎉
        </p>
        <div className="mt-6">
          <img
            src={deadpool}
            alt="Dancing cat celebrating the secret page"
            className="w-64 mx-auto rounded-lg"
          />
        </div>
        <p className="text-lg text-gray-700 mt-6">
          Are you sure you’re not exploring the galaxy for fun?
        </p>
        <button
          onClick={goHome}
          className="mt-8 px-6 py-3 bg-red-500 text-white text-lg font-medium rounded-lg hover:bg-red-600 transition-all"
        >
          Let's Go Back to Reality
        </button>
      </div>
    </div>

  );
}

export default NotFound;