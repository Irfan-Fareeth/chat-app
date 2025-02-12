
import './App.css'
import Homepage from './components/homepage/Homepage'
import Chat from './components/chatpage/Chat'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
function App() {
  

  return (
    
    <div className='App'>
      <Routes>  
        <Route path = '/' Component = {Homepage}></Route>
        <Route path='/chats' Component={Chat}></Route>
      </Routes>
      <Toaster />
    </div>
   
  )
}

export default App
