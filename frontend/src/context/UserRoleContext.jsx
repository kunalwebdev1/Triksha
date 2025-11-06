import React, { createContext, useState } from "react";

// Roles: patient, doctor, caregiver, lab, hospital, admin
export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState("patient"); // default role

  const switchRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <UserRoleContext.Provider value={{ role, switchRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
