import { useState, createContext, PropsWithChildren } from "react";
import { UserState } from "../types/user";

export const UserContext = createContext({
  currentUser: null,
} as {
  currentUser: UserState;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserState>>;
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<UserState>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
