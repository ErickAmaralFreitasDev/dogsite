import React from "react";
import { UserContext } from "../../UserContext";
import {Navigate} from "react-router-dom";

interface ProtectedRouterProps {
    children: React.ReactNode;
}

const ProtectedRouter = ({ children }: ProtectedRouterProps) => {
    const userContext = React.useContext(UserContext);
    const login = userContext?.login;

    if (login === true) {
        return <>{children}</>;
    } else if (login === false) {
    return login ? children : <Navigate to="/login" />
    } else {
        return null; 
    }
};



export default ProtectedRouter;