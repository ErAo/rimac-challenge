import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";

import '@assets/sass/app.scss'
import Home from '@pages/Home'
import Plans from '@pages/Plans'

import { AppContextProvider } from '@context/AppContext'

const AppRoutes = () => {
  return useRoutes([
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/plans",
        element: <Plans />,
      }
  ]);
}


function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppContextProvider>
  )
}

export default App
