"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useAppDispatch } from "@/lib/redux/store";
import store from "@/lib/redux/store";
import apprwiteService from "@/lib/appwrite/functions";
import { loginReducer } from "@/lib/redux/slices/auth/AuthSlice";
import "./globals.css";
import { LoaderCircle } from "lucide-react";

function RootComponent({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getCurrentUserDetails() {
      const response = await apprwiteService.getCurrentUser();

      if (response) {
        dispatch(loginReducer(response));
      }

      setIsLoading(false)
    }

    getCurrentUserDetails();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-gray-100">
        <LoaderCircle className="w-12 h-12 text-gray-500 animate-spin" />
        <h2 className="text-lg font-semibold text-gray-600">
          Please Wait...
        </h2>
      </div>
    );
  }

  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="antialiased">
          <RootComponent>
            {children}
          </RootComponent>
        </body>
      </html>
    </Provider>
  );
}
