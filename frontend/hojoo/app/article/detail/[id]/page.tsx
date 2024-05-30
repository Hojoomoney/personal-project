'use client';
import Header from "@/app/common/header";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Detail(props: any){
  const router = useRouter();
  const [article, setArticle] = useState<Article>();
    type Article = { 
        id : number
        title: string
        question: string
        answer : string
        modDate : Date
      }
      
      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Article>()

      useEffect(() => {
        console.log('id : ' + props.params.id);
        fetch(`http://localhost:8080/api/article/detail?id=${props.params.id}`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            setArticle(data);
        })
        .catch((error) => console.log("error:", error));
    }, []);

    const onSubmit: SubmitHandler<Article> = (data) => {
      console.log('입력된 값' + JSON.stringify(data))
      fetch('http://localhost:8080/api/article/modify', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json()) // Add 'return' before response.json()
      .then((data) => {
          console.log('응답' + JSON.stringify(data.message));
          router.push('/article')
      })
      .catch((error) => console.log("error:", error));
    }

    const handleDelete = () => {
      console.log('id : ' + props.params.id);
      fetch(`http://localhost:8080/api/article/delete?id=${props.params.id}`, {
          method: 'DELETE',
      })
      .then((response) => response.json())
      .then((data) => {
          console.log('응답' + JSON.stringify(data.message));
          router.push('/article')
      })
      .catch((error) => console.log("error:", error));
    }
    return(
    <>
          <Header></Header>
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="heading text-left font-bold text-3xl mb-8 text-gray-800">
            {article?.title}
          </div>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id", { required: true })} value={props.params.id} />
            <div className="mb-4">
              <textarea
                style={{ height: "600px",border:"none", fontSize:"17px" }}
                value={article?.question}
                className="w-full bg-white p-4 rounded-lg border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                spellCheck="false"
                readOnly
              />
            </div>
            <div className="mb-4">
              {jwtDecode<any>(parseCookies().refreshToken).role == "ADMIN" && article?.answer == null ?
                <textarea
                  style={{ height: "300px" ,fontSize:"17px"}}
                  {...register("answer")}
                  className="w-full bg-white p-4 rounded-lg border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  spellCheck="false"
                  placeholder="답변을 입력해주세요."
                /> :
                article?.answer != null ? 
                  <textarea
                  style={{ height: "300px",border:"none", fontSize:"17px",fontStyle:"Times New Roman",fontWeight:"bold"}}
                    value={article?.answer}
                    className="w-full bg-white p-4 rounded-lg border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    spellCheck="false"
                    readOnly
                  /> :
                  <input
                    style={{border:"none", fontSize:"17px"}}
                    value="답변이 아직 없어요. 조금만 기다려주세요^^"
                    className="w-full bg-white border border-gray-300 p-4 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    spellCheck="false"
                    type="text"
                    readOnly
                  />
              }
            </div>
            <div className="flex justify-end">
              <a href="/article" className="btn border border-gray-300 p-2 px-4 font-semibold cursor-pointer text-gray-500 rounded-lg mr-2 hover:bg-gray-200 transition">
                목록으로
              </a>
              {jwtDecode<any>(parseCookies().refreshToken).role == "ADMIN" ?
                <button type="submit" className="btn border border-indigo-500 p-2 px-4 font-semibold cursor-pointer text-white rounded-lg bg-indigo-500 hover:bg-indigo-600 transition">
                  답변등록
                </button> :
                <button onClick={handleDelete} className="btn border border-red-500 p-2 px-4 font-semibold cursor-pointer text-white rounded-lg bg-red-500 hover:bg-red-600 transition">
                  질문 삭제하기
                </button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
    </>)

}