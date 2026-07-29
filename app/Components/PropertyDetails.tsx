"use client";

type PropertyDetailsProps = {
  title: string;
  price: string;
  location: string;
  developer: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  parking: number;
  status: string;
  description: string;
};

export default function PropertyDetails({
  title,
  price,
  location,
  developer,
  propertyType,
  bedrooms,
  bathrooms,
  area,
  parking,
  status,
  description,
}: PropertyDetailsProps) {

  return (

    <section
      style={{
        maxWidth: "1400px",
        margin: "40px auto",
        padding: "0 30px",
      }}
    >

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "42px",
              color: "#071A2D",
              marginBottom: "10px",
            }}
          >
            {title}
          </h1>


          <p
            style={{
              fontSize: "18px",
              color: "#666",
            }}
          >
            📍 {location}
          </p>

        </div>


        <div
          style={{
            background:"#D4AF37",
            padding:"15px 25px",
            borderRadius:"10px",
            fontSize:"24px",
            fontWeight:"bold",
            color:"#071A2D",
          }}
        >
          {price}
        </div>

      </div>



      {/* Information Cards */}

      <div
        style={{
          marginTop:"40px",
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(200px,1fr))",
          gap:"20px",
        }}
      >

        <Info
          icon="🏢"
          label="Developer"
          value={developer}
        />

        <Info
          icon="🏠"
          label="Type"
          value={propertyType}
        />

        <Info
          icon="🛏️"
          label="Bedrooms"
          value={`${bedrooms}`}
        />

        <Info
          icon="🚿"
          label="Bathrooms"
          value={`${bathrooms}`}
        />

        <Info
          icon="📐"
          label="Area"
          value={area}
        />

        <Info
          icon="🚗"
          label="Parking"
          value={`${parking}`}
        />

        <Info
          icon="🏗️"
          label="Status"
          value={status}
        />

      </div>



      {/* Description */}

      <div
        style={{
          marginTop:"50px",
          background:"#ffffff",
          padding:"35px",
          borderRadius:"15px",
          boxShadow:"0 10px 30px rgba(0,0,0,.1)",
        }}
      >

        <h2
          style={{
            color:"#071A2D",
            marginBottom:"20px",
          }}
        >
          About This Property
        </h2>


        <p
          style={{
            lineHeight:"1.8",
            color:"#555",
            fontSize:"17px",
          }}
        >
          {description}
        </p>

      </div>



      {/* Buttons */}

      <div
        style={{
          marginTop:"35px",
          display:"flex",
          gap:"15px",
          flexWrap:"wrap",
        }}
      >

        <button
          style={goldButton}
        >
          ❤️ Save Property
        </button>


        <button
          style={darkButton}
        >
          📅 Book Viewing
        </button>


        <button
          style={darkButton}
        >
          📞 Contact Agent
        </button>


      </div>


    </section>

  );
}



function Info({
  icon,
  label,
  value,
}:{
  icon:string;
  label:string;
  value:string;
}){

  return(

    <div
      style={{
        background:"#f5f5f5",
        padding:"25px",
        borderRadius:"12px",
        textAlign:"center",
      }}
    >

      <div
        style={{
          fontSize:"30px",
          marginBottom:"10px",
        }}
      >
        {icon}
      </div>


      <h4
        style={{
          color:"#777",
          marginBottom:"8px",
        }}
      >
        {label}
      </h4>


      <strong
        style={{
          color:"#071A2D",
        }}
      >
        {value}
      </strong>


    </div>

  );

}



const goldButton = {

  background:"#D4AF37",
  color:"#071A2D",
  border:"none",
  padding:"15px 30px",
  borderRadius:"8px",
  fontWeight:"bold",
  cursor:"pointer",

} as const;



const darkButton = {

  background:"#071A2D",
  color:"#ffffff",
  border:"none",
  padding:"15px 30px",
  borderRadius:"8px",
  fontWeight:"bold",
  cursor:"pointer",

} as const;