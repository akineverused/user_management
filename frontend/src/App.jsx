import React from 'react';
import AppRouter from "./router/AppRouter.jsx";
import {BrowserRouter} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
};

export default App;