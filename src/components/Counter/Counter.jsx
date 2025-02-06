import React, { useState } from 'react';
import { Button, Flex, Text, VStack } from "@chakra-ui/react";

function Counter() {
  const [count, setCount] = useState(0);


  const getRGBColor = (count) => {
    // Default color when count is 0
    if (count === 0) {
      return '';
    }



    const r = Math.min(255, Math.abs(count * 10)); // Red increases as count increases

    const g = Math.min(255, Math.abs(count * 5)); // Green value increases but slower

    const b = Math.min(255, Math.max(0, 255 - Math.abs(count * 5))); // Blue value decreases or increases based on count

    return `rgb(${r}, ${g}, ${b})`; // Return RGB string
  };


  const backgroundColor = getRGBColor(count);


  const handleReset = () => {
    setCount(0); // Reset the count to 0
  };

  return (
    <VStack
      spacing={4}
      p={4}
      mt={-5}
      borderWidth="3px"
      borderColor={'black'}
      borderRadius="md"
      height={300}
      align="center"
      style={{
        background: backgroundColor,
        transition: 'background 0.5s ease-in-out'
      }}
    >

      <Text fontSize={30} fontWeight="bold">{count}</Text>
      <Text fontSize="3xl" fontWeight="bold">Counter</Text>
      <Flex gap={4} mt ={50} >
        <Button onClick={() => setCount(count + 1)} colorScheme="green"   height="80px"  width="120px" fontSize="2xl" mr={100}>
          +
        </Button>
        <Button onClick={handleReset} colorScheme="cyan"   height="80px"  width="120px" fontSize="xl" mr={100}>
          Reset
        </Button>
        <Button onClick={() => setCount(count - 1)} colorScheme="red"   height="80px"  width="120px" fontSize="2xl">
          -
        </Button>
      </Flex>
    </VStack>
  );
}

export default Counter;
