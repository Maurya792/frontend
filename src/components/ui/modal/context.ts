import React from "react";
const initialValue = { close: () => {} };
export const modalContext = React.createContext(initialValue);
export const useRouteModal = () => React.useContext(modalContext);
