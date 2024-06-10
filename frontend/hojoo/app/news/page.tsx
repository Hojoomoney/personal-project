'use client';
import { useEffect, useState } from "react";
import Header from "../common/header";

export default function News() {

    interface Article {
        imgLink: string;
        title: string;
        content: string;
        imgSrc: string;
        }

    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/news/list', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            const fetchedArticles: Article[] = data.map((item: any) => ({
                imgLink: item.imgLink,
                title: item.title,
                content: item.content,
                imgSrc: item.imgSrc,
            }));
            setArticles(fetchedArticles);
        })
        .catch((error) => console.log("error:", error));
    }, []);


    return (<>
        <Header></Header>
<br /><h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white bg-gradient-to-r from-gray-300 via-gray-500 to-black bg-clip-text text-transparent p-4 rounded-lg shadow-lg">실시간 사건/사고 기사</h1>
{articles.length > 0 && (
  <div className="flex flex-wrap justify-center gap-4">
    {articles.map((article) => (
      <div key={article.title} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={article.imgSrc} alt="" width={400}/>
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {article.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {article.content}...
          </p>
          <a
            href={article.imgLink}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            상세 보기
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    ))}
  </div>
)}
</>
);
}