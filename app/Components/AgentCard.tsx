type AgentCardProps = {
  agent: {
    name: string;
    role: string;
    phone: string;
    whatsapp: string;
    email: string;
    image: string;
  };
};


export default function AgentCard({
  agent,
}: AgentCardProps) {


return (

<section className="mt-10 rounded-2xl border bg-white p-8 shadow-sm">


<h2 className="text-2xl font-bold text-gray-900">
Property Agent
</h2>



<div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center">



<img

src={agent.image}

alt={agent.name}

className="h-28 w-28 rounded-full object-cover"

/>




<div>


<h3 className="text-2xl font-bold text-[#0B3D91]">

{agent.name}

</h3>



<p className="text-gray-600">

{agent.role}

</p>



<p className="mt-2 text-gray-600">

✉️ {agent.email}

</p>




<div className="mt-5 flex flex-wrap gap-3">


<a

href={`tel:${agent.phone}`}

className="rounded-xl bg-[#0B3D91] px-6 py-3 text-white"

>

📞 Call

</a>




<a

href={`https://wa.me/${agent.whatsapp}`}

target="_blank"

className="rounded-xl bg-green-600 px-6 py-3 text-white"

>

💬 WhatsApp

</a>



</div>


</div>


</div>


</section>

);

}