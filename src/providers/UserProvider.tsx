import { useState, createContext, PropsWithChildren } from "react";
import { User } from "../types/user";

export const UserContext = createContext({
  currentUser: null,
} as {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
