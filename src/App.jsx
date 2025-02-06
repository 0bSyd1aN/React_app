import React from 'react';
import { Heading } from '@chakra-ui/react';
import './styles/global.css';
import Home from './pages/Home/Home.jsx';


function App() {
  return (
    <>
      <Heading as="h1" size="2xl" textAlign="center" marginBottom={10} mt={2}>
        Welcome to React App
      </Heading>
      <Home />
    </>
  );
}

export default App;
