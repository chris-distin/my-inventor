"use client";

import { useState } from "react";
import Link from "next/link";

import PropertyMap from "../Components/PropertyMap";
import PropertyAgent from "../Components/PropertyAgent";

import { properties } from "../data/properties";
import type { Property } from "../data/properties";



export default function PropertiesPage() {


  const [favorites, setFavorites] =
    useState<string[]>([]);


  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);



  const [search, setSearch] =
    useState("");


  const [purpose, setPurpose] =
    useState("All");


  const [type, setType] =
    useState("All");


  const [bedrooms, setBedrooms] =
    useState("All");


  const [developer, setDeveloper] =
    useState("All");





  const developers = [
    "All",
    ...Array.from(
      new Set(
        properties.map(
          (item)=>item.developer
        )
      )
    )
  ];






  const filteredProperties =
    properties.filter((property)=>{


      const searchMatch =
        property.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
        ||
        property.location
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );



      const purposeMatch =
        purpose === "All" ||
        property.purpose === purpose;



      const typeMatch =
        type === "All" ||
        property.type === type;



      const bedroomMatch =
        bedrooms === "All" ||
        property.bedrooms === Number(bedrooms);



      const developerMatch =
        developer === "All" ||
        property.developer === developer;



      return (
        searchMatch &&
        purposeMatch &&
        typeMatch &&
        bedroomMatch &&
        developerMatch
      );


    });






  function toggleFavorite(id:string){

    setFavorites((old)=>

      old.includes(id)

      ?

      old.filter(
        item=>item !== id
      )

      :

      [
        ...old,
        id
      ]

    );

  }






  return (

    <main
      className="
      min-h-screen
      bg-gray-50
      p-4
      sm:p-6
      "
    >


      <section
        className="
        mx-auto
        max-w-7xl
        "
      >



        <h1
          className="
          text-3xl
          font-bold
          text-blue-900
          "
        >
          Dubai Properties
        </h1>



        <p className="mt-2 text-gray-600">
          Find your dream property in UAE
        </p>





        {/* FILTERS */}

        <div
          className="
          mt-8
          grid
          gap-4
          rounded-2xl
          bg-white
          p-5
          shadow
          md:grid-cols-5
          "
        >



          <input

            value={search}

            onChange={(e)=>
              setSearch(e.target.value)
            }

            placeholder="Search Dubai area"

            className="
            rounded-lg
            border
            p-3
            "

          />




          <select

            value={purpose}

            onChange={(e)=>
              setPurpose(e.target.value)
            }

            className="
            rounded-lg
            border
            p-3
            "

          >

            <option>All</option>
            <option>Buy</option>
            <option>Rent</option>

          </select>





          <select

            value={type}

            onChange={(e)=>
              setType(e.target.value)
            }

            className="
            rounded-lg
            border
            p-3
            "

          >

            <option>All</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Penthouse</option>

          </select>





          <select

            value={bedrooms}

            onChange={(e)=>
              setBedrooms(e.target.value)
            }

            className="
            rounded-lg
            border
            p-3
            "

          >

            <option value="All">
              Bedrooms
            </option>

            <option value="1">
              1 Bedroom
            </option>

            <option value="2">
              2 Bedrooms
            </option>

            <option value="3">
              3 Bedrooms
            </option>

            <option value="4">
              4 Bedrooms
            </option>

            <option value="5">
              5 Bedrooms
            </option>

          </select>





          <select

            value={developer}

            onChange={(e)=>
              setDeveloper(e.target.value)
            }

            className="
            rounded-lg
            border
            p-3
            "

          >

            {
              developers.map((item)=>(

                <option key={item}>
                  {item}
                </option>

              ))
            }

          </select>



        </div>









        <div
          className="
          mt-8
          grid
          gap-8
          lg:grid-cols-[45%_55%]
          "
        >





          {/* PROPERTY LIST */}

          <div
            className="
            space-y-6
            "
          >


          {
            filteredProperties.map((property)=>(


              <div

                key={property.id}

                onClick={()=>
                  setSelectedProperty(property)
                }

                className="
                cursor-pointer
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-lg
                "

              >



                <img

                  src={property.image}

                  alt={property.title}

                  className="
                  h-56
                  w-full
                  object-cover
                  "

                />





                <div
                  className="
                  p-5
                  "
                >



                  <div
                    className="
                    flex
                    justify-between
                    "
                  >


                    <h2
                      className="
                      text-xl
                      font-bold
                      text-blue-900
                      "
                    >

                      {property.title}

                    </h2>




                    <button

                      onClick={(e)=>
                      {
                        e.stopPropagation();

                        toggleFavorite(
                          property.id
                        );

                      }}

                    >

                    {
                      favorites.includes(property.id)
                      ?
                      "❤️"
                      :
                      "🤍"
                    }


                    </button>



                  </div>





                  <p className="mt-2 text-gray-600">

                    {property.location}

                  </p>



                  <p
                    className="
                    mt-3
                    font-bold
                    text-blue-700
                    "
                  >

                    {property.price}

                  </p>




                  <Link

                    href={`/property/${property.id}`}

                    onClick={(e)=>
                      e.stopPropagation()
                    }

                    className="
                    mt-5
                    inline-block
                    rounded-xl
                    bg-blue-900
                    px-5
                    py-3
                    text-white
                    "

                  >

                    View Details

                  </Link>




                </div>


              </div>


            ))

          }


          </div>







          {/* MAP */}

          <div

            className="
            sticky
            top-6
            h-[350px]
            sm:h-[400px]
            lg:h-[450px]
            overflow-hidden
            rounded-2xl
            shadow-xl
            "

          >


            <PropertyMap

              properties={filteredProperties}

              selectedProperty={selectedProperty}

            />


          </div>




        </div>






        <div className="mt-10">

          <PropertyAgent />

        </div>




      </section>


    </main>

  );

}