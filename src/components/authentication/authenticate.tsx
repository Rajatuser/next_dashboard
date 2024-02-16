'use client'

import React, { useEffect, useState, Suspense } from "react";
import { Card, CardHeader, CardBody, CardFooter, Tabs, Tab } from "@nextui-org/react";
import Register from '../registrationform/resgister'
import Login from "../loginForm/login"
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function Authenticate() {
  const [selectedTab, setSelectedTab] = useState("login")
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchHandle = () => {
    if (searchParams.get('page') === "login") {
      setSelectedTab('login')
      router.push(`/authenticate?page=login`)
    } else if (searchParams.get('page') === "register") {
      setSelectedTab('register')
      router.push(`/authenticate?page=register`)
    }
  }

  useEffect(() => {
    searchHandle()
  }, [pathname, searchParams])

  const handleTabChange = (tabKey: any) => {
    setSelectedTab(tabKey.target.innerText)
    router.push(`/authenticate?page=${tabKey.target.innerText}`)
  }

  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto my-4">
      <Tabs selectedKey={selectedTab} onClick={handleTabChange}>
        <Tab key="login" title="login">
          <Card className="w-96">
            <Login></Login>
          </Card>
        </Tab>
        <Tab key="register" title="register">
          <Card className="w-96">
            <Register></Register>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
