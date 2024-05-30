'use client';
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Header from "./common/header";
import { parseCookies } from "nookies";

export default function Home() {
  // const refreshToken = parseCookies().refreshToken;
  // const accessToken = parseCookies().accessToken;
  return (<>
  <Header></Header>
<div className="font-[sans-serif] text-[#333]">
  <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4 bg-white">
    <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
      <div className="max-md:text-center">
        <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px]">
          Welcome to LawMate!
        </h2>
        <p className="text-sm mt-6">
          Immerse yourself in a hassle-free login journey with our intuitively
          designed login form. Effortlessly access your account.
          {/* {refreshToken} <br /> */}
          {/* {accessToken} */}
        </p>
        <p className="text-sm mt-10">
          Don't have an account{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline ml-1"
          >
            Register here
          </a>
        </p>
      </div>
      <div className="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full">
        
        <div>
        <img
              src="https://cdn.pixabay.com/photo/2015/10/28/16/45/horizontal-1010894_1280.jpg"
              alt="logo"
              className="w-100"
            />
        </div>
      </div>
    </div>
  </div>
</div>
  </>
  );
}
