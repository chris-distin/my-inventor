"use client";

import ForgotPasswordForm from "../Components/ForgotPasswordForm";


export default function ForgotPasswordPage() {

  return (

    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">


      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">


        <h1 className="mb-6 text-center text-3xl font-bold text-[#0B3D91]">
          Reset Password
        </h1>


        <ForgotPasswordForm />


      </div>


    </main>

  );

}