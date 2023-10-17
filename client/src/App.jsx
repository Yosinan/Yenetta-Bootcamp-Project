import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard'
import PageNotFound from './components/404/PageNotFound';
import Product from './pages/AddProduct/AddProd';

const App = () => {

  return (
    <>
      <div className='page-container'>
        <div className='content-wrapper'></div>
        <div className="App">
          <Router>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='*' element={<PageNotFound />} />
              <Route path='sell' element={<Product />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  )
}

export default App;