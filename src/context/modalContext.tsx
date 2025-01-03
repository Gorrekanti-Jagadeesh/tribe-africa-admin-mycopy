// ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ModalContextType {
  modalContent: ReactNode;
  setModalContent: (content: ReactNode) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode>(<></>);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ modalContent, setModalContent, modalIsOpen, setModalIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
