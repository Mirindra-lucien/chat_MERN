import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from "./components/chat";
import AuthRoutes from './routes/authRoutes';
import ProfileRoutes from './routes/profileRoutes';

function app() {
    return <BrowserRouter>
        <Routes>
            <Route path='/web/chat' element={<Chat room="room1"/>} />
        </Routes>
        <AuthRoutes/>
        <ProfileRoutes/>
    </BrowserRouter>
}

export default app;