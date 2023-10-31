import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Wrapper from './pages/Wrapper';

import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

import PrivateRoutes1 from './privateRoutes/privateRoutes1';

const App: React.FC = (): JSX.Element => {
    return (
        <div className="max-w-[1280px] mx-auto">
            <Router>
                <Header />
                <ScrollToTop />
                
                <Routes>
                    <Route 
                        path='/'
                        element={
                            <PrivateRoutes1>
                                <Login />
                            </PrivateRoutes1>
                        }
                    />

                    <Route 
                        path='/register'
                        element={
                            <PrivateRoutes1>
                                <Register />
                            </PrivateRoutes1>
                        }
                    />

                    <Route 
                        path='/*'
                        element={
                            <Wrapper />
                        }
                    />

                </Routes>
            </Router>
        </div>
    );
};

export default App;