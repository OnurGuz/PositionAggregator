import React from 'react';
import './App.css';
import Home from './Home.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TradeList from './TradeList.js';
import PositionList from './PositionList.js';
import CreateTrade from './CreateTrade.js';

const App = () => {
    return (
        <BrowserRouter>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trades" element={<TradeList />} />
              <Route path="/positions" element={<PositionList />} />
              <Route path="/createTrade" element={<CreateTrade />} />
             </Routes>
        </BrowserRouter>
    );
};

export default App;
