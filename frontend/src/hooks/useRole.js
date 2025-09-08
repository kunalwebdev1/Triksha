import { useContext } from "react";
import { UserRoleContext } from "../context/UserRoleContext";

export const useRole = () => {
  return useContext(UserRoleContext);
};
