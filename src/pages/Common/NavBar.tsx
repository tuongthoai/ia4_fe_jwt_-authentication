import {Link} from "react-router-dom";
import {useAuthStore} from "../../store/AuthStore.tsx";

interface NavProps {
    loggedIn: boolean;
}

const NavBar: React.FC<NavProps> = (props: NavProps) => {
    const loggedIn = props.loggedIn;
    const clearTokens = useAuthStore((state) => state.clearTokens); // Get clearTokens from Zustand

    const handleLogOut = () => {
        clearTokens(); // Clear tokens in Zustand
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-white text-xl font-bold">
                    21127174-Tăng Tường Thoại
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:underline">
                        Home
                    </Link>
                    {!loggedIn && (
                        <Link to="/user/login" className="text-white hover:underline">
                            Login
                        </Link>
                    )}

                    {!loggedIn && (
                        <Link to="/user/register" className="text-white hover:underline">
                            Sign Up
                        </Link>
                    )}

                    {loggedIn && (
                        <Link
                            to="/user/login"
                            className="text-white hover:underline"
                            onClick={handleLogOut}
                        >
                            Log out
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
