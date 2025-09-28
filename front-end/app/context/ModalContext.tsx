
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

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
  handleGetStarted: () => void;
  handleRoleSelect: (selectedRole: string) => void;
  handleRegistrationSuccess: (details: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected, address } = useAccount();
  const [role, setRole] = useState<string | null>(null);
  const [isConnectModalOpen, setConnectModalOpen] = useState(false);
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const userData = JSON.parse(savedData);
      if (userData.walletAddress && userData.role && userData.details) {
        setRole(userData.role);
        router.push('/dashboard');
      }
    }
  }, [router]);

  const handleGetStarted = () => {
    if (isConnected) {
      setRoleModalOpen(true);
    } else {
      setConnectModalOpen(true);
    }
  };

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    setRoleModalOpen(false);
    setRegistrationModalOpen(true);
  };

  const handleRegistrationSuccess = (details: any) => {
    const userData = {
      walletAddress: address,
      role,
      details
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    setRegistrationModalOpen(false);
    router.push('/dashboard');
  };

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
      setRegistrationModalOpen,
      handleGetStarted,
      handleRoleSelect,
      handleRegistrationSuccess
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
