"use client"
import React, { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


const page = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        Email: '',
        Password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value });
    }

    const navigate = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/api/v1/signup", formData)
            console.log(res)
            if(res.status === 201){
                localStorage.setItem("user", JSON.stringify(res.data.user))
                navigate.push("/")
                toast.success(res.data.mesg, {
                    style: {
                        color: "green",
                    },
                    position: "top-center",
                })
            }
        } catch (error) {
            console.log("Error in Signup", error)
        }
    }

    console.log(formData)

  return (
    <section className='flex justify-center items-center h-screen bg-slate-100'>
       
       <form>
       <div className='bg-white p-4 rounded-md shadow-md w-[450px] flex flex-col justify-center items-center gap-10 py-10'>
       <div>
            <h1 className='font-bold text-4xl'>Sign Up</h1>
        </div>
       <div className='flex gap-5 items-center'>
            <label htmlFor="fullname">Full Name</label>
            <input type="text" placeholder='Enter your name' id='fullname' className='py-2 px-3 border  w-[300px]' onChange={handleChange} name='fullName'/>
        </div>
        <div  className='flex gap-5 items-center'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter your name' id='email' className='py-2 px-3 border ml-8 w-[300px]' onChange={handleChange} name='Email'/>
        </div>
        <div  className='flex gap-5 items-center'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter your name' id='password' className='py-2 px-3 border w-[300px]' onChange={handleChange} name='Password'/>
        </div>
        <button className='bg-green-500 py-3 px-4 rounded-md text-white' type='submit' onClick={handleSubmit}>Sign Up</button>
       </div>
       </form>
    </section>
  )
}

export default page