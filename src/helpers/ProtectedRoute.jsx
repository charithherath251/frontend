import { Route, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { isValidTocken } from './isAuthenticated';


function ProtectedRoute({ children }) {
    const isAuthenticated = isValidTocken();

    if (!isAuthenticated) {
        toast.error("You need to login first");
        return <Navigate to="/auth/login" />;
    }else{
        return children;
    }
    return children;
    return "Something went wrong";
}

export default ProtectedRoute;