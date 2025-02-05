import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
  const [refresh, setRefresh] = useState(false);
  const [balance, setBalance] = useState(0);
  const [gender, setGender] = useState("male");
  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, refresh, setRefresh, balance, setBalance, gender, setGender }}
    >
      {children}
    </AuthContext.Provider>
  );
};
