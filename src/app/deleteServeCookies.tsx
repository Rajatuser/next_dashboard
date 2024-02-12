'use server'

import { cookies } from 'next/headers'

export async function deleteServeCookies(cookieName: string) {
    const cookie = cookies()
    if (cookieName == 'isLoggedIn') {
        cookie.delete('isLoggedIn')

    }
    if (cookieName == 'token') {
        cookie.delete('token')

    }
    if (cookieName == 'user') {
        cookie.delete('user')
    }
    if (cookieName == 'role') {
        cookie.delete('role')
    }

    if(cookieName == 'all'){
        cookie.delete('isLoggedIn')
        cookie.delete('token')
        cookie.delete('user')
        cookie.delete('role')
    }

}