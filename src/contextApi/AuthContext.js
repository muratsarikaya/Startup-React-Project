import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = React.createContext();

const LOCALSTORAGE_AUTH_VALUE = "is_auth"

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const history = useHistory();

  const signup = (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => console.log(result));
  };

  const login = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((result) =>{
        console.log(result)
        localStorage.setItem(LOCALSTORAGE_AUTH_VALUE, "true")
      });
  };

  const logout = async () => {
    await auth.signOut().then((result) => console.log(result));
    localStorage.setItem(LOCALSTORAGE_AUTH_VALUE, "false")
    history.push("/")
  };

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((user) => {
      console.log(user)
      setCurrentUser(user);
    });
    return unsubscriber;
  }, []);
  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
