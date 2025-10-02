import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="flex justify-between p-4 bg-gray-800 text-white">
            <Link to="/dashboard" className="font-bold text-lg">MERN App</Link>
            <div className="flex gap-4">
                {!token ? (
                    <>
                        <Link to="/">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                            Logout  
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar