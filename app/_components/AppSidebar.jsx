"use client"
import Image from "next/image"
import { Moon } from "lucide-react"
import { Ghost, Sun } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function AppSidebar() {
  const { theme, setTheme } = useTheme()
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-3">
          <div className="p-3 flex justify-between items-center
        ">
            <div className="flex items-center gap-3">
              <Image src={'/logo.svg'} alt='logo' width={60} height={260} className="w-[40px] h-[40px]" />
              <h2 className="font-bold text-xl">AI Fusion</h2>
            </div>
            <div>
              {theme == 'light' ? <Button variant={Ghost} onClick={() => setTheme('dark')}><Sun /></Button>
                : <Button variant={Ghost} onClick={() => setTheme('light')}><Moon /></Button>}
            </div>
          </div>
          <Button className='mt-7 w-full' size="lg">+ New Chat</Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className={'p-3'}>
          <h2 className="font-bold text-lg">Chat</h2>
          <p className="text-sm text-gray-400">Sign in to start chatting with multiple AI model</p>
          </div>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <div className="p-3 mb-10">
          <Button className={'w-full'} size={'lg'}>Sign In/Sign Up</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}