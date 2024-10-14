"use client"
import Link from 'next/link'
import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';

const Navbar = () => {
  const[userLogin, setUserLogin] = useState("");

  useEffect(() => {
  const userLogin = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")) || ""
  setUserLogin(userLogin);
  }, [])

  return (
    <nav>
     <div className='bg-white border-b h-24 flex justify-between items-center px-5'>
     <div>
        <h1 className='text-4xl font-bold'>Ecommerce</h1>
      </div>
      <div>
        <ul className='flex justify-evenly items-center gap-5'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
      {!userLogin && <div className='flex gap-4'>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </div>}
      {/* create add to cart and profile */}
      {userLogin && <div className='flex justify-center items-center gap-4'>
        <Link href={"/wishlist"}><FaRegHeart className='text-[25px]'/></Link>
        <Link href={"/add-to-cart"}><FaShoppingCart className='text-[25px]'/></Link>
        <Link href={"/profile"}><IoPersonCircleSharp className='text-[25px]'/></Link>
        </div>}
     </div>
    </nav>
  )
}

export default Navbar
