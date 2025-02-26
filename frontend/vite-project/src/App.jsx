
import './App.css'
import Homepage from './components/homepage/Homepage'
import Chat from './components/chatpage/Chat'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
function App() {
  

  return (
    
    <div className='App'>
      <Toaster position="top-center" />
      <Routes>  
        <Route path = '/' Component = {Homepage}></Route>
        <Route path='/chats' Component={Chat}></Route>
      </Routes>
    </div>
   
  )
}

export default App
