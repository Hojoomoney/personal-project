'use client';
import Header from "@/app/common/header";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Write(){
    const router = useRouter();
    type Inputs = { 
        writerId : number
        title: string
        question: string
      }
      
      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()

      const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log('입력된 값' + JSON.stringify(data))
        fetch('http://localhost:8080/api/article/write', {
          method: 'POST',
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
    return(
    <>
    <Header></Header>
  <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
    질문 등록
  </div>
  <style
    dangerouslySetInnerHTML={{
      __html: "\n  body {background:white !important;}\n"
    }}
  />
  <form onSubmit={handleSubmit(onSubmit)}>
  <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
  <input type="hidden" {...register("writerId", { required: true })} value={jwtDecode<any>(parseCookies().refreshToken).id} />
    <input
    {...register("title", { required: true })}
      className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
      spellCheck="false"
      placeholder="질문을 입력해주세요."
      type="text"
    />
    <textarea
    {...register("question")}
      className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
      spellCheck="false"
      placeholder="상세내용을 입력해주세요."
    />
    {/* buttons */}
    <div className="buttons flex">
      <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
        취소
      </div>
      <button type="submit" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
        질문등록
      </button>
    </div>
  </div>
  </form>
    </>)

}