import { Route, Routes, BrowserRouter as Router} from "react-router-dom";

import '@assets/sass/app.scss'
import Home from '@pages/Home'
import Plans from '@pages/Plans'
import { AppContextProvider } from '@context/AppContext'

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
        </Routes>
      </Router>
    </AppContextProvider>
  )
}

export default App
