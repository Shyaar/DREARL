
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useAccount } from 'wagmi';

interface AppContextType {
  isWalletConnected: boolean;
  role: string | null;
  setRole: (role: string | null) => void;
  isConnectModalOpen: boolean;
  setConnectModalOpen: (isOpen: boolean) => void;
  isRoleModalOpen: boolean;
  setRoleModalOpen: (isOpen: boolean) => void;
  isRegistrationModalOpen: boolean;
  setRegistrationModalOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useAccount();
  const [role, setRole] = useState<string | null>(null);
  const [isConnectModalOpen, setConnectModalOpen] = useState(false);
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

  return (
    <AppContext.Provider value={{
      isWalletConnected: isConnected,
      role,
      setRole,
      isConnectModalOpen,
      setConnectModalOpen,
      isRoleModalOpen,
      setRoleModalOpen,
      isRegistrationModalOpen,
      setRegistrationModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
