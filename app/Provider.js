// app/Provider.jsx
"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/FirebaseConfig";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import { DefaultModel } from "@/shared/AiModelsShared";
import { UserDetailContext } from "@/context/UserDetailContext";



export default function Provider({ children, ...props }) {

  const { user } = useUser();
  const [aiSelectedModels, setAiSelectedModels] = useState(DefaultModel);
  const [UserDetail, setUserDetail] = useState();
  const [messages, setMessages] = useState({});
  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user])

  useEffect(() => {
    if (aiSelectedModels) {
      updateAIModelSelectionPref();
    }
  }, [aiSelectedModels]);

  const updateAIModelSelectionPref = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const docRef = doc(db, "users", user.primaryEmailAddress.emailAddress);
      try {
        await updateDoc(docRef, {
          selectedModelPref: aiSelectedModels
        });
      } catch (error) {
        console.error("Error updating Firebase:", error);
      }
    }
  }

  const CreateNewUser = async () => {
    //if user exist?
    const userRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log('Existing User');
      const userInfo = userSnap.data();
      setAiSelectedModels(userInfo?.selectedModelPref ?? DefaultModel);
      setUserDetail(userInfo);
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
      setUserDetail(userData);

    }
    //if not then insert
  }

  return (
    <NextThemesProvider {...props}
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange>
      <UserDetailContext.Provider value={{ UserDetail, setUserDetail }}>
        <AiSelectedModelContext.Provider value={{ aiSelectedModels, setAiSelectedModels, messages, setMessages }}>

          <SidebarProvider>
            <AppSidebar />


            <div className="w-full">
              <AppHeader />{children}</div>
          </SidebarProvider>
        </AiSelectedModelContext.Provider>
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}
