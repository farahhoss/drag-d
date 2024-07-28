// 1. import `NextUIProvider` component
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { UserProvider } from "./(component)/context/UserContext";

export default function Provider({ children }) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      <UserProvider>{children}</UserProvider>
    </NextUIProvider>
  );
}
