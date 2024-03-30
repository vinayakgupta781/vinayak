import React from "react";
import {Routes,Route,Navigate} from 'react-router-dom';

import Home from './../pages/Home';
import Tours from './../pages/Tours';
import TourDetails from './../pages/TourDetails';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from "../pages/ThankYou";
import BookFoodVechical from "../pages/BookFoodVechical";
import Package from "../pages/Package";
import CustomPackage from "../pages/CustomPackage";
import About from "../pages/About";
import Sucess from "../components/Sucess";
import Cancel from "../components/Cancel";
import Admin from "../components/Admin/Admin";
import MapContainer from "../components/GoogleMap/MapContainer";


const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home'/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/tours' element={<Tours/>}/>
            <Route path='/tours/:id' element={<TourDetails/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/thank-you' element={<ThankYou/>}/>
            <Route path='/tours/search' element={<SearchResultList/>}/>
            <Route path="/bookfoodvechical" element={<BookFoodVechical/>}/>
            <Route path='/package' element={<Package/>}/>
            <Route path='/custompackage' element={<CustomPackage/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/sucess' element={<Sucess/>}/>
            <Route path='/about' element={<Cancel/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/mapContainer' element={<MapContainer/>}/>


        </Routes>
    )
};
    
export default Routers;