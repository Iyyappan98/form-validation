
// import './App.css'
// import Form from './components/Form';


// import Header from './components/header';
// function App() {
 

//   return (
//     <>
//       <div className='app'>
//        <Header />
//        <Form />
//       </div>
//     </>
//   )
// }

// export default App


import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Preview from './components/Preview';
import Header from './components/header';

function App() {
  const [formData, setFormData] = useState(null); // shared state

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Form setFormData={setFormData} />} />
        <Route path="/preview" element={<Preview formData={formData} />} />
      </Routes>
    </Router>
  );
}

export default App;
