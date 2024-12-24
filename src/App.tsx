import React, { useEffect, useState } from 'react';
import CenterFrame from './components/centerFrame/CenterFrame'
import LeftFrame from './components/leftFrame/LeftFrame'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RouteProvider } from './context/routeContext'


import './App.css';

function App() {

  const [redirectPath, setRedirectPath] = useState(null);

  return (
    <Router >
      <RouteProvider>
        <div className="App">
          <LeftFrame />
          <CenterFrame />
        </div>
      </RouteProvider>
    </Router>

  );
}

export default App;
