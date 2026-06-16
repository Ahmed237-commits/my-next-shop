'use client';
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface dataType {
  name: string;
  email?: string;
  role: string;
  data: any;
  setName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  setRole: Dispatch<SetStateAction<string>>;
  setData: Dispatch<SetStateAction<any>>;
addTodata:Dispatch<SetStateAction<any>>;
}

const dataContext = createContext<dataType | null>(null);

export default function DataContext({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string>('Ahmed');
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string>('user');
  const [data, setData] = useState<any[]>([]);
const addTodata = () => {
    if (email!= undefined) {
setData([email , name , role])
    }
}
  return (
    <dataContext.Provider value={{
      name,
      email,
      role,
      data,
      setName,
      setEmail,
      setRole,
      setData,
      addTodata,
    }}>
      {children}
    </dataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(dataContext);
  if (!context) {
    throw new Error("useData must be used within a DataContext provider");
  }
  return context;
};