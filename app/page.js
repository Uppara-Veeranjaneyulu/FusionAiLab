"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Home() {
  const {setTheme}=useTheme();
  return (   
    <div>
      Hi Veeranji!!
      <br></br>
      <Button>click me</Button>
      <Button onClick={()=>setTheme('dark')}>Dark mode</Button>
      <Button onClick={()=>setTheme('light')}>Light mode</Button>
    </div>
  );
}

