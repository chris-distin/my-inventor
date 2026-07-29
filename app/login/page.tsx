"use client";

import LoginForm from "../Components/LoginForm";


export default function LoginPage() {

  return (

    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">


      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">


        <h1 className="mb-6 text-center text-3xl font-bold text-[#0B3D91]">
          Sign In
        </h1>


        <LoginForm />


      </div>


    </main>

  );

}