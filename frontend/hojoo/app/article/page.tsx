'use client';

import Link from "next/link";
import Header from "../common/header";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";



export default function Article() {
    const router = useRouter();
    interface Article {
        id: number
        writerName: string
        title: string
    }

    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/article/list', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            const fetchedArticles: Article[] = data.map((item: any) => ({
                id : item.id,
                writerName : item.writerName,
                title: item.title,
            }));
            setArticles(fetchedArticles);
        })
        .catch((error) => console.log("error:", error));
    }, []);
    
    type Inputs = { 
      keyword: string
    }
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<Inputs>()
  

    const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log('입력된 값' + JSON.stringify(data))
      fetch(`http://localhost:8080/api/article/search?keyword=${data.keyword}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json()) 
        .then((data) => {
          console.log('응답' + JSON.stringify(data));
          setArticles(data);
        })
        .catch((error) => console.log("error:", error));
    }

return(<>
          <Header />
          <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white bg-gradient-to-r from-gray-300 via-blue-400 to-blue-600 bg-clip-text text-transparent p-4 rounded-lg shadow-lg">
          질문 게시판
          <Link href={parseCookies().refreshToken != null ? "/article/write" : "/login"} className="ml-4 px-6 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
            질문하기
          </Link>
        </h1>
   <form className="max-w-md mx-auto"  onSubmit={handleSubmit(onSubmit)}>
  <label
    htmlFor="default-search"
    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
  >
    Search
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      {...register("keyword")}
      type="search"
      id="default-search"
      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="키워드를 입력하세요..."
    />
    <button
      type="submit"
      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Search
    </button>
  </div>
</form>
<br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{article.title}</h2>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">작성자 : {article.writerName}</span>
                <Link href={`/article/detail/${article.id}`} className="ml-4 px-6 py-2 text-sm rounded-full font-bold text-white border-2 border-[#ff002b] bg-[#ff0095] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                  답변 보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

    </>)
}
