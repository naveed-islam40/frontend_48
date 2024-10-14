"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/login",
        formData
      );
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user))
        toast.success(res.data.mesg, {
          style: {
            color: "green",
          },
          position: "top-center",
          position: "top-center",
        });
        setFormData({ email: "", password: "" });
        navigate.push("/")
      }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.mesg, {
            style: {
              color: "red",
            },
            position: "top-center",
          });
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="bg-zinc-100 w-[450px] p-5 flex flex-col justify-center items-center rounded-md shadow-md">
        <div>
          <h1 className="font-bold text-4xl">Login</h1>
        </div>
        <form action="" className="flex flex-col gap-10 mt-10">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              className="ml-[50px] py-2 px-3  border"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              id="password"
              className="ml-6  py-2 px-3 border"
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-green-500 py-2 rounded-md text-white"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default page;
