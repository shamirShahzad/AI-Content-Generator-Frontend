import { createContext, useContext, useEffect, useState } from "react";
import { checkUserAuthStatus } from "../apis/users/usersAPI";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Make request using react query
  const { isError, isLoading, data, isSuccess } = useQuery({
    queryFn: checkUserAuthStatus,
    queryKey: ["checkAuth"],
  });

  //Update the authenticated user
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setIsAuthenticated(data);
    }
  }, [isSuccess, data]);

  //Update the user auth after login
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isError, isLoading, isSuccess, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook

export const useAuth = () => {
  return useContext(AuthContext);
};
