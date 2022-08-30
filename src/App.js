import React, { Suspense } from 'react';
import './App.css';
const DashBoard = React.lazy(() => import('./components/Dashboard'));

function App() {



  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <DashBoard />
      </Suspense>
    </div>
  );
}

export default App;


