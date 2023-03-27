import { useDisclosure } from "@chakra-ui/react";
import { createContext, PropsWithChildren } from "react";

export const DisclosuresContext = createContext(
  {} as {
    successfullDisclosure: ReturnType<typeof useDisclosure>;
    errorDisclosure: ReturnType<typeof useDisclosure>;
  }
);

export const DisclosuresProvider = ({ children }: PropsWithChildren) => {
  const successfullDisclosure = useDisclosure();
  const errorDisclosure = useDisclosure();
  return (
    <DisclosuresContext.Provider
      value={{ successfullDisclosure, errorDisclosure }}
    >
      {children}
    </DisclosuresContext.Provider>
  );
};
