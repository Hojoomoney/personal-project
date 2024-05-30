'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Header from "../common/header";
import { destroyCookie, parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export default function Update() {


const router = useRouter();
type Inputs = {
  id: number
  username: string
  password: string
  name : string
  phone : string
}
//  const [user, setUser] = useState<Inputs>();

const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
} = useForm<Inputs>()

// fetch(`http://localhost:8080/api/user/detail?id=${jwtDecode<any>(parseCookies().refreshToken).id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json()) // Add 'return' before response.json()
//     .then((data) => {
//       console.log('응답' + JSON.stringify(data));
//       setUser(data);
//     })
//     .catch((error) => console.log("error:", error));


const onSubmit: SubmitHandler<Inputs> = (data) => {
  console.log('입력된 값' + JSON.stringify(data))
  fetch('http://localhost:8080/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()) // Add 'return' before response.json()
    .then((data) => {
      console.log('응답' + JSON.stringify(data.message));
      router.push('/')
    })
    .catch((error) => console.log("error:", error));
}

const handleDelete = () => {
    fetch(`http://localhost:8080/api/user/delete?id=${jwtDecode<any>(parseCookies().refreshToken).id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => response.json()) // Add 'return' before response.json()
        .then((data) => {
            console.log('응답' + JSON.stringify(data.message));
            destroyCookie(null,'refreshToken');
            router.push('/')
            router.refresh();
        }
        )
        .catch((error) => console.log("error:", error));
}

    return (<>
    <Header></Header>
<form onSubmit={handleSubmit(onSubmit)}>
<div className="bg-grey-lighter min-h-screen flex flex-col">
  <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      <h1 className="mb-8 text-3xl text-center">My Account</h1>
      <input type="hidden" {...register("id", { required: true })} value={jwtDecode<any>(parseCookies().refreshToken).id} />
      <input {...register("username", { required: true })}
        value={jwtDecode<any>(parseCookies().refreshToken).username}
        type="email"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="username"
        placeholder="Username"
        readOnly
      />
      <input {...register("password", { required: true })}
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="password"
        placeholder="Password"
      />
      <input
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="confirm_password"
        placeholder="Confirm Password"
      />
      <input {...register("name", { required: true })}
        type="text"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="name"
        placeholder="Full Name"
      />
      <input {...register("phone", { required: true })}
        type="text"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="phone"
        placeholder="Phone Number"
      />
      
      <button
            type="submit"
            className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-green-500 hover:bg-green-700 focus:outline-none"
          >
            Save Changes
          </button>
          <br /><br />
        <button
            onClick={handleDelete}
            className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-red-500 hover:bg-red-700 focus:outline-none"
        >
            Delete Account
        </button>
    </div>
    
  </div>
</div>
</form>
    </>)
}
