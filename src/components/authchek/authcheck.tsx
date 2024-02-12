"use client"
import React from 'react'
import { useRouter } from 'next/router'
import { cookies } from 'next/headers'
import { access } from 'fs'


export default function Authcheck() {
    const cookieStore = cookies()
    const userLogin = cookieStore.get('isLogedIn')
    const acessToken = cookieStore.get('token')

    const router = useRouter()
    const isLogedIn = localStorage.getItem("isLogedIn")
    const JWT_Token = localStorage.getItem("token")
    if (!isLogedIn && JWT_Token) {
        localStorage.setItem("isLogedIn", 'true')
    } else {
        if (!userLogin) {
            router.push('/authenticate')
        } else if (!userLogin && acessToken) {
            cookieStore.set('isLogedIn', 'true', { secure: true })
        }
    }

}