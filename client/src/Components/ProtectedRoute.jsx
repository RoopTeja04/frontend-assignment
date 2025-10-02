import { Navigate } from "react-router-dom";

const protectedRoute = ({ children }) => {
    if(!localStorage.getItem("token"))
        return <Navigate to="/" />
    return children
}

export default protectedRoute