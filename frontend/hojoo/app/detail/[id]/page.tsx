'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Header from "../../common/header";
import { destroyCookie, parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Update(props: any) {
  interface Article {
    id: number
    title: string
  }
  const router = useRouter();
  type Inputs = {
    id: number
    username: string
    password: string
    name: string
    phone: string
    articles: Article[]
  }
  const [user, setUser] = useState<Inputs>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    console.log('id : ' + props.params.id);
    fetch(`http://localhost:8080/api/user/detail?id=${props.params.id}`, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('응답' + JSON.stringify(data));
        setUser(data);
    })
    .catch((error) => console.log("error:", error));
}, []);


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
    if (confirm('회원탈퇴를 하시겠습니까?')) {
    fetch(`http://localhost:8080/api/user/delete?id=${jwtDecode<any>(parseCookies().refreshToken).id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // Add 'return' before response.json()
      .then((data) => {
        destroyCookie(null, 'refreshToken');
        console.log(`${jwtDecode<any>(parseCookies().refreshToken).id}`)
        console.log('응답' + JSON.stringify(data.message));
        router.refresh();
        router.push('/')
      }
      )
      .catch((error) => console.log("error:", error));
    } else {
      return;
    }
  }
  const handleDeleteArticle = (id : number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
    fetch(`http://localhost:8080/api/article/delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // Add 'return' before response.json()
      .then((data) => {
        console.log('응답' + JSON.stringify(data.message));
        alert('삭제되었습니다.');
        router.refresh();
      }
      )
      .catch((error) => console.log("error:", error));
    } else {
      return;
    }
  }

  return (<>
  <Header />
<div className="bg-white min-h-screen flex flex-col items-center py-6">
  <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
    {/* 유저 정보 */}
    <div className="w-full md:w-1/2 bg-white p-6 rounded shadow-md mb-6 md:mb-0">
      <h1 className="mb-8 text-3xl text-center font-bold">회원 정보</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        <input type="hidden" {...register("id", { required: true })} value={jwtDecode<any>(parseCookies().refreshToken).id} />
        <input
          {...register("username", { required: true })}
          value={jwtDecode<any>(parseCookies().refreshToken).username}
          type="email"
          className="block border border-gray-300 w-full p-3 rounded mb-4"
          name="username"
          placeholder="Username"
          readOnly
        />
        <input
          {...register("password", { required: true })}
          type="password"
          className="block border border-gray-300 w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
        />
        <input
          type="password"
          className="block border border-gray-300 w-full p-3 rounded mb-4"
          name="confirm_password"
          placeholder="Confirm Password"
        />
        <input
          {...register("name", { required: true })}
          type="text"
          className="block border border-gray-300 w-full p-3 rounded mb-4"
          name="name"
          placeholder={user?.name}
        />
        <input
          {...register("phone", { required: true })}
          type="text"
          className="block border border-gray-300 w-full p-3 rounded mb-4"
          name="phone"
          placeholder={user?.phone}
        />
        <button
          type="submit"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-green-500 hover:bg-green-700 focus:outline-none mb-4"
        >
          Save Changes
        </button>
        <button
          onClick={handleDelete}
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-red-500 hover:bg-red-700 focus:outline-none"
        >
          Delete Account
        </button>
      </form>
    </div>

    {/* 구분선 */}
    <div className="hidden md:block w-0.5 bg-gray-300 mx-6"></div>

    {/* 작성한 글 목록 */}
    <div className="w-full md:w-1/2 bg-white p-6 rounded shadow-md">
      <h2 className="mb-8 text-3xl text-center font-bold">작성한 글 목록</h2>
      <div className="grid grid-cols-1 gap-6">
        {user?.articles.map((article) => (
          <div key={article.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{article.title}</h2>
            <div className="flex justify-between items-center">
              <Link href={`/article/detail/${article.id}`} className="px-6 py-2 text-sm rounded-full font-bold text-white border-2 border-[#ff002b] bg-[#ff0095] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                답변 보기
              </Link>
              <button onClick={() => handleDeleteArticle(article.id)} className="btn border border-red-500 p-2 px-4 font-semibold cursor-pointer text-white rounded-lg bg-red-500 hover:bg-red-600 transition">
                  질문 삭제하기
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  </>)
}
