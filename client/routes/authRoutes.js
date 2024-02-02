import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signin from '../components/authentication/signin';

export default function () {
    return <Routes>
        <Route path='/web/signin' element={<Signin/>} />
    </Routes>
}