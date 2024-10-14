"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const page = () => {
    const [userData, setUserData] = useState({
        fullName: "",
        Email: "",
    })
    const [password, setPassword] = useState("")
    const [currentPassword, setcurrentPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const router = useRouter();

    useEffect(() => {
    const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
    if(!user){
        return router.push("/login")
    }

    const userId = user._id;

        const getUserDetails = async () => {
            const res = await axios.get(`http://localhost:3001/api/v1/getuserdetails/${userId}`)
            console.log(res)
            setUserData({
                fullName: res.data.user.fullName,
                Email: res.data.user.Email,
            })
        }
        getUserDetails()
    }, [])

   

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")) || ""
        const userId = user._id;

        if(currentPassword !== user.Password){
           return toast.error("old password does not match", {
                style: {
                  color: "red",
                },
                position: "top-center",
                position: "top-center",
              });
        }
    
        if (password !== confirmPassword){
            return toast.error("password does not match", {
                style: {
                  color: "red",
                },
                position: "top-center",
                position: "top-center",
              });
        }
        try {
            const res = await axios.post(`http://localhost:3001/api/v1/update-userdetails/${userId}`, {userData, password})
            setUserData(res.data.user)
            if(res.status == 200){
                toast.success(res.data.mesg, {
                    style: {
                      color: "green",
                    },
                    position: "top-center",
                    position: "top-center",
                  });
            }
        } catch (error) {
            console.log("Error in updation", error.response.data.message)
        }
    }
  return (
    <section className='h-screen flex flex-col justify-center items-center'>
        <div className='bg-slate-100 py-4 px-5 shadow-md rounded-md flex flex-col gap-10'>
        <div>
            <h1 className='text-[20px] font-semibold text-red-600'>Edit your profile</h1>
        </div>
       <form action="">
       <div className='flex flex-col gap-4'>
       <div>
            <label htmlFor="fullname">Full Name</label>
            <input type="text" name='fullName' id='fullname'  className='ml-10 py-2 px-3 border w-[350px]' placeholder='Full Name' value={userData?.fullName && userData.fullName} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" name='Email' id='email' className='ml-[70px] py-2 px-3 border w-[350px]' placeholder='Email' value={userData?.Email && userData.Email} onChange={handleChange} />
        </div>
       </div>
        <div className='flex justify-center flex-col items-center gap-3 mt-4'>
        <h1>Password changes</h1>
        <div>
           
           <input type="password" name='current-password' id='current-password' className='ml-[70px] py-2 px-3 border w-[400px]'  placeholder='Current Password' value={currentPassword} onChange={(e) => setcurrentPassword(e.target.value)} />
       </div>
       <div>
           
           <input type="password" name='new-password' id='new-password' className='ml-[70px] py-2 px-3 border w-[400px]' placeholder='New Password' value={password} onChange={(e) => setPassword(e.target.value)} />
       </div>
        <div>
           
            <input type="password" name='confirm-password' id='confirm-password' className='ml-[70px] py-2 px-3 border w-[400px]' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        </div>
        <div className='flex justify-center items-center py-4'>
            <button className='bg-green-500 rounded-md shadow-md px-4 py-3 text-white' onClick={handleSubmit}>Save Changes</button>
        </div>
       </form>
        </div>
    </section>
  )
}

export default page