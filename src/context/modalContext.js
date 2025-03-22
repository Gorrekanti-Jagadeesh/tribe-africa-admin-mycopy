import { Fragment as _Fragment, jsx as _jsx } from 'react/jsx-runtime';
// ModalContext.tsx
import { createContext, useContext, useState } from 'react';
const ModalContext = createContext(undefined);
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(_jsx(_Fragment, {}));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return _jsx(ModalContext.Provider, {
    value: { modalContent, setModalContent, modalIsOpen, setModalIsOpen },
    children: children,
  });
};
