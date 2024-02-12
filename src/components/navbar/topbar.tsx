'use client'

import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { getServerCookies } from "@/app/getServerCookies";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import Link from "next/link";
import { deleteServeCookies } from "@/app/deleteServeCookies";
import { useRouter } from "next/navigation";



export default function App() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isloggedin, setIsLoggedIn] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [role, setRole] = useState('user')
  const menuItems = [
    "Dashboard",
    "E-commerce",
    "Our Team",
    "inbox",
    "Products"
  ];

  const checkuserlogged = async () => {
    const isLoggedIn = await getServerCookies('isLoggedIn')
    const user = await getServerCookies('user')
    const roleu = await getServerCookies('role')
    if (roleu != undefined) {
      setRole(roleu.value)
    }
    if (user !== undefined) {
      setUserEmail(user.value)
    }
    if (isLoggedIn !== undefined) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  const handleLogout = async() =>{
    await deleteServeCookies('all')
    router.push('/authenticate')
  }

  useEffect(() => {
    checkuserlogged()
  }, [])

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <Navbar onMenuOpenChange={setIsMenuOpen} className="">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href="/" className="font-bold text-inherit">ACME</Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>


        {
          isloggedin ? <>
            <NavbarContent justify="end">

              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                    }}
                    className="transition-transform"
                    description={role}
                    name={userEmail}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">{userEmail}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">
                    My Settings
                  </DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">
                    Analytics
                  </DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">Configurations</DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent></> : <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        }

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full"
                href={`/${item.split(" ").length > 1 ? item?.split(" ")[1]?.toLowerCase(): item.toLowerCase()}`}
                // size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </nav>
  );
}
