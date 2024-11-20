import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const Login = () => {

    return (
        <div className='flex justify-center items-center '>
            <SignUp signInUrl='/sign-in' fallbackRedirectUrl={'/'} forceRedirectUrl={'/'}/>
        </div>
    )
}

export default Login
