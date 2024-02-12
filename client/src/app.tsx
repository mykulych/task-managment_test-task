import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { MainPage } from './pages/main';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BoardPage } from './pages/board';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: "/:boardId",
    element: <BoardPage />,
  }
])

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider toastOptions={{ defaultOptions: { position: "top" }}}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
