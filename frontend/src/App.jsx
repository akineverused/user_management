import React from 'react';
import AppRouter from "./router/AppRouter.jsx";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;