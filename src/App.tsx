import React, {useState, useEffect} from "react";
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetailsPage";
import FavoritePage from "./pages/FavoritePage";

const App = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/events/:id" element={<EventDetails/>}/>
                <Route path="/favorites" element={<FavoritePage/>}/>
            </Routes>
        </div>
    );
};

export default App;
