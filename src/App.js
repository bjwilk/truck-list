import React from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AddTruck from './AddTruck';
import Contact from './Contact';
import TruckList from './TruckList'
import styled from 'styled-components'
import SignUp from "./SignUp";
import Login from "./Login";


const Tabs = styled.button`
border: solid black 5px;
margin: 10px;
padding: 10px;
`

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
border: solid;
background: black;
`;

function App() {
  return (
    <BrowserRouter>
    <div>
      <Container>
      <Tabs>
        <Link to='/'>Add Truck</Link>
          </Tabs>
          <Tabs>
           <Link to='/Contact'>Contact</Link>
          </Tabs>
          <Tabs>
           <Link to='/TruckList'>Find Truck</Link>
          </Tabs>
          <Tabs>
           <Link to='/login'>Login</Link>
          </Tabs>
      </Container>
      <Routes>
        <Route exact path='/' element={<AddTruck />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/TruckList' element={<TruckList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />



      </Routes>
    </div>
  </BrowserRouter>
  );
}


export default App;

