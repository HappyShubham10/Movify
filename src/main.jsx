import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme.js'
import Home from './pages/Home.jsx'
import Shows from './pages/Shows/Shows.jsx'
import Movies from './pages/Movies/Movies.jsx'
import Search from './pages/Search/Search.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import DetailsPage from './pages/DetailsPage.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"movies",
        element:<Movies/>
      },
      {
        path:"shows",
        element:<Shows/>
      },
      {
        path:"search",
        element:<Search/>
      },
      {
        path:"/:type/:id",
        element:<DetailsPage/>
      }
      
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,
)
