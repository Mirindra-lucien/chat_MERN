import React from "react";
import { Routes, Route } from "react-router-dom";
import Create from "../components/profile/create";
import Confirm from "../components/profile/confirm";

export default function () {
    return <Routes>
        <Route path="/web/signup" element={<Create/>} />
        <Route path="/web/confirm" element={<Confirm/>} />
    </Routes>
}