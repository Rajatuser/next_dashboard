'use server'
 
import { cookies } from 'next/headers'
 
export async function setServerCookies(token:string,user:string,role:string){

const cookie = cookies()
const oneDay = 24 * 60 * 60 * 1000
cookie.set('token',token, { expires: Date.now() + oneDay })
cookie.set('user',user,  { expires: Date.now() + oneDay })
cookie.set('role',role,  { expires: Date.now() + oneDay })
cookie.set('isLoggedIn','true', { expires: Date.now() + oneDay })
console.log("cookies set", token,user,role)
}