import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About'
import Contact from './components/Contact';
import Restromenu from './components/Restromenu';



const AppLayout = ()=>(
    <div className='layout'>
        <Header/>
        <Outlet/>
    </div>
)
const appRouter= createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            { path: "/", element: <Home/> },
            { path: "/about", element: <About/> },
            { path: "/contact", element: <Contact/> },
            { path: "/restaurant/:resId", element: <Restromenu/> },
        ]
    }
])

const root = createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);