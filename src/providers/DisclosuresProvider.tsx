import { useDisclosure } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useState } from "react";

export const DisclosuresContext = createContext(
  {} as {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    successfullDisclosure: ReturnType<typeof useDisclosure>;
    errorDisclosure: ReturnType<typeof useDisclosure>;
  }
);

export const DisclosuresProvider = ({ children }: PropsWithChildren) => {
  const successfullDisclosure = useDisclosure();
  const errorDisclosure = useDisclosure();
  const [message, setMessage] = useState<string>("");
  return (
    <DisclosuresContext.Provider
      value={{ successfullDisclosure, errorDisclosure, message, setMessage }}
    >
      {children}
    </DisclosuresContext.Provider>
  );
};
