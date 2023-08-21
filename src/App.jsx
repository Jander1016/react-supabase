import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import {Routes, Route, useNavigate} from 'react-router-dom'
import NotFound from './pages/NotFound'
import { client } from './supabase/client'
import { useEffect } from 'react'
import { TaskContextProvider } from './context/TaskContext'
import { Navbar } from './components/Navbar'
function App() {

  const navigate = useNavigate()

  useEffect(() => {
  
    client.auth.onAuthStateChange((_event, session) => {
      !session ? navigate('/login') :  navigate('/') 
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  return (
    <>
    <TaskContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </TaskContextProvider>
      
    </>
  )
}

export default App
