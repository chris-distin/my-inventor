export default function ContactButtons(){

return (

<section className="mt-10 rounded-2xl border bg-white p-8 shadow-sm">


<h2 className="text-2xl font-bold text-gray-900">
Contact Home For All
</h2>



<p className="mt-3 text-gray-600">
Our property consultants are ready to help you.
</p>




<div className="mt-6 flex flex-wrap gap-4">


<a

href="tel:+971501234567"

className="rounded-xl bg-[#0B3D91] px-6 py-3 text-white"

>

📞 Call Now

</a>




<a

href="https://wa.me/971501234567"

target="_blank"

className="rounded-xl bg-green-600 px-6 py-3 text-white"

>

💬 WhatsApp

</a>



<a

href="mailto:sales@homeforall.ae"

className="rounded-xl border px-6 py-3"

>

✉️ Email

</a>



</div>


</section>

);

}