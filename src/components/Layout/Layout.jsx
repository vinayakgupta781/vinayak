import React from "react";

import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import Routers from '../../router/Routers';

const Layout = (role) => {
    console.log("Layour user Role",role);
    return (
        <>
            <Header/>
            <Routers/>
            <Footer/>
        </>
    );
};
    
export default Layout;