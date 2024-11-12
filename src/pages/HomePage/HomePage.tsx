import NavBar from "../Common/NavBar";
import {useAuthStore} from "../../store/AuthStore.tsx";
import {Link} from "react-router-dom";

const HomePage: React.FC = () => {
    // const accessToken = localStorage.getItem("accessToken");

    const accessToken = useAuthStore((state) => state.accessToken);
    return (
        <>
            <NavBar loggedIn={!!accessToken}/>
            <div className="px-8 py-16 text-center">
                {/* Welcome Section */}
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to User Registration Page!
                </h1>
                <p className="text-gray-600 mb-8">
                    This is a product of student 21127174 - Tăng Tường Thoại
                </p>

                {/* Profile Button for Logged-In Users */}
                {accessToken && (
                    <div className="mb-8">
                        <Link to="/profile">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                View Profile
                            </button>
                        </Link>
                    </div>
                )}

                {/* Features Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Our Key Features</h2>
                    <div className="flex justify-center space-x-8">
                        <div>
                            <h3 className="text-xl font-semibold">Feature 1</h3>
                            <p className="text-gray-500">
                                Description of the first feature goes here.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Feature 2</h3>
                            <p className="text-gray-500">
                                Description of the second feature goes here.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Feature 3</h3>
                            <p className="text-gray-500">
                                Description of the third feature goes here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
