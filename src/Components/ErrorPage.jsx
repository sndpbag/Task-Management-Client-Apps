 
import { Link } from "react-router-dom";
import notFoundImage from "./../assets/notFound.jpg";
const ErrorPage = () => {

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-300 to-blue-600">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[90%] max-w-md text-center">
            <img src={notFoundImage} className="w-full h-64 object-cover" alt="Page Not Found" />
            <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800">Oops! Page Not Found</h1>
                <p className="text-gray-600 mt-2">
                    The page you're looking for doesn't exist or was moved.
                </p>
                <Link to="/" className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                    Go Home
                </Link>
            </div>
        </div>
    </div>
    );
};

export default ErrorPage;