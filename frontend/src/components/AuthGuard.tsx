// AuthGuard.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
    isAuthenticated: boolean| undefined;
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ isAuthenticated, children }) => {
    if (isAuthenticated === undefined){
        return null;
    }
    else if (isAuthenticated) {
        return <>{children}</>;
    } else{
        return (
            <Navigate to="/login" replace />
        );
    }
};

export default AuthGuard;
