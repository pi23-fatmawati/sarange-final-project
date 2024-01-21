import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage></LandingPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
