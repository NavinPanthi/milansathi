"use client";
import { ReactNode } from "react"; // Import ReactNode type

interface StoreProviderProps {
  children: ReactNode; // Define children prop with ReactNode type
}

import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
