"use client";

import Image from "next/image";
import { Moon, Sun, User2, Zap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SignInButton, useUser } from "@clerk/nextjs";
import UsageCreditProgress from "./UsageCreditProgress";
import { getDocs, query, where, collection } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { db } from "@/config/FirebaseConfig";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import PricingModel from "./PricingModel";
import { useAuth } from "@clerk/nextjs";



export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const [chatHistory, setChatHistory] = useState([]);
  const [freeMsgCount, setFreeMsgCount] = useState(0);

  const { aiSelectedModels, setAiSelectedModels, messages, setMessages } = useContext(AiSelectedModelContext);

  const { has } = useAuth();

  // const paidUser = has({ plan: 'unlimited_plan' });





  // const paidUser = has({ plan: 'unlimited_plan' });

  /* ---------------- Fetch chat history ---------------- */
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getChatHistory();
      user && GetRemainingTokenMsgs();
    }
  }, [user]);

  useEffect(() => {
    GetRemainingTokenMsgs();
  }, [messages])

  const getChatHistory = async () => {
    const q = query(
      collection(db, "chatHistory"),
      where(
        "userEmail",
        "==",
        user.primaryEmailAddress.emailAddress
      )
    );




    const snapshot = await getDocs(q);

    // ✅ set state ONCE (not inside forEach)
    const chats = snapshot.docs
      .map((doc) => doc.data())
      .sort((a, b) => b.lastUpdated - a.lastUpdated);

    setChatHistory(chats);
  };



  /* ---------------- Safe preview helper ---------------- */
  const getLastUserMessageFromChat = (chat) => {
    if (!chat?.messages) {
      return {
        message: "New Chat",
        lastMsgDate: moment(chat?.lastUpdated || Date.now()).fromNow(),
      };
    }

    const allMessages = Object.values(chat.messages).flat();
    const userMessages = allMessages.filter(
      (msg) => msg.role === "user"
    );

    const lastUserMsg =
      userMessages.length > 0
        ? userMessages[userMessages.length - 1].content
        : "New Chat";

    return {
      message: lastUserMsg,
      lastMsgDate: moment(chat.lastUpdated || Date.now()).fromNow(),
    };
  };

  const GetRemainingTokenMsgs = async () => {
    const result = await axios.post('/api/user-remaining-msg');
    console.log(result);
    setFreeMsgCount(result?.data?.remainingToken);
  }

  return (
    <Sidebar>
      {/* ---------------- Header ---------------- */}
      <SidebarHeader>
        <div className="p-3">
          <div className="flex justify-between items-center p-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="logo"
                width={40}
                height={40}
              />
              <h2 className="font-bold text-xl">AI Fusion</h2>
            </div>

            <Button
              variant="ghost"
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
            >
              {theme === "light" ? <Sun /> : <Moon />}
            </Button>
          </div>

          {user ? (
            <Link href={'/'}>
              <Button className="mt-7 w-full" size="lg">
                + New Chat
              </Button>
            </Link>
          ) : (
            <SignInButton>
              <Button className="mt-7 w-full" size="lg">
                + New Chat
              </Button>
            </SignInButton>
          )}
        </div>
      </SidebarHeader>

      {/* ---------------- Content ---------------- */}
      <SidebarContent>
        <SidebarGroup>
          <div className="p-3">
            <h2 className="font-bold text-lg">Chat</h2>

            {!user && (
              <p className="text-sm text-gray-400">
                Sign in to start chatting with multiple AI models
              </p>
            )}

            {chatHistory.map((chat) => {
              const preview = getLastUserMessageFromChat(chat);

              return (
                <Link
                  key={chat.chatId}
                  href={`/?chatId=${chat.chatId}`}
                >
                  <div className="hover:bg-green-400 p-3 cursor-pointer rounded-md">
                    <p className="text-sm text-gray-400">
                      {preview.lastMsgDate}
                    </p>
                    <p className="text-lg line-clamp-1">
                      {preview.message}
                    </p>
                  </div>
                  <hr className="my-2" />
                </Link>
              );
            })}
          </div>
        </SidebarGroup>
      </SidebarContent>

      {/* ---------------- Footer ---------------- */}
      <SidebarFooter>
        <div className="p-3 mb-10">
          {!user ?
            <SignInButton mode="modal">
              <Button className="w-full" size="lg">
                Sign In / Sign Up
              </Button>
            </SignInButton>
            :
            <div>
              {!has({ plan: 'unlimited_plan' }) &&
                <div>
                  <UsageCreditProgress remainingToken={freeMsgCount} />
                  <PricingModel>
                    <Button className="w-full mb-3">
                      <Zap /> Upgrade Plan
                    </Button>
                  </PricingModel>
                </div>}
              <Button variant={'ghost'} className="flex ">
                <User2 /> <h2>Settings</h2>
              </Button>
            </div>
          }
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
