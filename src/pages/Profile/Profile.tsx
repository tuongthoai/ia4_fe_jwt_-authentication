import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import NavBar from "../Common/NavBar";
import {useAuthStore} from "../../store/AuthStore";
import {fetchUserProfile} from "../../services/AuthService";

type UserProfile = {
    username: string;
    name: string;
    lastname: string;
    address: string;
    // Add other fields you expect in the profile response
};

const ProfilePage: React.FC = () => {
    const accessToken = useAuthStore.getState().accessToken;
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            setError("You must be logged in to view your profile.");
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const profileData = await fetchUserProfile();
                setUserProfile(profileData);
            } catch (error: any) {
                setError("Invalid or expired token. Please log in again.");
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) {
        navigate("/login")
    }

    return (
        <>
            <NavBar loggedIn={!!accessToken}/>
            <div className="container mx-auto mt-10">
                <h1 className="text-2xl font-bold text-center">Welcome, {userProfile?.username}!</h1>
                <div className="mt-4 text-center">
                    <p><strong>Full Name:</strong> {userProfile?.name} {userProfile?.lastname}</p>
                    <p><strong>Address:</strong> {userProfile?.address}</p>
                    {/* Render other fields as needed */}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
