import api from './axios';

export const login = (email, password) =>
    api.post('/login', { email, password });

export const register = (name, email, password) =>
    api.post('/register', { name, email, password });

export const getUsers = () =>
    api.get('/users');

export const blockUsers = (ids) =>
    api.post('/block', { ids });

export const unblockUsers = (ids) =>
    api.post('/unblock', { ids });

export const deleteUsers = (ids) =>
    api.post('/delete', { ids });

export const deleteUnverified = () =>
    api.post('/delete-unverified');