import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Signup from "./components/Signup";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Signup />
    </ChakraProvider>
  );
}

export default App;
