// // React-dependencies
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Fragment, lazy, useState, useTransition } from 'react';
import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';

// Redux-dependencies
import { Provider } from 'react-redux';
// import { store } from './store/configureStore';

// Redux-Persist
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/configureStore';

// Pages
import { Main } from "./pages/main/Main";
import { More } from './pages/more/More';
import { Cards } from './pages/cards/Cards';
import { OneCard } from './pages/oneCard/OneCard';
import { Cart } from './pages/cart/Cart';
import { Favorites } from './pages/favorites/Favorites'

import { MainContext } from './context/Context';

// Components
import Layout from './components/Layout';


const App = () => {

    // state-lifting for cards's filtering TRANSITION
    const [isTitlePending, startTitleTransition] = useTransition()


    const router = createBrowserRouter(
        createRoutesFromElements(


            <Route
                path="/"
                element={<Layout startTitleTransition={startTitleTransition} />}
            >

                <Route
                    index
                    element={<Main />}
                />

                <Route
                    path="catalog"
                    element={<Cards isTitlePending={isTitlePending} />}
                />
                <Route
                    path="more"
                    element={<More />}
                />
                <Route
                    path="one-card/:id"
                    element={<OneCard />}
                />

                <Route
                    path="favorites"
                    element={<Favorites />}
                />
                <Route
                    path="cart"
                    element={<Cart />}
                />

            </Route>


        )
    )


    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <AnimatePresence mode="wait">
                    <MainContext>
                        <RouterProvider router={router} />
                    </MainContext>
                </AnimatePresence>
            </PersistGate>
        </Provider>
    )
}

export default App; 
