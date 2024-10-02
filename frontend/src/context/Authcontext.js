import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: "",
        user: null,
    });

    useEffect(() => {
        const loginuser = JSON.parse(localStorage.getItem("loginuser"));
        console.log("login user : ", loginuser);
        if (loginuser) {
            setAuth(prevAuth => ({
                ...prevAuth,
                user: loginuser.user,
                token: loginuser.token,
            }));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
