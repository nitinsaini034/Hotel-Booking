import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HotalList from './components/HotalList'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hotaldetail from './components/Hotaldetail'
import NewHotal from './components/NewHotal'
import BookHotal from './components/BookHotal';


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<HotalList />} />
          <Route path='/:hotalID' element={<Hotaldetail />} />
          <Route path='/new' element={<NewHotal />} />
          <Route path='/hotal/:hotalID/book' element={<BookHotal/>} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>

  )
}

export default App