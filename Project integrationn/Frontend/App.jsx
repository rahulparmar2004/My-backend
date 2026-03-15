import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Display from './pages/Display'



const App = () => {
  return (
    <div>
      <BrowserRouter>

      <Routes>
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/' element={<Display />} />
      </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App