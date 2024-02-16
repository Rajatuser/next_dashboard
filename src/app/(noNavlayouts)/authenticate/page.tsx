import Authenticate from '@/components/authentication/authenticate'
import { Suspense } from 'react'
import Loading from '@/components/loaders/loader'

export default function AuthenticateUser(){

return(
  <Suspense fallback={<Loading></Loading>}>
    <Authenticate></Authenticate>
  </Suspense>
)

}