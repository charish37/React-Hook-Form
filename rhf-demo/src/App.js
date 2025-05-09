import React from 'react';
import YoutubeForm from './components/YoutubeForm.tsx';
import './App.css';
import BasicTable from './components/BasicTable.js';
import SortingTable from './components/SortingTable.js';
import FilteringTable from './components/FilteringTable.js'

function App() {
  return (
    <div className="App">
     <YoutubeForm />
     {/* <BasicTable/> */}
     {/* <SortingTable></SortingTable> */}
 
     <FilteringTable />
    </div>
  );
}

export default App;
