import { User } from "@/.generate/gql";
import { createContext, useContext } from "react";

export const CurrentUserContext = createContext<User | null>(null);

export const useCurrentUser = (): User | null => {
  return useContext(CurrentUserContext);
};
