import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

import Login from './pages/Login'
import Home from './pages/Home'

export default function Routes() {
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/" element={<Login />} />
            <Route path="/repositories" element={<Home />} />
         </Switch>
      </BrowserRouter>
   );
}