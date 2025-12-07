// app/Provider.jsx
"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/FirebaseConfig";
import { getDoc, setDoc , doc } from "firebase/firestore";
import { useEffect } from "react";

export default function Provider({ children, ...props }) {

  const { user } = useUser(); 

  useEffect(() => { 
    if (user) {
      CreateNewUser();
    }
  }, [user])
  const CreateNewUser = async () => {
    //if user exist?
    const userRef = doc(db, "users",user?.primaryEmailAddress?.emailAddress);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log('Existing User');
      return;
    } else {
      const userData = {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date(),
        remainingMsg: 5, //only for free users
        plan: 'Free',
        credits: 1000 //Paid User
      }
      await setDoc(userRef, userData);
      console.log('New user data saved');

    }
    //if not then insert
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <SidebarProvider>
        <AppSidebar />


        <div className="w-full">
          <AppHeader />{children}</div>
      </SidebarProvider>

    </NextThemesProvider>
  );
}
