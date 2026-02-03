import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes.jsx";

const AppRouter = () => {
    const isAuth = true ;

    const renderRoutes = (routes) =>
        routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
        ));

    return (
        <Routes>
            {isAuth ? (
                <>
                    {renderRoutes(privateRoutes)}
                    <Route path="*" element={<Navigate to="/users" />} />
                </>
            ) : (
                <>
                    {renderRoutes(publicRoutes)}
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            )}
        </Routes>
    );
};

export default AppRouter;