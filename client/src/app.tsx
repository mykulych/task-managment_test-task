import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { MainPage } from './pages/main';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider toastOptions={{ defaultOptions: { position: "top" }}}>
        <MainPage />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
