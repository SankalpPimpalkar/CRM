"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useAppDispatch } from "@/lib/redux/store";
import store from "@/lib/redux/store";
import apprwiteService from "@/lib/appwrite/functions";
import { loginReducer } from "@/lib/redux/slices/auth/AuthSlice";
import "./globals.css";

function RootComponent({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getCurrentUserDetails() {
      const response = await apprwiteService.getCurrentUser();

      if (response) {
        dispatch(loginReducer(response));
      }
    }

    getCurrentUserDetails();
  }, [dispatch]);

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
