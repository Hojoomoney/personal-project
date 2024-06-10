'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Header from "../common/header";
import { useState } from "react";

export default function Register() {

const router = useRouter();
const [check, setCheck] = useState<boolean>(false);
type Inputs = { 
  username: string
  password: string
  name : string
  phone : string
}

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm<Inputs>()


const onSubmit: SubmitHandler<Inputs> = (data) => {
  if(check){
  console.log('입력된 값' + JSON.stringify(data))
  fetch('http://localhost:8080/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()) // Add 'return' before response.json()
    .then((data) => {
      console.log('응답' + JSON.stringify(data.message));
      router.push('/login')
    })
    .catch((error) => console.log("error:", error));
  }
}

const handleCheck = () => {
  console.log('중복체크');
  fetch('http://localhost:8080/api/user/isExist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: watch('username')
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('응답' + JSON.stringify(data));
      
      if(data === true){
        alert('이미 사용중인 아이디입니다.');
        setCheck(false);
      } else {
        alert('사용가능한 아이디입니다.');
        setCheck(true);
      }

    })
    .catch((error) => console.log("error:", error));
}

const handleAlert = () => {
  alert('아이디 중복체크를 해주세요.');
}

    return (<>
    <Header></Header>
<form onSubmit={handleSubmit(onSubmit)}>
<div className="bg-grey-lighter min-h-screen flex flex-col">
  <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      <h1 className="mb-8 text-3xl text-center">Sign up</h1>
      <div className="flex items-center mb-4">
  <input
    {...register("username", { required: true })}
    type="email"
    className="block border border-grey-light w-9/12 p-3 rounded"
    name="username"
    placeholder="Username(Email)"
    required
  />
  <button
    onClick={handleCheck}
    className="ml-4 px-6 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
  >
    중복체크
  </button>
</div>
      <input {...register("password", { required: true })}
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="password"
        placeholder="Password"
        pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$" // 
        required
      />
      <div className="text-gray-500 text-xs">
        비밀번호는 8자 이상 20자 이하, 숫자, 문자, 특수문자를 포함해야 합니다.
      </div>
      <input
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="confirm_password"
        placeholder="Confirm Password"
        required
      />
      <input {...register("name", { required: true })}
        type="text"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="name"
        placeholder="Full Name"
        required
      />
      <input {...register("phone", { required: true })}
        type="text"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="phone"
        placeholder="Phone Number"
        required
      />
      {check ? 
      <button
            type="submit"
            className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Sign Up
      </button> :
      <button
            onClick={handleAlert}
            className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-gray-400 hover:bg-gray-500 focus:outline-none">
            Sign Up</button>
      } 
    </div>
    <div className="text-grey-dark mt-6">
      Already have an account?&nbsp;&nbsp;  
      <a
        className="no-underline border-b border-blue text-red-600"
        href="/login"
        >
        Log in
      </a>
    </div>
  </div>
</div>
</form>
    </>)
}
