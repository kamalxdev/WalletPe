
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Dashboard from './pages/dashboard'
import SendMoney from './pages/send'
import Home from './pages/home'
import './App.css'
import Appbar from './components/appbar'


function App() {
  return (
    <>
    <Appbar />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/send" element={<SendMoney/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
