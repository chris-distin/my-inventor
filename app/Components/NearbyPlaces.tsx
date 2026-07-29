"use client";

type Place = {
  name: string;
  type: string;
  distance: string;
  time: string;
};

type NearbyPlacesProps = {
  places: Place[];
};


export default function NearbyPlaces({
  places,
}: NearbyPlacesProps) {

  return (

    <section
      style={{
        maxWidth:"1400px",
        margin:"60px auto",
        padding:"0 30px",
      }}
    >

      <h2
        style={{
          fontSize:"36px",
          color:"#071A2D",
          marginBottom:"30px",
        }}
      >
        Nearby Places
      </h2>


      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(280px,1fr))",
          gap:"25px",
        }}
      >

        {places.map((place,index)=>(

          <div
            key={index}
            style={{
              background:"#ffffff",
              borderRadius:"15px",
              padding:"25px",
              boxShadow:
              "0 10px 25px rgba(0,0,0,.08)",
            }}
          >

            <div
              style={{
                fontSize:"35px",
                marginBottom:"15px",
              }}
            >
              {getIcon(place.type)}
            </div>


            <h3
              style={{
                color:"#071A2D",
                marginBottom:"10px",
              }}
            >
              {place.name}
            </h3>


            <p
              style={{
                color:"#666",
                marginBottom:"8px",
              }}
            >
              📍 {place.distance}
            </p>


            <p
              style={{
                color:"#D4AF37",
                fontWeight:"bold",
              }}
            >
              🚗 {place.time}
            </p>


          </div>

        ))}

      </div>


    </section>

  );
}



function getIcon(type:string){

  const value = type.toLowerCase();


  if(value.includes("metro"))
    return "🚇";


  if(value.includes("tram"))
    return "🚋";


  if(value.includes("school"))
    return "🏫";


  if(value.includes("hospital"))
    return "🏥";


  if(value.includes("mall"))
    return "🛍️";


  if(value.includes("airport"))
    return "✈️";


  if(value.includes("beach"))
    return "🏖️";


  if(value.includes("restaurant"))
    return "🍽️";


  if(value.includes("road"))
    return "🛣️";


  return "📍";

}