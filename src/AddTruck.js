import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const Wrapper = styled.div`
  border: solid black 10px;
  margin: 5px;
  padding: 5px;
  background: white;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-right: 10px;
`;

const Button = styled.button`
  border: solid;
  margin: 15px;
  padding: 5px;
  background: blue;
  color: white;
`;

const P = styled.p`
  font-weight: bold;
`;

const InputWrapper = styled.div`
border: solid;
margin: 5px;
padding: 5px;
background: lightblue;
`

const InStock = ({ truckList, setTruckList }) => {
  
  const remove = (index) => {
    const updatedList = [...truckList];
    updatedList.splice(index, 1);
    setTruckList(updatedList);
    
  };

  return (
    <InputWrapper>
      <P>In Stock</P>
      {truckList.map((truck, index) => (
        <Wrapper key={index}>
          <div>
            <Image src={truck.image} />
            <div>
            <P>${truck.price}</P>
              <P>{truck.make}</P>
              <P>{truck.model}</P>
              <P>{truck.description}</P>
            </div>
          </div>
          <button onClick={() => remove(index)}>Remove</button>
        </Wrapper>
      ))}
    </InputWrapper>
  );
};

const AddTruck = () => {
  const [cost, setPrice] = useState(0)
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('')
  const [truckList, setTruckList] = useState([]);
  

  const handleAddTruck = async () => {
    const newTruck = { cost, make, model, body, description, image };
    const response = await fetch('http://localhost:3001/truck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTruck),
    });

    if (response.ok) {
      const data = await response.json();
      setTruckList([...truckList, data]);
      setPrice('');
      setMake('');
      setModel('');
      setBody('')
      setDescription('');
      setImage('');
    }

  
  };


  
  
  return (
    <>
      <InputWrapper>
      <div>
          <P>Price</P>
          <input type="number" value={cost} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" />
        </div>
        <div>
          <P>Make</P>
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} placeholder="Enter Info" />
        </div>
        <div>
          <P>Model</P>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Enter Info" />
        </div>
        <div>
        <P>Body</P>
          <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Enter Info" />
        </div>
        <div>
          <P>Description</P>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Info" />
        </div>
        <div>
        <P>Image</P>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter Image URL" />
      </div>

      </InputWrapper>
      <Button onClick={handleAddTruck} >Add Truck</Button>
      <InStock truckList={truckList} setTruckList={setTruckList} />
    </>
  );
};

export default AddTruck;
