import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import './App.css'
import HomePage from './pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage></LandingPage>}></Route>
          <Route path='/home' element={<HomePage></HomePage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
