import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import UsersPage from "../pages/UsersPage/UsersPage.jsx";

export const publicRoutes = [
    { path: '/login', component: <LoginPage/>}
]

export const privateRoutes = [
    { path: '/users', component: <UsersPage/>}
]