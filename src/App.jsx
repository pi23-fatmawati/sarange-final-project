import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import './App.css'
import HomePage from './pages/Home'
import Redeem from './pages/Redeem'
import FormRedeem from './pages/Form-redeem'
import RedeemSuccess from './pages/Redeem-success'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage></LandingPage>}></Route>
          <Route path='/home' element={<HomePage></HomePage>}></Route>
          <Route path='/redeem' element={<Redeem></Redeem>}></Route>
          <Route path='/redeem-form' element={<FormRedeem></FormRedeem>}></Route>
          <Route path='/redeem-success' element={<RedeemSuccess></RedeemSuccess>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
