import {Route, Routes} from "react-router-dom";
import "./App.css";
import NotFound from "./errors/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/UserAuthen/RegisterPage";
import LoginPage from "./pages/UserAuthen/LoginPage";
import ProfilePage from "./pages/Profile/Profile";
import React from "react";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/user">
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
            </Route>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    );
};

export default App;
