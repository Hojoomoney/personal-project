'use client';

import Link from "next/link";
import Header from "../common/header";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";



export default function Article() {
    
    interface Article {
        id : number
        name: string;
        title: string;
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
                name: item.writerName,
                title: item.title,
            }));
            setArticles(fetchedArticles);
        })
        .catch((error) => console.log("error:", error));
    }, []);


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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{article.title}</h2>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">작성자 : {article.name}</span>
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
