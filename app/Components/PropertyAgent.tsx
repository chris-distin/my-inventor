"use client";

export default function PropertyAgent() {

  const agent = {
    name: "Home for All Agent",
    image: "/images/agent.jpg",
    phone: "+971 50 000 0000",
    email: "info@homeforall.com",
  };


  return (

    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-xl
        flex
        flex-col
        sm:flex-row
        gap-6
        items-center
      "
    >

      <img
        src={agent.image}
        alt={agent.name}
        className="
          h-32
          w-32
          rounded-full
          object-cover
        "
      />


      <div>

        <h2
          className="
            text-2xl
            font-bold
            text-blue-900
          "
        >
          {agent.name}
        </h2>


        <p className="mt-2 text-gray-600">
          Dubai Real Estate Specialist
        </p>


        <p className="mt-2">
          📞 {agent.phone}
        </p>


        <p>
          ✉️ {agent.email}
        </p>


      </div>


    </div>

  );
}