'use server'

import { cookies } from 'next/headers'

export async function getServerCookies(cookieName: string) {
    const cookie = cookies()
    if (cookieName == 'isLoggedIn') {
        const isLoggedIn = cookie.get('isLoggedIn')
        return isLoggedIn
    }
    if (cookieName == 'token') {
        const token = cookie.get('token')
        return token
    }
    if (cookieName == 'user') {
        const user = cookie.get('user')
        return user
    }
    if (cookieName == 'role') {
        const role = cookie.get('role')
        return role
    }
}