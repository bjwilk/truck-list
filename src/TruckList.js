import React, { useState } from "react";

const trucksList = [
  {
    make: 'International',
    model: 'MV',
    year: '2015',
    type: 'dump',
  },
  {
    make: 'Kenworth',
    model: 'T680',
    year: '2017',
    type: 'sleeper',
  },
  {
    make: 'Kenworth',
    model: 'T680',
    year: '2018',
    type: 'dump',
  },
  {
    make: 'International',
    model: 'MV',
    year: '2020',
    type: 'box van',
  },
  {
    make: 'Peterbilt',
    model: '330',
    year: '2019',
    type: 'Flatbed',
  },
  {
    make: 'Peterbilt',
    model: '330',
    year: '2012',
    type: 'Water Truck',
  },
  {
    make: 'Peterbilt',
    model: '330',
    year: '2014',
    type: 'Day Cab',
  },
];

export default function TruckList() {
  const [searchValues, setSearchValues] = useState({
    make: '',
    model: '',
    startYear: '',
    endYear: '',
    body: '',
  });

  const [searchResults, setSesarchResults] = useState([])

  const [searchClicked, setSearchClicked] = useState(false);

  const handleInputChange = (e) => {
    setSearchValues(prevValues => ({...prevValues, [e.target.name]: e.target.value}));
  }

  const handleSearchClick = async () => {
   const results = fetch(`http://localhost:3001/truck/search?make=${searchValues.make}&model=${searchValues.model}&body=${searchValues.body}`)
   let trucks = await (await results).json()
   setSesarchResults(trucks)
   console.log("results: ", trucks)
    setSearchClicked(true);
  }

  // const filteredTrucksList = (trucksList) => {
  //   if (searchClicked) {
  //     return trucksList.filter(item => {
  //       if (searchValues.make && !item.make.toLowerCase().includes(searchValues.make.toLowerCase())) {
  //         return false;
  //       }
  //       if (searchValues.model && !item.model.toLowerCase().includes(searchValues.model.toLowerCase())) {
  //         return false;
  //       }
  //       if (searchValues.body && !item.body.toLowerCase().includes(searchValues.body.toLowerCase())) {
  //         return false;
  //       }
  //       if (searchValues.startYear && parseInt(item.year) < parseInt(searchValues.startYear)) {
  //         return false;
  //       }
  //       if (searchValues.endYear && parseInt(item.year) > parseInt(searchValues.endYear)) {
  //         return false;
  //       }
  //       return true;
  //     });
  //   }
  //   return trucksList;
  // }

  return (
    <>
      <div style={{border: 'solid black'}}>
        <h2>Search Truck List</h2>
        <h4>Make<input type='text' name='make' value={searchValues.make} onChange={handleInputChange}/></h4>
        <h4>Model<input type='text' name='model' value={searchValues.model} onChange={handleInputChange}/></h4>
        <h4>Year Range<input type='number' name='startYear' value={searchValues.startYear} onChange={handleInputChange}/> - <input type='number' name='endYear' value={searchValues.endYear} onChange={handleInputChange}/></h4>
        <h4>Body<input type='text' name='body' value={searchValues.body} onChange={handleInputChange}/></h4>
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
          <p>{item.make} {item.model} {item.year} {item.body}</p>
        </div>
        ))}
      </div>
    </>
  );
}
