import React, { useState, useEffect } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";



export default function TruckList() {
  const [searchValues, setSearchValues] = useState({
    make: "",
    model: "",
    startYear: "",
    endYear: "",
    body: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/truck')
    .then((response) => {
      return response.json()
    })
    .then((results) => {
     console.log(results)
     setSearchResults(results)
    })
  
  }, [])
  

  const handleInputChange = (e) => {
    console.log(e.target.value)
    setSearchValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
  }));
  };

  const handleSearchClick = () => {
    let theMake = [];
    let theModel = [];
    let theBody = [];
    console.log("searchValues", searchValues)
    console.log("searchResults", searchResults)
    if(searchValues.make) {
      theMake = searchResults.filter((item) => {
   
        return searchValues.make.toUpperCase() == item.make.toUpperCase() 
      
      });
      console.log(theMake)
    }
    console.log(theMake)
    if(searchValues.model) {
      theModel = searchResults.filter((item) => {
   
        return searchValues.model.toUpperCase() == item.model.toUpperCase() 
      
      });
      console.log(theModel)
    }
    if(searchValues.body) {
      theBody = searchResults.filter((item) => {
   
        return searchValues.body.toUpperCase() == item.body.toUpperCase() 
      
      });
    };

    // let results = []
    // if (theMake.model === theModel.model) {
    //   results = [...theMake]
    //   setSearchResults(results)
    //   if (theBody.model === theMake.model) {
    //     setSearchResults(results)
    //   }
    // }
    const results = [...theMake, ...theModel, ...theBody];
   setSearchResults(results)
  };

  

  return (
    <>
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
        {item.make} {item.model} {item.year} {item.body} {item.description}
        <img style={{width: '50%' }} src={item.url} alt={item.image}/>
      </p>
      {/* <Image
        cloudName="dlyvr1lwa"
        publicId={item.image}
        alt="Truck Image"
      /> */}
    </div>
  ))}
      </div>
    </>
  );
}
