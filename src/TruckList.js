import React, { useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";



export default function TruckList() {
  const [searchValues, setSearchValues] = useState({
    make: "",
    model: "",
    startYear: "",
    endYear: "",
    body: "",
  });

  const [searchResults, setSesarchResults] = useState([]);

  const [searchClicked, setSearchClicked] = useState(false);

  const handleInputChange = (e) => {
    setSearchValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearchClick = async () => {
    const results = fetch(
      `http://localhost:3001/truck/search?make=${searchValues.make}&model=${searchValues.model}&body=${searchValues.body}`
    );
    let trucks = await (await results).json();
    setSesarchResults(trucks);
    console.log("results: ", trucks);
    setSearchClicked(true);
  };

  

  return (
    <>
     <CloudinaryContext cloudName="dlyvr1lwa">
      <div style={{ border: "solid black" }}>
        <h2>Search Truck List</h2>
        <h4>
          Make
          <input
            type="text"
            name="make"
            value={searchValues.make}
            onChange={handleInputChange}
          />
        </h4>
        <h4>
          Model
          <input
            type="text"
            name="model"
            value={searchValues.model}
            onChange={handleInputChange}
          />
        </h4>
        <h4>
          Year Range
          <input
            type="number"
            name="startYear"
            value={searchValues.startYear}
            onChange={handleInputChange}
          />{" "}
          -{" "}
          <input
            type="number"
            name="endYear"
            value={searchValues.endYear}
            onChange={handleInputChange}
          />
        </h4>
        <h4>
          Body
          <input
            type="text"
            name="body"
            value={searchValues.body}
            onChange={handleInputChange}
          />
        </h4>
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div>
        {/* {filteredTrucksList(trucksList).map((item, index) => (
          <div key={index}>
            <p>{item.make} {item.model} {item.year} {item.body}</p>
          </div>
        ))} */}
{searchResults.length > 0 &&
  searchResults.map((item, index) => (
    <div key={item._id}>
      <p>
        {item.make} {item.model} {item.year} {item.body}
      </p>
      <Image
        cloudName="dlyvr1lwa"
        publicId={item.image}
        alt="Truck Image"
      />
    </div>
  ))}
      </div>
      </CloudinaryContext>
    </>
  );
}
