import React from 'react';
import {HashRouter, Routes, Route} from 'react-router-dom';
import Viewer from '../views/Viewer';

const AppRoutes = () =>
  <HashRouter>
    <Routes>
      <Route exact path='/' element={<Viewer/>}/>
      <Route exact path='/indicator/:indicator/:year/:season' element={<Viewer/>}/>
      <Route exact path='/indicator/:indicator/:year/' element={<Viewer/>}/>
      <Route exact path='/viewer/:indicator/:year/:season' element={<Viewer simple/>}/>
      <Route exact path='/viewer/:indicator/:year/' element={<Viewer simple/>}/>
    </Routes>
  </HashRouter>;

export default AppRoutes;
