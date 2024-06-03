// React-dependencies
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Fragment, lazy, useState, useTransition } from 'react';
import { Suspense } from 'react';

// Pages
import { Main } from "./pages/main/Main";
import { More } from './pages/more/More';
import { Cards } from './pages/cards/Cards';
import { OneCard } from './pages/oneCard/OneCard';
import { Cart } from './pages/cart/Cart';

import { CartContextProvider } from './context/Context';

// Components
import Layout from './components/Layout';


const App = () => {


    // state-lifting for cards's filtering (Header/Main)
    const [filterCardsText, setFilterCardsText] = useState(0)
    const [isTitlePending, startTitleTransition] = useTransition()


    const router = createBrowserRouter(
        createRoutesFromElements(

            
            <Route 
                path="/" 
                element={<Layout setFilterCardsText={setFilterCardsText} startTitleTransition={startTitleTransition} />} 
            >

                <Route 
                    index
                    element={<Main filterCardsText={filterCardsText} isTitlePending={isTitlePending} />} 
                /> 

                <Route 
                    path="more" 
                    element={<More />} 
                /> 
                <Route 
                    path="all-cards" 
                    element={<Cards filterCardsText={filterCardsText} isTitlePending={isTitlePending} />} 
                /> 
                <Route 
                    path="one-card/:id" 
                    element={<OneCard />} 
                /> 
                <Route 
                    path="cart" 
                    element={<Cart />} 
                /> 

            </Route> 
            

        )
      )


    return (
        <CartContextProvider>
            <RouterProvider router={router} />
        </CartContextProvider>

    )
}

export default App; 
