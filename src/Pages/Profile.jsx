import React, { useEffect } from 'react'
import Nav from '../Components/Nav'
import ProfileSideBar from '../Components/ProfileSideBar'
import { toast, Toaster } from 'react-hot-toast'

const Profile = () => {
    const showToast = (msg) => {
        toast.success(`${msg}`);
    }
 

    return (
        <div>
            <Nav />
            <div>
                <Toaster position="top-right" reverseOrder={false} />
                <ProfileSideBar />

            </div>
        </div>
    )
}

export default Profile
